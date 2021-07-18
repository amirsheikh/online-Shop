<?php
include "connection.php";
$query = file_get_contents("php://input");
$query= mysqli_real_escape_string($con, $query);
$sql = "select Name, Category, Price, ImageUrl, Amount from Product where Amount > 0 and Name like '%$query%'";
$result = mysqli_query($con, $sql);
$rows = array();
while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
    $rows[] = $row;
}

// now all the rows have been fetched, it can be encoded
echo json_encode($rows,JSON_UNESCAPED_UNICODE); 
?>