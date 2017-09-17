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

if(isset($_POST['patientid']))
{
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

	$result = mysqli_query($connection,"SELECT * FROM rom_checkdate WHERE patientid='".$_POST['patientid']."' ORDER BY jointdirection, datetime");

	while ($row = mysqli_fetch_array($result)) {
		$row_array['checkdateid'] = $row['checkdateid'];
		$row_array['patientid'] = $row['patientid'];
		$row_array['datetime'] = $row['datetime'];
		$row_array['jointdirection'] = $row['jointdirection'];
		$row_array['maxangle'] = $row['maxangle'];

		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}
else if(isset($_POST['checkdateid']))
{
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

	$result = mysqli_query($connection,"SELECT * FROM rom_checkdate WHERE checkdateid='".$_POST['checkdateid']."' ORDER BY jointdirection, datetime");

	while ($row = mysqli_fetch_array($result)) {
		$row_array['image'] = $row['image'];
		$row_array['movie'] = $row['movie'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}
?>
