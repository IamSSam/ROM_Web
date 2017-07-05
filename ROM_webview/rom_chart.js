window.onload = function(){
  $.ajax({
    url: 'http://igrus.mireene.com/rom_web/checkdatepatientlist.php',
    type: 'GET',
    dataType: 'json',
    success: function(data){
      console.log(data[1].name);

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
            //label: "dataset_label",
            //backgroundColor: 'rgb(57, 113, 204)',
            borderColor: 'rgb(57, 113, 204)',
            data: [],
        }]
    },

    // Configuration options go here
    options: {
      title:{
        display: true,
        text: '진단 결과',
      },
      legend:{
        display: false,
        labels:{
          fontSize: 0,
          //fontFamily: 'Helvetica',
        }
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

function addData(chart, label, data){
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
  });
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
        console.log(data);

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

function setJointDirection(){

  for(var i =0; i< data_count; i++){
    removeData(chart);
  }

  var select_name = document.getElementById('drop1');
  var selected_name = select_name.options[select_name.selectedIndex].text;

  var select_jointdirection = document.getElementById('drop2');
  var selected_jointdirection = select_jointdirection.options[select_jointdirection.selectedIndex].value;

  var post_data = "name=" + selected_name + "&jointdirection=" + selected_jointdirection;
  console.log(post_data);

  $.ajax({
    url: 'http://igrus.mireene.com/rom_web/checkdatelist.php',
    type: 'POST',
    dataType: 'json',
    data: post_data,
    success: function(data){
      console.log(data);
      for(var i = 0; i < data.length; i++){
        addData(chart, data[i].datetime.substring(0,10), data[i].maxangle);
      }

      data_count = data.length;

    },
    error: function(request, status, error){
      console.log(request, status, error);
    },
  });
}
