var title;
var title_num;
var userName;

var details = false;
var actor= false;
var comment= false;

function show()
{
	if(details==true && actor == true && comment ==true)
	{
		document.getElementById("Movieimage").style.visibility="visible";
		document.getElementById("Details").style.visibility="visible";
	}
}

function update_database(table_id) {
    if (table_id != "Moviecomment") {
        var table = document.getElementById(table_id);
        var count = table.rows.length - 1;
        for (i = 0; i < count; i++) {
            table.deleteRow(1);
        }
    }
    else if (table_id == "Moviecomment") {
        var table = document.getElementById(table_id);

        var count = table.rows.length - 2;
        for (i = 0; i < count; i++) {
            table.deleteRow(1);
        }
    }
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
    $('body').on('click', "#Edit_Movie", function () {
     
	  window.location="/edit";
	 
    });

});

$(document).ready(function () {

    $('body').on('click', "#submitbutton", function () {

      
        setTimeout(updatemovie, 1000);

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

            document.getElementById("Movietitle").innerHTML = "Movie Title: " + response[title_num].Movie_Name;
            document.getElementById("WebTitle").innerHTML = response[title_num].Movie_Name;
            var image_alt = response[title_num].Movie_Name + " Poster";
            document.getElementById("Movieimage").alt = image_alt;
            var des_text = "Movie description: " + response[title_num].description;
            document.getElementById("Moviedes").innerHTML = des_text;
            var date_text = "Movie Release Date: " + response[title_num].USreleasedate;
            document.getElementById("Moviedate").innerHTML = date_text;
            var director_text = "Movie Director: " + response[title_num].Director;
            document.getElementById("MovieDirector").innerHTML = director_text;
			details = true;
			 show();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
});

$(document).ready(function () {
    getdisplaynum();
    update_database("Movieactors");
    var mydata = { "type": "getactordetailuseradd" };
    $.ajax({

        type: "POST",
        url: "http://127.0.0.1:9999/getactordetailuseradd",
        dataType: 'JSON', // Data type, HTML, json etc.
        data: JSON.stringify(mydata), //Form variables
        success: function (response) {

            for (i = 0; i < response[title_num].Maincharacters.length; i++) {
                var table = document.getElementById("Movieactors");
                var row = table.insertRow(i + 1);
                var cell1 = row.insertCell(0);
                var str = response[title_num].Maincharacters[i];
                var str_name = response[title_num].Maincharacters[i].split(" ");

                var actor_name = str_name[0];
                for (v = 1; v < str_name.length; v++) {
                    actor_name = actor_name + "_" + str_name[v];
                }
                var result = str.link("https://en.wikipedia.org/wiki/" + actor_name);

                cell1.innerHTML = result;
            }
			
			actor = true;
			 show();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
});

function updatacomment() {
    getdisplaynum();
    var mydata = { "title": title };

    $.ajax({

        type: "POST",
        url: "http://127.0.0.1:9999/getcommentdetailuseradd",
        dataType: 'JSON', // Data type, HTML, json etc.
        data: JSON.stringify(mydata), //Form variables
        success: function (response) {
             if(response[title_num].comment != null && response[title_num].comment.length != 0)
			 { for (i = 0; i < response[title_num].comment.length; i++) {
                var table = document.getElementById("Moviecomment");
                var row = table.insertRow(i + 1);
				
                var cell1 = row.insertCell(0);
				
                var str = response[title_num].comment[i];
                cell1.innerHTML = str;
            }
			comment = true;
			 show();}
			  if(response[title_num].comment == null || response[title_num].comment.length == 0)
			  {
				  comment = true;
			 show();
			  }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });
}

$(document).ready(function () {
    update_database("Moviecomment");
    updatacomment();
});
$(document).ready(function () {

    $('body').on('click', "#submitcomment", function () {

        var comment = $("#NewComment").val();
        if (comment == "") {
            alert("please enter the comment");
            return;
        }
        var mydata = "title=" + title + "&comment=" + comment;
        $.ajax({

            type: "POST",
            url: "http://127.0.0.1:9999/submitcomment",
            dataType: "text",
            data: mydata,
            success: function (response) {
                update_database("Moviecomment");
                updatacomment();
                document.getElementById("NewComment").value = "";
			comment = true;
			 show();
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });

    });
});
$(document).ready(function () {

    $('body').on('click', "#back_to_menber_page", function () {

        var mydata = "type=cancledisplay_movie_num&0";
        $.ajax({

            type: "POST",
            url: "http://127.0.0.1:9999/cancledisplay_movie_num",
            dataType: "text",
            data: mydata,
            success: function (response) {
                window.location = "/yourmovie";

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    });

});
$(document).ready(function () {

    var mydata = "type=checklogin&0";

    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:9999/checklogin",
        dataType: "text",
        data: mydata,
        success: function (response) {
            if (response == "null") {
                alert("Please login first");
                window.location = "/index";
            } else { userName = response; }

        },
        error: function (xhr, ajaxOptions, thrownError) {
            alert(thrownError);
        }
    });

});

$(document).ready(function () {

    $('body').on('click', "#logout", function () {

        var mydata = "type=logout&0";

        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:9999/logout",
            dataType: "text",
            data: mydata,
            success: function (response) {
                if (response == "success") {
                    alert("logout successfully");
                    window.location = "/index";
                }

            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
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

