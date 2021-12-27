  let wDate = new Date();
  wDate = wDate.toISOString();
  wDate = wDate.substring(0,19);
  $("#txtDate").val(wDate); 
  console.log("before");
    
  $("#btnSubmit").click(function() {
    console.log("Click");
    wDate =   $("#txtDate").val();

    let wDate2 = wDate.substring(0,10); 

    var params = {
      // //YYYY-MM-DD[T]HH:mm:ss (SGT)
      "date_time": wDate,
      "date": wDate2 //YYYY-MM-DD
    };
    console.log(params);
    $.ajax({
      type: "GET",
      dataType: 'json',
      contentType: "text/plain",
      url: "https://api.data.gov.sg/v1/environment/psi",
      headers: {
      },
      data: params, 
      // crossDomain: true,
      // @data returning JSON data
      success: function(data) {
          console.log("API status: " + data.api_info.status);
          var psi_twenty_four =
            data.items[0].readings.psi_twenty_four_hourly;
          var pm10_twenty_four =
            data.items[0].readings.pm10_twenty_four_hourly;
  
          var content1 = "";
          var content2 = "";
          $.each(psi_twenty_four, function (key, obj) {
            console.log(key + ": " + obj);
            content1 += key + ": " + obj + "<br/>";
          });
          $.each(pm10_twenty_four, function (key, obj) {
            console.log(key + ": " + obj);
            content2 += key + ": " + obj + "<br/>";
          });
          $("#psi-twenty-four-hourly").html(content1);
          $("#pm10-twenty-four-hourly").html(content2);
          
          //store info as local storage
          localStorage.setItem("three_hourly", JSON.stringify(psi_twenty_four));
      }
    })
  
  })
  
