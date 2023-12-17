<?php
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "apal707662@gmail.com"; // Update with the actual email address of the astrologer
    $subject = "New Consultation Booking";

    $message = "New consultation booking from:\n\n";
    $message .= "Name: " . $_POST["userName"] . "\n";
    $message .= "Email: " . $_POST["email"] . "\n";
    $message .= "Message: " . $_POST["userMessage"] . "\n";

    $headers = "From: " . $_POST["email"] . "\r\n" .
               "Reply-To: " . $_POST["email"] . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Send the email
    $success = mail($to, $subject, $message, $headers);

    if ($success) {
        // Respond to the AJAX request
        echo json_encode(["success" => true]);
    } else {
        // Handle email sending failure
        echo json_encode(["success" => false, "error" => "Error sending email"]);
    }
} else {
    // Respond to invalid requests
    echo json_encode(["success" => false, "error" => "Invalid request method"]);
}
?>
