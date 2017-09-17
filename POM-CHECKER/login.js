"use strict";

var uid, name, ip;
window.onload = function(){
  $('#adminPassword').keyup(function (event) {
    if (event.keyCode === 13) {
        loginForAdmin();
    }
  });

  // Check browser support
  if (typeof(Storage) !== "undefined") {
    ip = localStorage.getItem("IP");
    uid = localStorage.getItem("uid");
    document.getElementById('inputLocalIP').value = ip;

    if(uid === null || uid === 'undefined'){
      return;
    }else{
      window.location.href = "../POM-CHECKER/POM-CHECKER.html";
    }

  } else {
    //localStorage.setItem("uid", uid);
    //localStorage.setItem("name", name);
    alert("Sorry, your browser does not support Web Storage...");
  }
};

function registerForAdmin(){
  var name = document.getElementById('inputAdminName');
  var userid = document.getElementById('inputAdminID');
  var password = document.getElementById('inputAdminPassword');
  var doctor = document.getElementById('test1');
  var nurse = document.getElementById('test2');
  var grade;

  var email = document.getElementById('inputAdminEmail');

  if(name.value === ""){
    alert("이름란을 입력해주세요.");
    //document.getElementById('form-group-name').setAttribute('class','form-group has-error has-feedback');
    name.focus();
    return;
  }else{
    //document.getElementById('form-group-name').setAttribute('class','form-group has-success has-feedback');
    name = name.value;
  }

  if(userid.value === ""){
    alert("ID란을 입력해주세요.");
    //document.getElementById('form-group-number').setAttribute('class','form-group has-error has-feedback');
    userid.focus();
    return;
  }else{
    userid = userid.value;
  }

  if(password.value === ""){
    alert("Password란을 입력해주세요.");
    //document.getElementById('form-group-number').setAttribute('class','form-group has-error has-feedback');
    password.focus();
    return;
  }else{
    password = password.value;
  }

  if(doctor.checked === true){
    grade = doctor.value;
  }else if(nurse.checked === true){
    grade = nurse.value;
  }
  if((doctor.checked === false) && (nurse.checked === false)){
    alert("등급란을 입력해주세요.");
    return;
  }

  if(email.value === ""){
    alert("Password란을 입력해주세요.");
    //document.getElementById('form-group-number').setAttribute('class','form-group has-error has-feedback');
    email.focus();
    return;
  }else{
    email = email.value;
  }

  var data = {name:name, userid:userid, password:password, grade:grade, email:email};

  $.ajax({
    url: "http://" + ip + "/php/rom_server_php/register.php",
    type: 'POST',
    data: data,
    dataType: 'html',
    success: function(data){
      console.log("registerForAdmin " + data);
      $('#registerModal').modal('hide');
    },
    error: function(request, status, error){
      console.log(request, status, error);
    },
  });
}

function loginForAdmin() {

  var userid = document.getElementById('adminID');
  var password = document.getElementById('adminPassword');

  if(userid.value === ""){
    alert("ID란을 입력해주세요.");
    //document.getElementById('form-group-number').setAttribute('class','form-group has-error has-feedback');
    userid.focus();
    return;
  }else{
    userid = userid.value;
  }

  if(password.value === ""){
    alert("Password란을 입력해주세요.");
    //document.getElementById('form-group-number').setAttribute('class','form-group has-error has-feedback');
    password.focus();
    return;
  }else{
    password = password.value;
  }

  var data = {userid:userid, password:password};

  $.ajax({
    url: "http://" + ip + "/php/rom_server_php/login.php",
    type: 'POST',
    data: data,
    dataType: 'html',
    success: function(data){
      var parsedData = JSON.parse(data);
      console.log("loginForAdmin " + parsedData.error_msg);
      console.log("uid " + parsedData.uid);
      if(parsedData.error_msg === "Login credentials are wrong. Please try again!"){
        alert("ID와 비밀번호를 다시 확인해주세요!");
      } else {
        localStorage.setItem("uid", parsedData.uid);
        localStorage.setItem("name", parsedData.name);
        location.href = "./POM-CHECKER.html";
      }

    },
    error: function(request, status, error){
      console.log("Error " + error);
    },
  });

}

function registerForIP(){
    ip = document.getElementById('inputLocalIP').value;
    localStorage.setItem("IP", ip);
    $('#registerIPModal').modal('hide');
}
