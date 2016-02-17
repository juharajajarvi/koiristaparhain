<?php
require 'model.php';

$username = $_POST['username'];
$password = $_POST['password'];

$kennel_name = $_POST['kennel_name'];
$date = $_POST['date'];
$star_level = $_POST['star_level'];
$bank_account = $_POST['bank_account'];
$dogs = $_POST['dogs'];
$puppies = $_POST['puppies'];
$puppies_parents = $_POST['puppies_parents'];
$dead_dogs = $_POST['dead_dogs'];
$achievements = $_POST['achievements'];
$happenings = $_POST['happenings'];
$hints = $_POST['hints'];
$is_register = $_POST['is_register'];

$username = htmlspecialchars($username, ENT_QUOTES);
$password = htmlspecialchars($password, ENT_QUOTES);
$password = crypt($password, 'astianpesukone');

$kennel_name = htmlspecialchars($kennel_name, ENT_QUOTES);
$date = htmlspecialchars($date, ENT_QUOTES);
$star_level = htmlspecialchars($star_level, ENT_QUOTES);
$bank_account = htmlspecialchars($bank_account, ENT_QUOTES);
$dogs = htmlspecialchars($dogs, ENT_QUOTES);
$puppies = htmlspecialchars($puppies, ENT_QUOTES);
$puppies_parents = htmlspecialchars($puppies_parents, ENT_QUOTES);
$dead_dogs = htmlspecialchars($dead_dogs, ENT_QUOTES);
$achievements = htmlspecialchars($achievements, ENT_QUOTES);
$happenings = htmlspecialchars($happenings, ENT_QUOTES);
$hints = htmlspecialchars($hints, ENT_QUOTES);
$is_register = htmlspecialchars($is_register, ENT_QUOTES);

$conn = connect_to_db();

$result = [];

// Register first if needed
if ($is_register == 'true') {
    if (strlen($username) < 6 || strlen($password) < 6 || strlen($kennel_name) < 2) {
        $result['status'] = 'failed';
        $result['info'] = 'data_validation_failed';
    } else if (!register($conn, $username, $password, $kennel_name)) {
        $result['status'] = 'failed';
        $result['info'] = 'username_taken';
    }
}

// Don't save if already failed
if (!isset($result['status'])) {
    if (save($conn, $username, $password, $date, $star_level, $bank_account, $dogs, $puppies, $puppies_parents, $dead_dogs, $achievements, $happenings, $hints)) {
        $result['status'] = 'success';
    } else {
        $result['status'] = 'failed';
        $result['info'] = 'save_failed';
    }
}

$conn->close();

echo json_encode($result);
?>