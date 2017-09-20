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


//echo $query;
$result = mysqli_query($connection,"SELECT patientid,name, jointdirection, kinectid, forcecode FROM rom_kinectsc natural join rom_patient WHERE rom_kinectsc.patientid = rom_patient.patientid ORDER BY forcecode");

while ($row = mysqli_fetch_array($result)) {
	$row_array['patientid'] = $row['patientid'];
	$row_array['name'] = $row['name'];
	$row_array['jointdirection'] = $row['jointdirection'];
	$row_array['kinectid'] = $row['kinectid'];
	$row_array['forcecode'] = $row['forcecode'];
	array_push($return_arr,$row_array);
}

echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
?>
