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

if(isset($_POST['name']) && isset($_POST['jointdirection']))
{
	$name = $_POST['name'];
	$jointdirection = $_POST['jointdirection'];
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

	$result = mysqli_query($connection, "SELECT rom_checkdate.datetime, rom_checkdate.maxangle, rom_checkdate.sh_angle, rom_checkdate.hh_angle, rom_checkdate.image FROM rom_checkdate , (SELECT rom_checkdate.datetime, rom_checkdate.maxangle FROM rom_checkdate, rom_patient WHERE rom_patient.name = '".$name."' AND rom_patient.patientid = rom_checkdate.patientid AND jointdirection = '".$jointdirection."' ORDER BY rom_checkdate.datetime DESC) as A WHERE A.datetime = rom_checkdate.datetime ORDER BY rom_checkdate.datetime");

	while ($row = mysqli_fetch_array($result)) {
		$row_array['datetime'] = $row['datetime'];
		$row_array['maxangle'] = $row['maxangle'];
		$row_array['sh_angle'] = $row['sh_angle'];
		$row_array['hh_angle'] = $row['hh_angle'];
		$row_array['image'] = $row['image'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}
else
{
	$response["error"] = TRUE;
	$response["error_msg"] = "Required parameters (Name or Jointdirection) is missing!";
    echo json_encode($response);
}
?>
