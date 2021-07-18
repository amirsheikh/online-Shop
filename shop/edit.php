<?php
    include "connection.php";
    $json = file_get_contents("php://input");
    $obj = json_decode($json);
    $token = $obj->token;
    $password = $obj->password;
    $name= $obj->name;
    $lname = $obj->lname;
    $address = $obj->address;
    $token= mysqli_real_escape_string($con, $token);
    $sql = "select * from Users where Token= '$token'";
    $result = mysqli_query($con, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);
    $role=-1;
    if ($count == 1) {
        if(time() - $row["LastLogIn"] < 180){
            $role= $row["Role"];
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

            $sql = "update Users set PassWord = '$password' , FirstName = '$name' , LastName = '$lname' , Address  = '$address' where Token = '$token'";
            if(!mysqli_query($con, $sql)){
                header('HTTP/1.0 405 Method Not Allowed');
            }

        }
    } 
    if($role == -1){
        header('HTTP/1.0 403 Forbidden');
    }
    mysqli_close($con);
 ?>