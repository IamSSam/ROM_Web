<?php

/**
 * @author Ravi Tamada
 * @link http://www.androidhive.info/2012/01/android-login-and-registration-with-php-mysql-and-sqlite/ Complete tutorial
 */
/*
header("Content-Type:application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');
*/


// json response array
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'igrus');
define('DB_PASSWORD', 'Dkdlrmfntm123');
define('DB_DATABASE', 'igrus');
$connection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);


$return_arr = Array();


//echo $query;
$result = mysqli_query($connection,"SELECT * FROM innothink"); 

while ($row = mysqli_fetch_array($result)) {

    $row_array['id'] = $row['id'];
    $row_array['long'] = $row['long'];
    $row_array['lat'] = $row['lat'];
       $row_array['mmss'] = $row['mmss'];
    array_push($return_arr,$row_array);

}

echo json_encode($row_array,JSON_UNESCAPED_UNICODE); 

//echo json_encode($return_arr,JSON_UNESCAPED_UNICODE); 
?>

