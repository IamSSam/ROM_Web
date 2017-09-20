"use strict";

var table;
var ip = localStorage.getItem("IP");
window.onload = function(){

  var patient_list = [];
  $.ajax({
    url: 'http://' + ip + '/php/rom_web_php/get_patient_name.php',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data);
      for(var i = 0; i < data.length; i++){
        var patient_name = data[i].name;
        patient_list.push(patient_name);
      }

      $("#drop1").select2({
        data: patient_list
      });
      $('#drop1-wrapper > span').css("width","111px");
      $('#drop1-wrapper > span').css("text-align","center");
      $('#drop1-wrapper > select').css("height","38px");

    },
    error: function(request, status, error){
      console.log(request, status, error);
    },
  });

  table = $('#rom-datatable').DataTable( {
    select: {
      style: 'multi'
    },
    "language": {
           "lengthMenu": "Display _MENU_ records per page",
           "zeroRecords": "검색 정보가 없습니다.",
           "infoEmpty": "기록 없음",
           "infoFiltered": "(filtered from _MAX_ total records)"
    },

    searching: true,
    paging: true,
    dom: '<"top"f>rt<"bottom"ip><"clear">',

  } );

  //table.clear().draw();
  getPatientName();

};

var data_count = 0;
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
          label: '환자',
          borderColor: 'rgb(57, 113, 204)',
          pointRadius: 4,
          pointHitRadius: 10,
          data: [],
          fill: false,
        },{
            label: '정상범위',
            borderColor: 'rgb(255, 0, 0)',
            pointRadius: 4,
            pointHitRadius: 10,
            data: [],
            fill: false,
        }]
    },
    // Configuration options go here
    options: {
      responsive: true,
      legend:{
        labels:{
          usePointStyle: false,
          position: 'bottom',
        }
      },
      scales: {
       xAxes: [{
           display: true,
           scaleLabel: {
               display: true,
               labelString: '날짜'
           }
       }],
       yAxes: [{
         display: true,
         scaleLabel: {
             display: true,
             labelString: '각도'
         },
         ticks: {
            suggestedMin: 0,
            suggestedMax: 180,
            stepSize: 10
        }
      }]
      },
      title: {
        display: true,
        text: '진단 결과'
      },
      tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
      }
    }
});

var ctx2 = document.getElementById('myChart2').getContext('2d');
var chartForPosture = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: [],
        datasets: [{
          label: 'Shoulder balance',
          borderColor: 'rgb(0, 153, 255)',
          pointRadius: 4,
          pointHitRadius: 10,
          data: [],
          fill: false,
        },{
            label: 'Pelvic balance',
            borderColor: 'rgb(20, 179, 0)',
            pointRadius: 4,
            pointHitRadius: 10,
            data: [],
            fill: false,
        }]
    },
    // Configuration options go here
    options: {
      responsive: true,
      legend:{
        labels:{
          usePointStyle: false,
          position: 'bottom',
        }
      },
      scales: {
       xAxes: [{
           display: true,
           scaleLabel: {
               display: true,
               labelString: '날짜'
           }
       }],
       yAxes: [{
         display: true,
         scaleLabel: {
             display: true,
             labelString: '각도'
         },
         ticks: {
            suggestedMin: -10,
            suggestedMax: 10,
            stepSize: 10
        }
      }]
      },
      title: {
        display: true,
        text: '진단 결과'
      },
      tooltips: {
        callbacks: {
           label: function(tooltipItem) {
                  return tooltipItem.yLabel;
           }
        }
      }
    }
});

