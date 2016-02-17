<?php
require 'model.php';

$email = $_POST['email'];
$feedback = $_POST['feedback'];

$email = htmlspecialchars($email, ENT_QUOTES);
$feedback = htmlspecialchars($feedback, ENT_QUOTES);

if (strlen($email) > 60 || strlen($feedback) > 5000) {
    echo "too_long";
} else {
    $conn = connect_to_db();
    if (save_feedback($conn, $email, $feedback)) {
        echo "success";
    } else {
        echo "failed";
    }

    $conn->close();
}
