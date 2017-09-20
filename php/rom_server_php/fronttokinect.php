<?php

/**
 * @author Ravi Tamada
 * @link http://www.androidhive.info/2012/01/android-login-and-registration-with-php-mysql-and-sqlite/ Complete tutorial
 */
header("Content-Type:application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

//TODO : all modify need
include '../include/Config.php';

//front -> kinect
if(isset($_POST['patientid']) && isset($_POST['jointdirection']))
{
	$patientid=$_POST['patientid'];
	$jointdirection=$_POST['jointdirection'];
	
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$result_set = mysqli_query($connection,"SELECT MAX(forcecode) FROM `rom_kinectsc`");
	mysqli_data_seek($result_set, 0);
	$row = mysqli_fetch_row($result_set);
	$forcecode= $row[0]+1000;

	$result = mysqli_query($connection,"INSERT INTO rom_kinectsc(patientid,datetime,jointdirection,forcecode)
		values('".$patientid."' , now() ,'".$jointdirection."','".$forcecode."')");

	// echo "successly added";
	echo json_encode("successly added",JSON_UNESCAPED_UNICODE);
}
else
{
	echo json_encode("check postdata,patientid,jointdirection,forcecode",JSON_UNESCAPED_UNICODE);
}
?>
