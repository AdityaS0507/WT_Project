<?php
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "expense_tracker";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM expenses ORDER BY created_at DESC";
$result = $conn->query($sql);

$expenses = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $expenses[] = $row;
    }
}

echo json_encode($expenses);
$conn->close();
?>
