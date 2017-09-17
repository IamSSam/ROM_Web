<?php
   $dbconn = mysql_connect("localhost","igrus","Dkdlrmfntm123","igrus") ;
   $status = mysql_select_db("igrus", $dbconn);
   
   $userid = $_GET['userid'] ;
   
   $query = "select * from patientInfo where `index` = (select MAX(`index`) from patientInfo where userid = '$userid')";
   // $query = "select * from patientInfo where userid = '$userid'";

   $result = mysql_query($query, $dbconn);
   $row = mysql_fetch_array($result);
   echo json_encode($row);
?>
