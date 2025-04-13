<?php
/* 
 * expense-handler.php - Unified file for adding expenses to the database
 * This file merges functionality from add-expense.php and save-expense.php
 * while implementing proper security practices
 */
include 'db.php';

// Get the data from the client
$data = json_decode(file_get_contents("php://input"), true);

// Extract and validate data
$description = isset($data['description']) ? $data['description'] : '';
$amount = isset($data['amount']) ? floatval($data['amount']) : 0;
$category = isset($data['category']) ? $data['category'] : '';
$type = isset($data['type']) ? $data['type'] : ''; // "Income" or "Expense"

// Input validation (basic)
if (empty($description) || $amount <= 0 || empty($type)) {
    echo json_encode([
        "success" => false, 
        "error" => "Invalid input: Description, amount, and type are required"
    ]);
    exit;
}

// If category wasn't provided for income, use "Income" as default
if ($type === "Income" && empty($category)) {
    $category = "Income";
}

// Use prepared statement to prevent SQL injection
$sql = "INSERT INTO expenses (description, amount, category, type) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sdss", $description, $amount, $category, $type);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true, 
        "id" => $conn->insert_id,
        "message" => "Transaction saved successfully"
    ]);
} else {
    echo json_encode([
        "success" => false, 
        "error" => $stmt->error
    ]);
}

// Close resources
$stmt->close();
$conn->close();
?>