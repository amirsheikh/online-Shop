<?php
include "connection.php";
$token =  $_FILES['photo']['name'];
$token= stripcslashes($token);
$token= mysqli_real_escape_string($con, $token);

$sql = "select * from Users where Token= '$token'";
$result = mysqli_query($con, $sql);
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$count = mysqli_num_rows($result);
$role=-1;
if ($count == 1) {
    if(time() - $row["LastLogIn"] < 180){
        $role= $row["Role"];
        if($role == 1 ){
            if($_FILES['photo']['type'] == "image/jpeg"){
                $uploadfile = "img/" . time() . ".jpg";
                if (copy($_FILES['photo']['tmp_name'], $uploadfile)) {
                  echo $uploadfile;
                } else {
                    header('HTTP/1.0 405 Method Not Allowed');
                }
            }
            else{
                header('HTTP/1.0 405 Method Not Allowed');
            }
        }
    }
} 
if($role == -1){
    header('HTTP/1.0 403 Forbidden');
}
?>