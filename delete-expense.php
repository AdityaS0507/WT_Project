<!-- Project/delete-expense.php -->
<?php
include 'db.php';  // Ensure this connects to your DB correctly

// Get the data from the client
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];  // The ID of the expense to delete

// SQL query to delete the expense by ID
$sql = "DELETE FROM expenses WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);  // Return success
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);  // Return failure with error message
}
?>
