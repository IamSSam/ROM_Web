<?php

/**
 * @author Ravi Tamada
 * @link http://www.androidhive.info/2012/01/android-login-and-registration-with-php-mysql-and-sqlite/ Complete tutorial
 */
header("Content-Type:application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

include '../include/Config.php';

$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

$return_arr = Array();

$result = mysqli_query($connection,"SELECT distinct name FROM rom_checkdate, rom_patient WHERE rom_patient.patientid = rom_checkdate.patientid ORDER BY name");

while ($row = mysqli_fetch_array($result)) {
	$row_array['name'] = $row['name'];
	array_push($return_arr,$row_array);
}

echo json_encode($return_arr,JSON_UNESCAPED_UNICODE); 

?>