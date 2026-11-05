<?php
/**
 * JAZAK quotation form handler (for PHP hosting such as Hostinger).
 * Receives the quote form as JSON and emails it to the team.
 *
 * SETUP: fill in the two addresses below.
 *  - TO_EMAIL:   where enquiries should arrive.
 *  - FROM_EMAIL: an address on the site's own domain (e.g. no-reply@jazak.qa).
 *                Hostinger only delivers PHP mail reliably when the sender is
 *                on a domain hosted in the same account.
 */
const TO_EMAIL   = '';            // e.g. 'info@jazak.qa'
const FROM_EMAIL = '';            // e.g. 'no-reply@jazak.qa'
const FROM_NAME  = 'JAZAK Website';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond(int $code, array $data): void {
    http_response_code($code);
    echo json_encode($data);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['ok' => false, 'error' => 'Method not allowed.']);
}
if (TO_EMAIL === '' || FROM_EMAIL === '') {
    respond(503, ['ok' => false, 'error' => 'The form is not configured yet.']);
}

$raw = file_get_contents('php://input', false, null, 0, 20000);
$in  = json_decode($raw ?: '', true);
if (!is_array($in)) {
    respond(400, ['ok' => false, 'error' => 'Invalid request.']);
}

// Spam traps: hidden field must stay empty; form must not be submitted instantly.
if (!empty($in['website'])) {
    respond(200, ['ok' => true]);
}
$elapsed = isset($in['elapsed']) ? (int) $in['elapsed'] : 0;
if ($elapsed > 0 && $elapsed < 2500) {
    respond(200, ['ok' => true]);
}

// Clean single-line fields (strip newlines to block header injection).
function line($v, int $max = 200): string {
    $v = is_string($v) ? $v : '';
    $v = preg_replace('/[\r\n\t]+/', ' ', $v);
    return trim(mb_substr($v, 0, $max));
}

$name     = line($in['name'] ?? '');
$company  = line($in['company'] ?? '');
$phone    = line($in['phone'] ?? '', 40);
$email    = line($in['email'] ?? '', 120);
$service  = line($in['service'] ?? '', 120);
$location = line($in['location'] ?? '');
$details  = is_string($in['details'] ?? null) ? trim(mb_substr($in['details'], 0, 5000)) : '';

$errors = [];
if ($name === '') $errors['name'] = 'Please enter your name.';
if ($phone === '' && $email === '') $errors['phone'] = 'Add a phone number or email so we can reply.';
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'This email address looks incomplete.';
if ($service === '') $errors['service'] = 'Choose the service you need.';
if ($errors) {
    respond(422, ['ok' => false, 'error' => 'Please check the form.', 'fields' => $errors]);
}

$body = implode("\n", [
    'New quotation request from the JAZAK website',
    '',
    'Name:             ' . $name,
    'Company:          ' . ($company ?: '-'),
    'Phone:            ' . ($phone ?: '-'),
    'Email:            ' . ($email ?: '-'),
    'Service:          ' . $service,
    'Project location: ' . ($location ?: '-'),
    '',
    'Project details:',
    $details ?: '-',
    '',
    '---',
    'Sent ' . gmdate('Y-m-d H:i') . ' UTC from ' . ($_SERVER['HTTP_HOST'] ?? 'website'),
]);

$subject = '=?UTF-8?B?' . base64_encode('Quotation request: ' . $service . ' (' . $name . ')') . '?=';
$fromName = '=?UTF-8?B?' . base64_encode(FROM_NAME) . '?=';

$headers = [
    'From: ' . $fromName . ' <' . FROM_EMAIL . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'X-Mailer: PHP/' . phpversion(),
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = mail(TO_EMAIL, $subject, $body, implode("\r\n", $headers), '-f' . FROM_EMAIL);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'The message could not be sent.']);
}
respond(200, ['ok' => true]);
