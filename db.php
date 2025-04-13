<!-- Project/db.php -->
<?php
$host = "localhost";  // Make sure these values are correct
$username = "root";   // Default XAMPP MySQL username
$password = "";       // Default XAMPP MySQL password
$database = "expense_tracker"; // Your database name

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);  // Exit if connection fails
}
?>
