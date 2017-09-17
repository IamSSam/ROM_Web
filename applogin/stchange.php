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

header("Content-Type: text/html; charset=UTF-8");
// json response array
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'igrus');
define('DB_PASSWORD', 'Dkdlrmfntm123');
define('DB_DATABASE', 'igrus');
$connection = mysqli_connect(DB_SERVER,DB_USERNAME,DB_PASSWORD,DB_DATABASE);


//echo $query;

if (isset($_POST['userid']) && isset($_POST['st_place']) && isset($_POST['st_main']) && isset($_POST['st_scale']) && isset($_POST['st_sub']) && isset($_POST['st_comment'])) {

	
	$result = mysqli_query($connection,
		"UPDATE users SET st_place = '".$_POST['st_place']."' WHERE userid = '".$_POST['userid']."'");
	$result = mysqli_query($connection,
		"UPDATE users SET st_main = '".$_POST['st_main']."' WHERE userid = '".$_POST['userid']."'");
	$result = mysqli_query($connection,
		"UPDATE users SET st_scale = '".$_POST['st_scale']."' WHERE userid = '".$_POST['userid']."'");
	$result = mysqli_query($connection,
		"UPDATE users SET st_sub = '".$_POST['st_sub']."' WHERE userid = '".$_POST['userid']."'");
	$result = mysqli_query($connection,
		"UPDATE users SET st_comment = '".$_POST['st_comment']."' WHERE userid = '".$_POST['userid']."'");
}
else
{
	echo "Did not work!";
}

?>