<?php
    include "connection.php";
    $json = file_get_contents("php://input");
    $obj = json_decode($json);
    $token = $obj->token;
    $ibalance= $obj->ibalance;
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
            $ibalance= stripcslashes($ibalance);
            $ibalance= mysqli_real_escape_string($con, $ibalance);

            $sql = "update Users set Balance= $ibalance + Balance where Token = '$token'";
            if(!mysqli_query($con, $sql)){
                header('HTTP/1.0 403 Forbidden');
                echo $sql;
            }
            $sql = "select Balance from Users where Token= '$token'";
            $result = mysqli_query($con, $sql);
            $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
            echo $row["Balance"];
        }
    } 
    if($role == -1){
        header('HTTP/1.0 403 Forbidden');
        echo "salam";
    }
    mysqli_close($con);
 ?>