<?php
require 'model.php';

$username = $_POST['username'];
$password = $_POST['password'];

$username = htmlspecialchars($username);
$password = htmlspecialchars($password);
$password = crypt($password, 'astianpesukone');

$conn = connect_to_db();
$result = load($conn, $username, $password);
$conn->close();

if ($result['status'] == 'success') {
    $result['kennel_name'] = html_entity_decode($result['kennel_name'], ENT_QUOTES);
    $result['date'] = html_entity_decode($result['date'], ENT_QUOTES);
    $result['star_level'] = html_entity_decode($result['star_level'], ENT_QUOTES);
    $result['bank_account'] = html_entity_decode($result['bank_account'], ENT_QUOTES);
    $result['dogs'] = html_entity_decode($result['dogs'], ENT_QUOTES);
    $result['puppies'] = html_entity_decode($result['puppies'], ENT_QUOTES);
    $result['puppies_parents'] = html_entity_decode($result['puppies_parents'], ENT_QUOTES);
    $result['dead_dogs'] = html_entity_decode($result['dead_dogs'], ENT_QUOTES);
    $result['achievements'] = html_entity_decode($result['achievements'], ENT_QUOTES);
    $result['happenings'] = html_entity_decode($result['happenings'], ENT_QUOTES);
    $result['hints'] = html_entity_decode($result['hints'], ENT_QUOTES);
}

echo json_encode($result);

?>