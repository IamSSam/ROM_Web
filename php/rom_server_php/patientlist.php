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

if(isset($_POST['patientid']))
{
	$result = mysqli_query($connection,"SELECT * FROM rom_patient WHERE patientid = '".$_POST['patientid']."' ORDER BY lastupdate DESC");
	while ($row = mysqli_fetch_array($result)) {
		$row_array['patientid'] = $row['patientid'];
		$row_array['name'] = $row['name'];
		$row_array['sex'] = $row['sex'];
		$row_array['birth'] = $row['birth'];
		$row_array['number'] = $row['number'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE); 
}
else
{
	$result = mysqli_query($connection,"SELECT * FROM rom_patient ORDER BY lastupdate DESC"); 

	while ($row = mysqli_fetch_array($result)) {
		$row_array['patientid'] = $row['patientid'];
		$row_array['name'] = $row['name'];
		$row_array['sex'] = $row['sex'];
		$row_array['birth'] = $row['birth'];
		$row_array['number'] = $row['number'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE); 
}
?>

