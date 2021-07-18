<?php
    include "connection.php";
    $json = file_get_contents("php://input");
    $obj = json_decode($json);
    $token = $obj->token;
    $Name = $obj->Name;
    $Category= $obj->Category;
    $Price= $obj->Price;
    $Amount= $obj->Amount;
    $ImageUrl= $obj->ImgUrl;
    $token = stripcslashes($token);
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
                $Name = stripcslashes($Name);
                $Category = stripcslashes($Category);
                $Price = stripcslashes($Price);
                $Amount = stripcslashes($Amount);
                $ImageUrl = stripcslashes($ImageUrl);

                $Name = mysqli_real_escape_string($con, $Name);
                $Price = mysqli_real_escape_string($con, $Price);
                $Amount= mysqli_real_escape_string($con, $Amount);
                $ImageUrl = mysqli_real_escape_string($con, $ImageUrl);
                $Category = mysqli_real_escape_string($con, $Category);

                $sql = "insert into Product (Name , Category, Price , ImageUrl , Amount ) values ('$Name' , '$Category' , $Price , '$ImageUrl' , $Amount) ";
                if(!mysqli_query($con, $sql)){
                    header('HTTP/1.0 405 Method Not Allowed');
                }
            }

        }
    } 
    if($role != 1){
        header('HTTP/1.0 403 Forbidden');
    }
    mysqli_close($con);
 ?>