function addData(chart, label, data, data2){
  chart.data.labels.push(label);
  chart.data.datasets[0].data.push(data); // 환자
  chart.data.datasets[1].data.push(data2); // 정상범위
  chart.update();
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function getPatientName(){
  var select_name = document.getElementById('drop1');
  var selected_name = select_name.options[select_name.selectedIndex].text;
  getPatientInfo(selected_name);
  var post_data = "name=" + selected_name;
  console.log("patient_name=누구: "+ post_data);
  var jointdirection_list = [];
  if(selected_name == " -- Patient ID -- "){
    alert("환자를 선택해주세요.");
  }else{
    $.ajax({
      url: 'http://' + ip + '/php/rom_web_php/get_jointdirection_list.php',
      type: 'POST',
      data: post_data,
      dataType: 'json',
      success: function(data){
        //console.log("asdfasdfasdf:"+data);
        var jointdirection_container = document.getElementById('drop2');
        $("#drop2 option:gt(0)").remove();
        $("#drop3 option:gt(0)").remove();

        // for(var i = 0; i < data.length; i++){
        //   var jointdirection = data[i].jointdirection;
        //   jointdirection = setNamingforJointdirection(jointdirection);
        //   jointdirection_list.push(jointdirection);
        // }
        //
        // $("#drop2").select2({
        //   data: jointdirection_list
        // });
        // $('#drop2-wrapper > span').css("width","180px");
        // $('#drop2-wrapper > span').css("text-align","center");
        $('#drop2-wrapper > select').css("height","38px");

        for(var i = 0; i < data.length; i++){
          var jointdirection = data[i].jointdirection;
          var select_tag = document.getElementById("drop2");
          var new_jointdirection = document.createElement("option");
          new_jointdirection.setAttribute('value', jointdirection);

          jointdirection = setNamingforJointdirection(jointdirection);
          new_jointdirection.innerHTML = jointdirection;
          select_tag.appendChild(new_jointdirection);
        }


        setJointDirection();

      },
      error: function(request, status, error){
        console.log(request, status, error);
      },
    });
  }
}

function getPatientInfo(post_data){

  post_data = "name=" + post_data;
  $.ajax({
    url: 'http://' + ip + '/php/rom_web_php/get_patient_info.php',
    type: 'POST',
    data: post_data,
    dataType: 'json',
    success: function(data){
      console.log("asdasd: " + data);
      for(var i = 0; i < data.length; i++){
        document.getElementById('patient_name').innerHTML = data[i].name;
        document.getElementById('patient_number').innerHTML = "No." + data[i].number;
        console.log("gender: "+ data[i].sex);
        if(data[i].sex === "1"){
          document.getElementById('patient_gender').innerHTML = "남자";
        }else{
          document.getElementById('patient_gender').innerHTML = "여자";
        }
        document.getElementById('patient_birth').innerHTML = data[i].birth;
      }
    },

    error: function(request, status, error){
      console.log(request, status, error);
    },
  });
}

function setJointDirection(){

  $("#image_container").empty();
  $("#video_tag").empty();

  $("#drop3 option:gt(0)").remove();
  table.clear().draw();
  for(var i = 0; i< data_count; i++){
    removeData(chart);
    removeData(chartForPosture);
  }

  var select_name = document.getElementById('drop1');
  var selected_name = select_name.options[select_name.selectedIndex].text;

  var select_jointdirection = document.getElementById('drop2');
  var selected_jointdirection = select_jointdirection.options[select_jointdirection.selectedIndex].value;

  var post_data = "name=" + selected_name + "&jointdirection=" + selected_jointdirection;
  console.log(post_data);

  var info ="";
  var label = [];
  var data2 = [];

  $.ajax({
    url: 'http://'+ ip +'/php/rom_web_php/get_result_table.php',
    type: 'POST',
    dataType: 'json',
    data: post_data,
    success: function(data){
      //console.log(data);
      for(var i = 0; i < data.length; i ++){

        var jointdirection = selected_jointdirection;

        switch (jointdirection) {
          case "11":
            data2.push("170");
            break;
          case "12":
            data2.push("170");
            break;
          case "21":
            data2.push("105");
            break;
          case "22":
            data2.push("105");
            break;
          case "31":
            data2.push("100");
            break;
          case "32":
            data2.push("100");
            break;
          case "41":
            data2.push("145");
            break;
          case "42":
            data2.push("145");
            break;
          case "51":
            data2.push("80");
            break;
          case "52":
            data2.push("80");
            break;
          case "61":
            data2.push("135");
            break;
          case "62":
            data2.push("135");
            break;
          case "71":
            data2.push("120");
            break;
          case "72":
            data2.push("120");
            break;
          case "81":
            data2.push("40");
            break;
          case "82":
            data2.push("40");
            break;
          case "91":
            data2.push("90");
            break;
          case "92":
            data2.push("90");
            break;
          case "101":
            data2.push("85");
            break;
          case "102":
            data2.push("85");
            break;
          case "111":
            data2.push("45");
            break;
          case "112":
            data2.push("45");
            break;
          case "201":
            jointdirection = 'Posture';
            break;
          default:
        }

        var rate = 0;
        var angle = 0;

        if(i == 0){
          rate = 0;
        }

        if(jointdirection === "Posture"){
          document.getElementById('rom-table-thead-angle').innerHTML = "Shoudler, Pelvic balance";
          data[i].sh_angle *= 1;
          data[i].hh_angle *= 1;
          angle = data[i].sh_angle.toFixed(2) + " °, " + data[i].hh_angle.toFixed(2) + " °";
          if(i >= 1){
            rate = Math.floor(data[i].sh_angle.toFixed(2) - data[i-1].sh_angle.toFixed(2)) + " °, "
            + Math.floor(data[i].hh_angle.toFixed(2) - data[i-1].hh_angle.toFixed(2));
          }
        }else{
          document.getElementById('rom-table-thead-angle').innerHTML = "Max Angle";
          data[i].maxangle *= 1;
          angle = data[i].maxangle.toFixed(2)+ " °";
          if(i >= 1){
            data[i-1].maxangle *= 1;
            rate = Math.floor(data[i].maxangle.toFixed(2) - data[i-1].maxangle.toFixed(2));
          }
        }

        table.row.add( [
            info + (i+1),
            info + angle,
            info + rate + " °",
            info + data[i].datetime,
        ] ).draw( false );

        // images
        var image_container = document.getElementById('image_container');
        var div_container = document.createElement("div");
        var img_tag = document.createElement("img");
        var div_tag = document.createElement("div");
        var div_tag_sub = document.createElement("div");

        img_tag.setAttribute("class", "img-responsive col-md-12 col-sm-12 col-xs-12");
        img_tag.setAttribute("width", "100%");
        img_tag.setAttribute("src", "../image/" + data[i].image);
        img_tag.setAttribute("alt", "There is no image");
        img_tag.setAttribute("id", "img_" + (i+1));

        div_container.setAttribute("class", "div_container col-md-3 col-sm-4 col-xs-3");

        div_tag.setAttribute("class", "overlay");
        div_tag_sub.setAttribute("class", "text");
        div_tag_sub.innerHTML = data[i].maxangle + " °";

        image_container.appendChild(div_container);
        div_container.appendChild(img_tag);
        div_container.appendChild(div_tag);
        div_tag.appendChild(div_tag_sub);
        var movie = data[i].image;
        getMovie(movie.split('.')[0]);

      }

      var j = 0;
      var cnt = 0;
      var flag = 0;
      var index = 0;
      var size;

      if((data.length % 10) == 0){
        size = data.length / 10;
      }else{
        size = (data.length / 10) + 1;
      }

      for(; j < data.length; j++){
        if(j % 10 == 0 && j != 0){
          break;
        }

        if(jointdirection === "Posture"){
          document.getElementById('myChart').style.display = 'none';
          document.getElementById('myChart2').style.display = 'block';
          data[j].sh_angle *= 1;
          data[j].hh_angle *= 1;
          addData(chartForPosture, data[j].datetime.substring(0,10), data[j].sh_angle.toFixed(2), data[j].hh_angle.toFixed(2));
        }else{
          document.getElementById('myChart2').style.display = 'none';
          document.getElementById('myChart').style.display = 'block';
          data[j].maxangle *= 1;
          addData(chart, data[j].datetime.substring(0,10), data[j].maxangle.toFixed(2), data2[j]);
        }
      }
      cnt++;
      data_count = data.length;
    },
    error: function(request, status, error){
      console.log(request, status, error);
    },
  });

}

function getMovie(movie){
  var movie_name = movie + ".mp4";
  var movie_container = document.getElementById('drop3');
  var new_movie = document.createElement("option");
  new_movie.innerHTML = movie_name;
  movie_container.appendChild(new_movie);
}

function selectMovie(){
    $("#video_tag").remove();
    var video_container = document.getElementById('video_container');
    var video_tag = document.createElement('video');
    video_tag.setAttribute("id", "video_tag");
    video_tag.setAttribute("width", "100%");
    video_tag.setAttribute("controls", "");

    var source_tag = document.createElement('source');
    var select_movie = document.getElementById('drop3');
    var selected_movie = select_movie.options[select_movie.selectedIndex].value;
    source_tag.setAttribute("id", "source_tag");
    source_tag.setAttribute("type", "video/mp4");
    source_tag.setAttribute("src","../movie/" + selected_movie);

    video_tag.appendChild(source_tag);
    video_container.appendChild(video_tag);
    //video_tag.pause();

}

function romPrint(){
  var myChart = document.getElementById('myChart');
  var myChart2 = document.getElementById('myChart2');
  var myTable = document.getElementById('rom-datatable');
  myChart.style.width = "95%";
  myChart.style.height = "95%";
  myChart2.style.width = "95%";
  myChart2.style.height = "95%";
  myTable.style.width = "100%";
  myTable.style.height = "95%";
  window.print();
}

function goMainPage() {
    location.href = "../POM-CHECKER/POM-CHECKER.html";
}

function setNamingforJointdirection(jointdirection) {
  switch (jointdirection) {
    case "11":
      jointdirection = 'Left shoulder-flexion';
      break;
    case "12":
      jointdirection = 'Right shoulder-flexion';
      break;
    case "21":
      jointdirection = 'Left shoulder-abduction';
      break;
    case "22":
      jointdirection = 'Right shoulder-abduction';
      break;
    case "31":
      jointdirection = 'Left shoulder-rotation';
      break;
    case "32":
      jointdirection = 'Right shoulder-rotation';
      break;
    case "41":
      jointdirection = 'Left elbow-flexion';
      break;
    case "42":
      jointdirection = 'Right elbow-flexion';
      break;
    case "51":
      jointdirection = 'Left elbow-pronation';
      break;
    case "52":
      jointdirection = 'Right elbow-pronation';
      break;
    case "61":
      jointdirection = 'Left knee-flexion';
      break;
    case "62":
      jointdirection = 'Right knee-flexion';
      break;
    case "71":
      jointdirection = 'Left hip-flexion';
      break;
    case "72":
      jointdirection = 'Right hip-flexion';
      break;
    case "81":
      jointdirection = 'Left hip-rotation';
      break;
    case "82":
      jointdirection = 'Right hip-rotation';
      break;
    case "91":
      jointdirection = 'Left neck-rotation';
      break;
    case "92":
      jointdirection = 'Right neck-rotation';
      break;
    case "101":
      jointdirection = 'Left neck-flexion';
      break;
    case "102":
      jointdirection = 'Right neck-flexion';
      break;
    case "111":
      jointdirection = 'Left neck-abduction';
      break;
    case "112":
      jointdirection = 'Right neck-abduction';
      break;
    case "201":
      jointdirection = 'Posture';
      break;
    default:
  }
  return jointdirection;
}
