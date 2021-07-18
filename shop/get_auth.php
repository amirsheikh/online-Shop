<?php
include "auth.php";
//to prevent from mysqli injection
if($role != -1){
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
}
    else {
        header('HTTP/1.0 403 Forbidden');
    }
?>