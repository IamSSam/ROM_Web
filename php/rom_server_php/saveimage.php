<?php
 
	$save_dir = "../../image";
 
	// 파일이 HTTP POST 방식을 통해 정상적으로 업로드되었는지 확인한다.
	if(is_uploaded_file($_FILES["file"]["tmp_name"])) 
	{	 
		echo "Upload File Name : " . $_FILES["file"]["name"] . "<br>"; 
		echo "Upload File Size(Bytes) : " . $_FILES["file"]["size"] . "<br>";
		echo "Upload File MIME Type : " . $_FILES["file"]["type"] . "<br>";
		echo "Temp Data name : " . $_FILES["file"]["tmp_name"] . "<br>";
		// 파일을 저장할 디렉토리 및 파일명
		$dest = $save_dir . "/" . $_FILES["file"]["name"];
		 
		// 파일을 지정한 디렉토리에 저장 
		if(!move_uploaded_file($_FILES["file"]["tmp_name"], $dest)) {
			die("Save Error!!!.");
		}

		if(chmod($dest, 0755))
			echo "success";

		echo substr(sprintf('%o', fileperms($dest)),-4);

		echo 'whoami';
	} 
	else 
	{
		echo "No File.";
	}
	 
 
?>