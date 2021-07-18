<?php
include "connection.php";
if (isset($_COOKIE["token"])) {
    $token = $_COOKIE["token"];
    $token = mysqli_real_escape_string($con, $token);
    $sql = "select * from Users where Token= '$token'";
    $result = mysqli_query($con, $sql);
    $row = mysqli_fetch_array($result, MYSQLI_ASSOC);
    $count = mysqli_num_rows($result);
    $role = -1;
    if ($count == 1) {
        if (time() - $row["LastLogIn"] < 180) {
            $email = $row["Email"]; 
            $token = $row->email . "@" . rand() . rand();
            $sql =
                "update Users set Token = '" .
                $token .
                "' where Email = '$email'";
            $result = mysqli_query($con, $sql);
            $sql =
                "update Users set LastLogIn = " .
                time() .
                " where Email = '$email'";
            $result = mysqli_query($con, $sql);
            setcookie("token", $token, time() + 60 * 60);
            $role = $row["Role"];
            if ($role == 1) {
                echo file_get_contents("admin.html");
            } else {
                echo file_get_contents("profile.html");
            }
        }
else{
header('Location: /');
}
    }
else{
header('Location: /');
}
} else {
    header('Location: /');

}
?>
