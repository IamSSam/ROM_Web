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

if(isset($_POST['patientid']) && isset($_POST['jointdirection']) && isset($_POST['maxangle']) && isset($_POST['image']) && isset($_POST['movie']))
{
	$patientid = $_POST['patientid'];
	$jointdirection = $_POST['jointdirection'];
	$maxangle = $_POST['maxangle'];
	$image = $_POST['image'];
	$movie = $_POST['movie'];
	
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

	$result = mysqli_query($connection,"INSERT INTO rom_checkdate(patientid,datetime,jointdirection,maxangle,image,movie) 
		values('".$patientid."' , now() ,'".$jointdirection."','".$maxangle."','".$image."','".$movie."')");

	$result = mysqli_query($connection,"UPDATE rom_patient SET lastupdate = now() WHERE patientid = '".$patientid."'");
	
	$result = mysqli_query($connection,"SELECT * FROM rom_checkdate ORDER BY checkdateid DESC LIMIT 1");
	
	while ($row = mysqli_fetch_array($result)) {
		$row_array['checkdateid'] = $row['checkdateid'];
		$row_array['patientid'] = $row['patientid'];
		$row_array['datetime'] = $row['datetime'];
		$row_array['jointdirection'] = $row['jointdirection'];
		$row_array['maxangle'] = $row['maxangle'];
		$row_array['image'] = $row['image'];
		$row_array['movie'] = $row['movie'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}
else if(isset($_POST['patientid']) && isset($_POST['jointdirection']) && isset($_POST['sh_angle'])  && isset($_POST['hh_angle'])&& isset($_POST['image']) && isset($_POST['movie']))
{
	$patientid = $_POST['patientid'];
	$jointdirection = $_POST['jointdirection'];
	$sh_angle = $_POST['sh_angle'];
	$hh_angle = $_POST['hh_angle'];
	$image = $_POST['image'];
	$movie = $_POST['movie'];
	
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

//echo $query;
	$result = mysqli_query($connection,"INSERT INTO rom_checkdate(patientid,datetime,jointdirection,sh_angle,hh_angle,image,movie) 
		values('".$patientid."' , now() ,'".$jointdirection."','".$sh_angle."','".$hh_angle."','".$image."','".$movie."')");

	$result = mysqli_query($connection,"UPDATE rom_patient SET lastupdate = now() WHERE patientid = '".$patientid."'");
	
	$result = mysqli_query($connection,"SELECT * FROM rom_checkdate ORDER BY checkdateid DESC LIMIT 1");
	
	while ($row = mysqli_fetch_array($result)) {
		$row_array['checkdateid'] = $row['checkdateid'];
		$row_array['patientid'] = $row['patientid'];
		$row_array['datetime'] = $row['datetime'];
		$row_array['jointdirection'] = $row['jointdirection'];
		$row_array['sh_angle'] = $row['sh_angle'];
		$row_array['hh_angle'] = $row['hh_angle'];
		$row_array['image'] = $row['image'];
		$row_array['movie'] = $row['movie'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}
else if(isset($_POST['patientid']) && isset($_POST['jointdirection']) && isset($_POST['sh_angle'])  && isset($_POST['hh_angle']) && isset($_POST['movie']))
{
	$patientid = $_POST['patientid'];
	$jointdirection = $_POST['jointdirection'];
	$sh_angle = $_POST['sh_angle'];
	$hh_angle = $_POST['hh_angle'];
	$movie = $_POST['movie'];
	
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);

	$return_arr = Array();

//echo $query;
	$result = mysqli_query($connection,"INSERT INTO rom_checkdate(patientid,datetime,jointdirection,sh_angle,hh_angle,movie) 
		values('".$patientid."' , now() ,'".$jointdirection."','".$sh_angle."','".$hh_angle."','".$movie."')");

	$result = mysqli_query($connection,"UPDATE rom_patient SET lastupdate = now() WHERE patientid = '".$patientid."'");
	
	$result = mysqli_query($connection,"SELECT * FROM rom_checkdate ORDER BY checkdateid DESC LIMIT 1");
	
	while ($row = mysqli_fetch_array($result)) {
		$row_array['checkdateid'] = $row['checkdateid'];
		$row_array['patientid'] = $row['patientid'];
		$row_array['datetime'] = $row['datetime'];
		$row_array['jointdirection'] = $row['jointdirection'];
		$row_array['sh_angle'] = $row['sh_angle'];
		$row_array['hh_angle'] = $row['hh_angle'];
		$row_array['movie'] = $row['movie'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}
else if(isset($_POST['patientid']) && isset($_POST['jointdirection']) && isset($_POST['maxangle']) && isset($_POST['movie']))
{
	$patientid = $_POST['patientid'];
	$jointdirection = $_POST['jointdirection'];
	$maxangle = $_POST['maxangle'];
	$movie = $_POST['movie'];


	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);
	$return_arr = Array();

//echo $query;
	$result = mysqli_query($connection,"INSERT INTO rom_checkdate(patientid,datetime,jointdirection,maxangle,movie) 
		values('".$patientid."' , now() ,'".$jointdirection."','".$maxangle."','".$movie."')");

	$result = mysqli_query($connection,"UPDATE rom_patient SET lastupdate = now() WHERE patientid = '".$patientid."'");
	
	$result = mysqli_query($connection,"SELECT * FROM rom_checkdate ORDER BY checkdateid DESC LIMIT 1");
	
	while ($row = mysqli_fetch_array($result)) {
		$row_array['checkdateid'] = $row['checkdateid'];
		$row_array['patientid'] = $row['patientid'];
		$row_array['datetime'] = $row['datetime'];
		$row_array['jointdirection'] = $row['jointdirection'];
		$row_array['maxangle'] = $row['maxangle'];
		$row_array['movie'] = $row['movie'];
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);
}
else
{
	$connection = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD,DB_DATABASE);
	$return_arr = Array();

//echo $query;
	$result = mysqli_query($connection,"INSERT INTO rom_checkdate(patientid,datetime,jointdirection,maxangle) 
		values('".$patientid."' , now() ,'".$jointdirection."','".$maxangle."','".$image."')");

	$result = mysqli_query($connection,"UPDATE rom_patient SET lastupdate = now() WHERE patientid = '".$patientid."'");
	
	$result = mysqli_query($connection,"SELECT * FROM rom_checkdate ORDER BY checkdateid DESC LIMIT 1");
	
	while ($row = mysqli_fetch_array($result)) {
		$row_array['checkdateid'] = $row['checkdateid'];
		
		array_push($return_arr,$row_array);
	}

	echo json_encode($return_arr,JSON_UNESCAPED_UNICODE);


	echo "check postdata";
}
?>

