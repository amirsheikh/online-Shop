<?php
include "connection.php";
$token = file_get_contents("php://input");
//to prevent from mysqli injection
$token= stripcslashes($token);
$token= mysqli_real_escape_string($con, $token);
$sql = "select * from Users where Token= '$token'";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$count = mysqli_num_rows($result);
$role=-1;
if ($count == 1) {
    $sql = "update Users set LastLogIn = 0 where Token= '$token'";
    $result = mysqli_query($con, $sql);
} 
?>