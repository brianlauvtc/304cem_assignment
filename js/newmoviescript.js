

$( document ).ready(function() {
	
	var mydata = "type=checklogin&0";

	 $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/checklogin",
		   dataType:"text",
		   data:mydata,
		   success:function(response)
		   { 
			if(response=="null")
		   {
				alert("Please login first");
				window.location="/index";
		   }
			 
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
	
});

$( document ).ready(function() {

	   $('body').on('click', "#logout",function(){
		   
		logout();
	   });

});	


$( document ).ready(function() {

	   $('body').on('click', "#submitbutton",function(){
		   
		setTimeout(getinsertresult, 1000);
		
	   });

});


function getinsertresult()
{
    var newMovieTitle = $("#newMovieTitle").val();
    var newMovieDescription = $("#newMovieDescription").val();
    var NewMovieDate = $("#NewMovieDate").val();
    var NewMovieDirector = $("#NewMovieDirector").val();
    var newMovieActors = $("#newMovieActors").val();
   
    if (newMovieTitle == "") {
        alert("Please input the Movie Title!");
        return;
    }
    if (newMovieDescription == "") {
        alert("Please input the Movie Description!");
        return;
    }
    if (NewMovieDate == "") {
        alert("Please input the Movie Release Date!");
        return;
    }

    if (NewMovieDirector == "") {
        alert("Please input the Movie Director!");
        return;
    }
    if (newMovieActors == "") {
        alert("Please input the Movie Actors!");
        return;
    }
    var filename = $('#NewMoviePoster')[0].files;
    if (filename.length == 0) {
        alert("Please input the Movie Poster!");
        return;
    }

    var mydata = { "newMovieTitle": newMovieTitle, "newMovieDescription": newMovieDescription, "NewMovieDate": NewMovieDate, "NewMovieDirector": NewMovieDirector, "newMovieActors": newMovieActors };
	 $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/checkAddSuccessfully",
           dataType: 'JSON', // Data type, HTML, json etc.
           data: JSON.stringify(mydata), //Form variables
		   success:function(response)
           {
               var res = JSON.stringify(response);
               var obj = JSON.parse(res);
               var result = obj.result;
               if (result=="success")
		   {
				alert("New Movie insert successfully");
				window.location="/addnew";
               } else { alert(result);}
			 
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
}


function logout()
{
	 var mydata = "type=logout&0";

	 $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/logout",
		   dataType:"text",
		   data:mydata,
		   success:function(response)
		   { 
			if(response=="success")
		   {
				alert("logout successfully");
				window.location="/index";
		   }
			 
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
}

$(document).ready(function () {

     
     
       
            $.ajax({
                type: "POST",
                url: "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en",
                dataType: "json",
                success: function (result, status, xhr) {
                  
				
				var nextday = result.weatherForecast[0].week;
				var mintemp = result.weatherForecast[0].forecastMintemp.value + "C";
				var maxtemp = result.weatherForecast[0].forecastMaxtemp.value + "C";
				document.getElementById("temp").innerHTML = mintemp + " to " + maxtemp;
				document.getElementById("day").innerHTML = "Tomorrow : " + nextday;
				
                },
                error: function (xhr, status, error) {
                    alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
                }
            });
        
 
  
  
});
