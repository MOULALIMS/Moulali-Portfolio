<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize user input
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Set recipient email address
    $to = 'moulali.saheb072@gmail.com'; // Replace with your email address

    // Set email subject
    $email_subject = "Contact Form Submission: $subject";

    // Construct email body
    $email_body = "You have received a new message from the user $name.\n\n";
    $email_body .= "Here are the details:\n";
    $email_body .= "Name: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Subject: $subject\n";
    $email_body .= "Message:\n$message\n";

    // Set email headers
    $headers = "From: $email\n";
    $headers .= "Reply-To: $email\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\n"; // Ensure proper encoding

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo 'Message sent successfully!';
    } else {
        echo 'Failed to send message.';
    }
} else {
    echo 'Invalid request.';
}
?>
