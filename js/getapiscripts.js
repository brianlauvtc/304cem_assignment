

var userName;


function updateMovieList()
{
	var mydata={"type":"ShowMovieData"};
	   $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/ShowMovieData",
		    dataType:'JSON', // Data type, HTML, json etc.
           data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   { 
		   for(var g=0;g<6;g++)
			 {	var div_id = "div" + (g+1);				
				document.getElementById(div_id).style.visibility="hidden";
				
			 }
		
						
			var num = 0;
			var current_page_id = 1;	
			totalpage = Math.ceil((response.length)/6);
			for(i=0;i<response.length;i++)
			{	
				num++;			
						
			
				if(current_page_id == page)
				{var movie_show_num = num;			
				var image_id = "image" + movie_show_num;
				var srcc = "assets/img/"+response[i].Poster; 
				document.getElementById(image_id).src=srcc;				
				var title_id = "title" + movie_show_num;
				document.getElementById(title_id).innerHTML=response[i].Movie_Name;
				var image_alt = response[i].Movie_Name + " Poster"
				document.getElementById(image_id).alt=image_alt;
				var des_id = "des" + movie_show_num;
				document.getElementById(des_id).innerHTML=response[i].description;
				var div_id = "div" + movie_show_num;
				document.getElementById(div_id).style.visibility="visible";	
									
				}
				if(num==6)
				{num=0;
				current_page_id++;
				}	
				}
				},
				error:function(xhr, ajaxOptions, thrownError)
				{
				alert(thrownError);
				}		   
		});
}



$( document ).ready(function() {
	
	//updateMovieList();	
	
});


$( document ).ready(function() {

	   $('body').on('click', "#api1",function(){
		   window.location="/movielistapipage";
	
	   });

});




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
		   }else {userName = response;}
			 
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
	
});
$( document ).ready(function() {

	   $('body').on('click', "#logout",function(){
		   
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
	   });

});	

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
