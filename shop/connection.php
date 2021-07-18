<?php      
    $host = "localhost";  
    $user = "h160037_shop";  
    $password = '2470amir@';  
    $db_name = "h160037_shop";  
      
    $con = mysqli_connect($host, $user, $password, $db_name);
    mysqli_query($con, "SET NAMES utf8");  
    if(mysqli_connect_errno()) {  
        die("Failed to connect with MySQL: ". mysqli_connect_error());  
    }  
?>  