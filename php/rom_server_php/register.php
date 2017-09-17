<?php

/**
 * @author Ravi Tamada
 * @link http://www.androidhive.info/2012/01/android-login-and-registration-with-php-mysql-and-sqlite/ Complete tutorial
 */
//header("Content-Type:text/html;charset=utf-8"); 
//header("Content-Type:application/json;charset=utf-8"); 

require_once '../include/DB_Functions.php';
$db = new DB_Functions();

// json response array
$response = array("error" => FALSE);

if (isset($_POST['name']) && isset($_POST['userid']) && isset($_POST['password']) 
    &&  isset($_POST['grade']) && isset($_POST['email'])  ) {

    // receiving the post params
    $name = $_POST['name'];
    $userid = $_POST['userid'];
    $password = $_POST['password'];
    $grade = $_POST['grade'];
    $email = $_POST['email'];




    // check if user is already existed with the same email
    if ($db->isUserExisted($userid)) {
        // user already existed
        $response["error"] = TRUE;
        $response["error_msg"] = "User already existed with " . $userid;
        echo json_encode($response);
    } else {
        // create a new user
        $user = $db->storeUser($name, $userid, $password, $grade, $email);
        if ($user) {
            // user stored successfully
            $response["error"] = FALSE;
            $response["uid"] = $user["unique_id"];
            $response["name"] = $user["name"];
            $response["userid"] = $user["userid"];
            echo json_encode($response);
        } else {
            // user failed to store
            $response["error"] = TRUE;
            $response["error_msg"] = "Unknown error occurred in registration!";
            echo json_encode($response);
        }
    }
} else {
    $response["error"] = TRUE;
    $response["error_msg"] = "Required parameters (name, userid, password, grade, email) is missing!";
    echo json_encode($response);
}
?>

