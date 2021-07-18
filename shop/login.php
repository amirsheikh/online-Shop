<?php
include "connection.php";
$json = file_get_contents("php://input");
$obj = json_decode($json);
$username = $obj->email;
$password = $obj->password;
//to prevent from mysqli injection
$username = stripcslashes($username);
$password = stripcslashes($password);
$username = mysqli_real_escape_string($con, $username);
$password = mysqli_real_escape_string($con, $password);
$sql = "select * from Users where Email = '$username' and PassWord = '$password'";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$count = mysqli_num_rows($result);
if ($count == 1) {
    $data->firstname = $row["FirstName"];
    $data->lastname = $row["LastName"];
    $data->email = $row["Email"];
    $data->Address = $row["Address"];
    $data->balance = $row["Balance"];
   $token = $data->email . "@" . rand() . rand();
    $data->token = $token;
    $sql =
        "update Users set Token = '" .
        $token .
        "' where Email = '$data->email'";
    $result = mysqli_query($con, $sql);
    $sql =
        "update Users set LastLogIn = " .
        time() .
        " where Email = '$data->email'";
    $result = mysqli_query($con, $sql);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
} else {
    header('HTTP/1.0 403 Forbidden');
}
 ?>