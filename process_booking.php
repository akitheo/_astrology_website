<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $dob = $_POST["dob"];
    $birthTime = $_POST["birthTime"];
    $phoneNumber = $_POST["phoneNumber"];
    $email = $_POST["email"];
    $selectedDate = $_POST["selectedDate"];
    $selectedTime = $_POST["selectedTime"];

    // Astrologer's email address
    $astrologerEmail = 'apal707662@gmail.com';  // Replace with the actual astrologer's email address

    // Compose email message for the astrologer
    $astrologerMessage = "
        New Consultation Booking:

        Name: $firstName $lastName
        Date of Birth: $dob
        Birth Time: $birthTime
        Phone Number: $phoneNumber
        Email: $email
        Selected Date: $selectedDate
        Selected Time: $selectedTime
    ";

    // Compose email message for the user
    $userMessage = "
        Dear $firstName $lastName,

        Thank you for booking a consultation with us. We have received your request for a consultation on $selectedDate at $selectedTime. Our astrologer will get in touch with you shortly.

        Best regards,
        Astrology Consultation Team
    ";

    // Send email to astrologer
    mail($astrologerEmail, "New Consultation Booking", $astrologerMessage);

    // Send email to user
    mail($email, "Consultation Booking Confirmation", $userMessage);

    // Redirect to success page
    header("Location: /success.html");
    exit;
}
?>
