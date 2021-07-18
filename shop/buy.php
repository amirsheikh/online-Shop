<?php
    include "connection.php";
    $json = file_get_contents("php://input");
    $obj = json_decode($json);
    $token = $obj->token;
    $countp = $obj->count;
    $Name = $obj->Name;
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
            //to prevent from mysqli injection
            $countp= stripcslashes($countp);
            $countp= mysqli_real_escape_string($con, $countp);
            $Name= stripcslashes($Name);
            $Name= mysqli_real_escape_string($con, $Name);
            $sql = "select * from Users , Product where Token = '$token' and Users.Balance >= Product.Price*$countp and Product.Name = '$Name'";
            $result = mysqli_query($con, $sql);
            $count = mysqli_num_rows($result);
            if($count == 0){
                header('HTTP/1.0 405 Method Not Allowed');
            }
            else{
                $sql = "update Product set Amount = (Amount - $countp) where Name= '$Name' and Amount >= $countp";
                if(!mysqli_query($con, $sql)){
                    header('HTTP/1.0 405 Method Not Allowed');
                }
                if(mysqli_affected_rows($con) == 0){
                    header('HTTP/1.0 406 Not Acceptable');
                }
                else{
                    $sql = "update Users , Product set Users.Balance = (Users.Balance - $countp*Product.Price) where Users.Token = '$token' and Product.Name = '$Name' ";
                    mysqli_query($con, $sql);
                    $sql = "update Product set Sell = Sell + $countp where Product.Name = '$Name' ";
                    mysqli_query($con, $sql);
                    $sql = "select Price from Product where Name = '$Name' ";
                    $result = mysqli_query($con, $sql);
                    $pricee = mysqli_fetch_array($result, MYSQLI_ASSOC);
                    $price = $pricee['Price'];
                    $firstName = $row['FirstName'];
                    $lastName = $row['LastName'];
                    $address = $row['Address'];
                    $Email = $row['Email'];
                    $price = $price * $countp;
                    $sql = "insert into Receipt (Amount,FirstName,LastName,Address,Email,ProName,Price) values ($countp,'$firstName','$lastName','$address','$Email','$Name',$price)";
                    mysqli_query($con, $sql);
                    
                }
            }
        }
    } 
    if($role == -1){
        header('HTTP/1.0 403 Forbidden');
    }
    mysqli_close($con);
 ?>