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

if(isset($_POST['checkdateid']) && isset($_POST['framecount']) && isset($_POST['dicjson']))
{
	$checkdateid=$_POST['checkdateid'];
	$framecount=$_POST['framecount'];
	$dicjson=$_POST['dicjson'];

	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

	$result = mysqli_query($connection,"INSERT INTO rom_checktime(checkdateid,framecount,dicjson) 
		values('".$checkdateid."','".$framecount."','".$dicjson."')");

	echo $result;
}
else
{
	echo "check postdata : checkdateid,framecount,dicjson";
}
?>

