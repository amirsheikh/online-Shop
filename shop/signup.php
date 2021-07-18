<?php
include "connection.php";
$json = file_get_contents("php://input");
$obj = json_decode($json);
$username = $obj->email;
$password = $obj->password;
$name= $obj->name;
$lname = $obj->lname;
$address = $obj->address;

//to prevent from mysqli injection
$username = stripcslashes($username);
$password = stripcslashes($password);
$name= stripcslashes($name);
$lname = stripcslashes($lname);
$address = stripcslashes($address);

$username = mysqli_real_escape_string($con, $username);
$password = mysqli_real_escape_string($con, $password);
$name= mysqli_real_escape_string($con, $name);
$lname = mysqli_real_escape_string($con, $lname);
$address = mysqli_real_escape_string($con, $address);

$sql = "insert into Users (Email, PassWord, FirstName, LastName, Address,Balance,Role) values ('$username' ,'$password', '$name', '$lname' ,'$address' ,0,0)";
if(!mysqli_query($con, $sql)){
header('HTTP/1.0 403 Forbidden');
}
mysqli_close($con);
 ?>