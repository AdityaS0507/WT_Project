<?php
include 'db.php';

file_put_contents('delete_log.txt', json_encode($data));
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id'])) {
    echo json_encode(["success" => false, "error" => "No ID provided"]);
    exit;
}

$id = $data['id'];

$sql = "DELETE FROM expenses WHERE id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $stmt->error]);
}
?>
