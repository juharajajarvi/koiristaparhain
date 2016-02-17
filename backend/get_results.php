<?php
require 'model.php';

$conn = connect_to_db();
$result = get_results($conn);

$conn->close();
echo json_encode($result);

?>