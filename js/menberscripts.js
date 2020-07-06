
var page = 1;
var totalpage;
var userName;
function OpenMovieInformationPage(numhear)
{	
	var movie_number = (numhear+((page-1)*6))-1;
		
	var mydata = "type=sendmoviedetail&movie="+movie_number;
		
	 $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/sendmoviedetail",
		   dataType:"text",
		   data:mydata,
		   success:function(response)
		   { 
			window.location="/movie";
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
}

function addfav(numhear)
{	
	var movie_title_num = "title"+numhear;
	var movie_title = document.getElementById(movie_title_num).innerHTML;
		 var mydata={"title":movie_title};

	 $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/Addfav",
		    dataType:'JSON', // Data type, HTML, json etc.
           data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   { 
		   var res = JSON.stringify(response);
			var obj = JSON.parse(res);
			var result = obj.result;
			if(result=="success")
		   {
				alert("Add to favourite List successfully");
		   }
			 if(result=="fail")
		   {
				alert("Add to favourite List was fail");
		   }
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
}
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

function nextpage()
{	
	if((page+1)<=totalpage)
	{	
		page=page+1;
		var current_page_num_text = page;
		document.getElementById("PageNumber").innerHTML = current_page_num_text;
		updateMovieList();
	}
}
function previouspage()
{
	if((page-1)>=1)
	{
		page = page-1;
		var current_page_num_text = page;
		document.getElementById("PageNumber").innerHTML = current_page_num_text;
		updateMovieList();
	}
}

$( document ).ready(function() {
	
	

	updateMovieList();	
	var current_page_num_text = page;
	document.getElementById("PageNumber").innerHTML=current_page_num_text;
});
$( document ).ready(function() {

	   $('body').on('click', "#f1",function(){
		  
		   addfav(1);
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#f2",function(){
		   
		   addfav(2);
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#f3",function(){
		   
		  addfav(3);
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#f4",function(){
		   
		   addfav(4); 
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#f5",function(){
		   addfav(5);
		   
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#f6",function(){
		    addfav(6);
		
	   });

});


$( document ).ready(function() {

	   $('body').on('click', "#b1",function(){
		   OpenMovieInformationPage(1);
		   
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#b2",function(){
		   
		   OpenMovieInformationPage(2);
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#b3",function(){
		   
		    OpenMovieInformationPage(3);
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#b4",function(){
		   
		    OpenMovieInformationPage(4);
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#b5",function(){
		    OpenMovieInformationPage(5);
		   
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#b6",function(){
		   
		    OpenMovieInformationPage(6);
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
