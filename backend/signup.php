<?php
require 'model.php';

$username = $_POST['username'];
$password = $_POST['password'];

if (strlen($username) == 0) {
    $username = "phpjumala";
}

$dog = $_POST['dog'];
$dog_name = $_POST['dog_name'];
$dog_rating = $_POST['dog_rating'];
$code = $_POST['code'];

$username = htmlspecialchars($username, ENT_QUOTES);
$password = htmlspecialchars($password, ENT_QUOTES);
$password = crypt($password, 'astianpesukone');

$dog_name = htmlspecialchars($dog_name, ENT_QUOTES);

$conn = connect_to_db();
$result = false;

if ($username == "phpjumala" || is_correct_username_password($conn, $username, $password)) {
    if (signup($conn, $username, $dog_name, $dog_rating, $code)) {
        $result = true;
    }
}

$conn->close();
echo $result;

?>