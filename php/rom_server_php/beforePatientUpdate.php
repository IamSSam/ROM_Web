<?php

	header("Content-Type:application/json; charset=utf-8");
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT');

	include '../include/Config.php';

	$kinectid = $_POST['kinectid'];
	$forcecode = $_POST['forcecode'];
			
		$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);
		$return_arr = Array();

		if(TRUE==mysqli_query($connection,
			"UPDATE igrus.rom_kinectsc SET forcecode = '".$forcecode."' WHERE rom_kinectsc.kinectid = '".$kinectid."'")){
			echo "working!";
		}
		else{
			echo "fail";
		}


?>
