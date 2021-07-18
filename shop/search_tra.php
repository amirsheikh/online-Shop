<?php
    include "connection.php";
    $json = file_get_contents("php://input");
    $obj = json_decode($json);
    $token = $obj->token;
    $token= stripcslashes($token);
    $token= mysqli_real_escape_string($con, $token);
    $tra = $obj->tra;
    $tra= stripcslashes($tra);
    $tra= mysqli_real_escape_string($con, $tra);
    $sql = "select * from Users where Token= '$token'";
    $result = mysqli_query($con, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);
    $role=-1;
    if ($count == 1) {
        if(time() - $row["LastLogIn"] < 180){
            $role= $row["Role"];
            $Email = $row["Email"];
            if($role == 1){
               $sql = "select * from Receipt where ID LIKE '%$tra%' order by createdAt DESC";
               $result = mysqli_query($con, $sql);
               $rows = array();
               while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
                    $rows[] = $row;
               }
               echo json_encode($rows,JSON_UNESCAPED_UNICODE); 
            }
         }
    } 
    if($role == -1){
        header('HTTP/1.0 403 Forbidden');
    }
    mysqli_close($con);
 ?>