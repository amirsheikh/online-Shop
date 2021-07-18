<?php
    include "connection.php";
    $json = file_get_contents("php://input");
    $obj = json_decode($json);
    $token = $obj->token;
    $Name= $obj->Name;
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
            if($role == 1){
                //to prevent from mysqli injection
                $Name= stripcslashes($Name);
                $Name= mysqli_real_escape_string($con, $Name);
                $sql = "update Product set Category = 'بدون دسته' where Category = '$Name'";
                if(!mysqli_query($con, $sql)){
                    header('HTTP/1.0 405 Method Not Allowed');
                }
            }
        }
    } 
    if($role == -1){
        header('HTTP/1.0 403 Forbidden');
    }
    mysqli_close($con);
 ?>