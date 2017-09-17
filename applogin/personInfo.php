<?php
   $dbconn = mysql_connect("localhost","igrus","Dkdlrmfntm123","igrus") ;
   $status = mysql_select_db("igrus", $dbconn);
   
   $userid = $_GET['userid'] ;
   $height = $_GET['height'] ;
   $weight = $_GET['weight'] ;
   $abo = $_GET['abo'] ;
   $medicine = $_GET['medicine'] ;
   $allergy = $_GET['allergy'] ;
   $history = $_GET['history'] ;
   $sleeptime = $_GET['sleeptime'] ;
   $dailystride = $_GET['dailystride'] ;
   $date = $_GET['date'] ;

   // $userid = $_POST['userid'] ;
   // $height = $_POST['height'] ;
   // $weight = $_POST['weight'] ;
   // $abo = $_POST['abo'] ;
   // $medicine = $_POST['medicine'] ;
   // $allergy = $_POST['allergy'] ;
   // $history = $_POST['history'] ;
   // $sleeptime = $_POST['sleeptime'] ;
   // $dailystride = $_POST['dailystride'] ;
   // $date = $_POST['date'] ;
   
   $query = "insert into patientInfo (userid, height, weight, abo, medicine, allergy,
    history, sleeptime, dailystride, date) values ('$userid', '$height', '$weight', '$abo', '$medicine', '$allergy',
    '$history', '$sleeptime', '$dailystride', '$date')";

   $result = mysql_query($query, $dbconn);
   // mysql_data_seek($result, 0);
   
   // $query = "select * from patientInfo where userid = '$userid'";
   $query = "select * from patientInfo where `index` = (select MAX(`index`) from patientInfo where userid = '$userid')";
   $result = mysql_query($query, $dbconn);

   $row = mysql_fetch_array($result);
   echo json_encode($row);
?>
