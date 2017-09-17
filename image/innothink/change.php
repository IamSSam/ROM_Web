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


//echo $query;

if (isset($_POST['mmss'])) {

	$mmss=$_GET['mmss'];
	mysqli_query($connection,"UPDATE innothink SET mmss = '".$_POST['mmss']."' WHERE id = 1");

}

?>