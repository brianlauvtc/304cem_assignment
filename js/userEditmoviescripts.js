
$(document).ready(function () {
    $('body').on('click', "#Cancel_Edit", function () {
     
	  window.location="/yourmoviedetail";
	 
    });

});
function getdisplaynum() {
    var mydata = { "type": "getdisplaynum" };
    $.ajax({

        type: "POST",
        url: "http://127.0.0.1:9999/getdisplaynum",
        dataType: "text",
        data: mydata,
        success: function (response) {



            movie_num = response.split("=");
            title_num = movie_num[1];

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}


$(document).ready(function () {
    $('body').on('click', "#posterChange", function () {
        var checkbox = document.getElementById("posterChange");

        if (checkbox.checked == true) {
            document.getElementById("NewMoviePoster").style.visibility = "visible";
        } else { document.getElementById("NewMoviePoster").style.visibility = "hidden"; }
    });
});



$(document).ready(function () {
    
        getdisplaynum();
        var mydata = { "type": "getonemoviedetailuseradd" };
        $.ajax({

            type: "POST",
            url: "http://127.0.0.1:9999/getonemoviedetailuseradd",
            dataType: 'JSON', // Data type, HTML, json etc.
            data: JSON.stringify(mydata), //Form variables
            success: function (response) {
			
			var srcc = "assets/img/" + response[title_num].Poster;
            document.getElementById("Movieimage").src = srcc;
                title = response[title_num].Movie_Name;
                document.getElementById("newMovieTitle").value = response[title_num].Movie_Name;
                document.getElementById("WebTitle").innerHTML = response[title_num].Movie_Name;

                var des_text = response[title_num].description;
                document.getElementById("newMovieDescription").value = des_text;
                var date_text = response[title_num].USreleasedate;
                document.getElementById("NewMovieDate").value = date_text;
                var director_text = response[title_num].Director;
                document.getElementById("NewMovieDirector").value = director_text;
                var actor_text = response[title_num].Maincharacters[0];
                for (i = 1; i < response[title_num].Maincharacters.length; i++) {
                    actor_text = actor_text + "/" + response[title_num].Maincharacters[i];
                }
                document.getElementById("newMovieActors").value = actor_text;
				document.getElementById("Movieimage").style.visibility = "visible";
				document.getElementById("Editform").style.visibility = "visible";
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
   

});
$(document).ready(function () {

    $('body').on('click', "#submitbutton", function () {

      
        setTimeout(updatemovie, 1000);

    });

});


function DoneEdit() {

    var mydata = "cancel";
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:9999/cancelposter",
        dataType: 'Text', // Data type, HTML, json etc.
        data: mydata, //Form variables
        success: function (response) {
          

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

}

function updatemovie() {
    var newMovieTitle = $("#newMovieTitle").val();
    var newMovieDescription = $("#newMovieDescription").val();
    var NewMovieDate = $("#NewMovieDate").val();
    var NewMovieDirector = $("#NewMovieDirector").val();
    var newMovieActors = $("#newMovieActors").val();
    var checkbox = document.getElementById("posterChange");
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
   
    if (checkbox.checked == true) {
        updateimage = "yes";
        var filename = $('#NewMoviePoster')[0].files;
        if (filename.length == 0) {
            alert("Please input the Movie Poster!");
            return;
        }
    } else { updateimage = "no"; }
  
    var mydata = { "old_Movie_Name": title, "newMovieTitle": newMovieTitle, "newMovieDescription": newMovieDescription, "NewMovieDate": NewMovieDate, "NewMovieDirector": NewMovieDirector, "newMovieActors": newMovieActors ,"updatePoster":updateimage};

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:9999/EditMovie",
        dataType: 'JSON', // Data type, HTML, json etc.
        data: JSON.stringify(mydata), //Form variables
        success: function (response) {
            DoneEdit();
            var res = JSON.stringify(response);
            var obj = JSON.parse(res);
            var result = obj.result;
            if (result == "success") {
                alert("Updated successfully");
                window.location = "/yourmoviedetail";
            } else { alert(result); }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}
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
$(document).ready(function () {

    $('body').on('click', "#RemoveMovie", function () {

        var mydata = { "title": title };

        $.ajax({

            type: "POST",
            url: "http://127.0.0.1:9999/removemovie",
            dataType: 'JSON', // Data type, HTML, json etc.
            data: JSON.stringify(mydata), //Form variables
            success: function (response) {
                var res = JSON.stringify(response);
                var obj = JSON.parse(res);
                var result = obj.result;
                if (result == "success") {
                    alert("Remove at Movie List successfully");
                    window.location = "/yourmovie";
                }
                if (result == "fail") {
                    alert("Remove at Movie List was fail");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    });

});
$( document ).ready(function() {

	   $('body').on('click', "#logout",function(){
		   
		logout();
	   });

});	






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

