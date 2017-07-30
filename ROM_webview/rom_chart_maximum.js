var table;

window.onload = function(){

  $.ajax({
    url: 'http://igrus.mireene.com/rom_web/checkdatepatientlist.php',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data);

      for(var i = 0; i < data.length; i++){
        var patient_name = data[i].name;
        var patient_id_container = document.getElementById('drop1');
        var new_patient_id = document.createElement("option");
        new_patient_id.innerHTML = patient_name;
        patient_id_container.appendChild(new_patient_id);
      }
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

}


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
            borderCapStyle: 'butt',
            borderDash: [5, 5],
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

  if(selected_name == " -- Patient ID -- "){
    alert("환자를 선택해주세요.");
  }else{
    $.ajax({
      url: 'http://igrus.mireene.com/rom_web/checkdatejointdirectionlist.php',
      type: 'POST',
      data: post_data,
      dataType: 'json',
      success: function(data){
        console.log("asdfasdfasdf:"+data);
        var jointdirection_container = document.getElementById('drop2');
        $("#drop2 option:gt(0)").remove();

        for(var i = 0; i < data.length; i++){
          var jointdirection = data[i].jointdirection;
          var select_tag = document.getElementById("drop2");
          var new_jointdirection = document.createElement("option");
          //select_tag.options[i+1].setAttribute('value', jointdirection);
          new_jointdirection.setAttribute('value', jointdirection);
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
              jointdirection = 'Left shoulder-posture';
              break;
            case "202":
              jointdirection = 'Right shoulder-posture';
              break;
            case "211":
              jointdirection = 'Left hip-posture';
              break;
            case "212":
              jointdirection = 'Right hip-posture';
              break;
            default:
          }

          new_jointdirection.innerHTML = jointdirection;
          jointdirection_container.appendChild(new_jointdirection);
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
    url: 'http://igrus.mireene.com/rom_web/patientlist2.php',
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
  table.clear().draw();
  for(var i = 0; i< data_count; i++){
    removeData(chart);
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
    url: 'http://igrus.mireene.com/rom_web/checkdatelist.php',
    type: 'POST',
    dataType: 'json',
    data: post_data,
    success: function(data){
      console.log(data);
      for(var i = 0; i < data.length; i++){

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
            jointdirection = 'Left shoulder-posture';
            break;
          case "202":
            jointdirection = 'Right shoulder-posture';
            break;
          case "211":
            jointdirection = 'Left hip-posture';
            break;
          case "212":
            jointdirection = 'Right hip-posture';
            break;
          default:
        }

        addData(chart, data[i].datetime.substring(0,10), data[i].maxangle, data2[i]);

        var rate = 0;
        if(i == 0){
          rate = 0;
        }

        if(i >= 1){
          rate = Math.floor(data[i].maxangle - data[i-1].maxangle);
        }

        table.row.add( [
            info + (i+1),
            info + data[i].maxangle +" °",
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
        img_tag.setAttribute("alt", "There is No image");
        img_tag.setAttribute("id", "img_" + (i+1));

        div_container.setAttribute("class", "div_container col-md-3 col-sm-4 col-xs-3");
        
        div_tag.setAttribute("class", "overlay");
        div_tag_sub.setAttribute("class", "text");
        div_tag_sub.innerHTML = data[i].maxangle + " °";

        image_container.appendChild(div_container);
        div_container.appendChild(img_tag);
        div_container.appendChild(div_tag);
        div_tag.appendChild(div_tag_sub);
        
      }

      data_count = data.length;

    },
    error: function(request, status, error){
      console.log(request, status, error);
    },
  });
}

function romPrint(){
  var myChart = document.getElementById('myChart');
  var myTable = document.getElementById('rom-datatable');
  myChart.style.width = "95%";
  myChart.style.height = "95%";
  myTable.style.width = "100%";
  myTable.style.height = "95%";
  window.print();
}
