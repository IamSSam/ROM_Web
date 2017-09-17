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

if(isset($_POST['kinectid']) )
{
	$kinectid =$_POST['kinectid'];

	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

	$result = mysqli_query($connection,
		"INSERT INTO rom_kinectsc2(patientid,jointdirection,datetime,forcecode) SELECT patientid,jointdirection,now(),forcecode from 
		rom_kinectsc where kinectid = '".$kinectid."'");

	echo result;

	$result = mysqli_query($connection,
		"DELETE FROM rom_kinectsc WHERE kinectid = '".$kinectid."'");

	echo result;
}
else
{
	echo "check post data : kinectid";
}
?>