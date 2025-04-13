<!-- Project/add-expense.php -->
<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$description = $data['description'];
$amount = $data['amount'];
$category = $data['category'];
$type = $data['type']; // "Income" or "Expense"

$sql = "INSERT INTO expenses (description, amount, category, type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdss", $description, $amount, $category, $type);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "id" => $stmt->insert_id]);
} else {
    echo json_encode(["success" => false]);
}
?>
