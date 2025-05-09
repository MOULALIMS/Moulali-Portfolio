<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name    = strip_tags(trim($_POST["name"]));
    $email   = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = trim($_POST["message"]);

    if (empty($name) || empty($email) || empty($subject) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Please fill in all fields with a valid email.";
        exit;
    }

    $to = "moulalisaheb21@gmail.com";
    $email_subject = "Portfolio Contact: $subject";
    $email_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $name <$email>";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "OK";
    } else {
        http_response_code(500);
        echo "Oops! Something went wrong and we couldn't send your message.";
    }
}
?>
