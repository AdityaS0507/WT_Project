<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "expense_tracker";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$description = $conn->real_escape_string($data['description']);
$category = $conn->real_escape_string($data['category']);
$amount = floatval($data['amount']);
$type = $conn->real_escape_string($data['type']);

$sql = "INSERT INTO expenses (description, category, amount, type)
        VALUES ('$description', '$category', '$amount', '$type')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
