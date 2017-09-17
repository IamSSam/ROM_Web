<?php

	header("Content-Type:application/json; charset=utf-8");
	header('Access-Control-Allow-Origin: *');
	header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
	header('Access-Control-Allow-Methods: GET, POST, PUT');

	include '../include/Config.php';

	if(isset($_POST['name']) && isset($_POST['sex']) && isset($_POST['birth']))
	{
		$name =$_POST['name'];
		$sex = $_POST['sex'];
		$birth = $_POST['birth'];
		$number = $_POST['number'];

		$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

		$return_arr = Array();

		$result = mysqli_query($connection,
			"INSERT INTO rom_patient(name,sex,birth,number,lastupdate)
			values('".$name."','".$sex."','".$birth."', '".$number."', now())");
	}
	else
	{
		echo "check name, sex, birth";
	}

?>
