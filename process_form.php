<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to_customer = $_POST["email"];
    $to_astrologer = "tuturikpa@gmail.com"; // Replace with the actual email address of the astrologer

    $subject_customer = "Booking Confirmation";
    $message_customer = "Dear " . $_POST["firstName"] . ",\n\nThank you for booking a consultation with us. Your appointment details:\nDay: " . $_POST["day"] . "\nTime: " . $_POST["time"] . "\n\nWe look forward to assisting you.";

    $subject_astrologer = "New Booking Request";
    $message_astrologer = "New booking request:\nName: " . $_POST["firstName"] . " " . $_POST["lastName"] . "\nDay: " . $_POST["day"] . "\nTime: " . $_POST["time"] . "\nPhone Number: " . $_POST["phoneNumber"] . "\nEmail: " . $_POST["email"];

    // Send email to customer
    $customer_mail_result = mail($to_customer, $subject_customer, $message_customer);

    // Send email to astrologer
    $astrologer_mail_result = mail($to_astrologer, $subject_astrologer, $message_astrologer);

    // Check for successful email sending
    if ($customer_mail_result && $astrologer_mail_result) {
        echo "Emails sent successfully!";
    } else {
        echo "Error sending emails. Please try again later.";
    }
}
?>

