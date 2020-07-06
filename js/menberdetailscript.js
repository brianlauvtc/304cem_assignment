var oldUserName;
var oldpassword;



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
$( document ).ready(function() {
	
	
		var mydata={"type":"getuserdata"};
		 $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/getuserdata",
		   dataType:'JSON', // Data type, HTML, json etc.
            data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   {  	
				var	email_text = "Your Email : "+response[0].email;		
				document.getElementById("userEmail").innerHTML=email_text;
				var	user_text = "User Name : "+response[0].username;		
				document.getElementById("OlduserName").innerHTML=user_text;
				var	username_text = response[0].username;		
				document.getElementById("Newusername").value=username_text;
				oldUserName = response[0].username;
					
				oldpassword = response[0].PassWord; 
				var star =""
				
				for(i=0;i<response[0].PassWord.length;i++)
				{
					star = star + "*";
				}
				var user_pass = "Password : " + star;
				document.getElementById("Oldpassword").innerHTML=user_pass;
				
				
			
			 
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
});
	
$( document ).ready(function() {

	   $('body').on('click', "#EditUserName",function(){
		 	var	user_text = "User Name : ";	   
			document.getElementById("OlduserName").innerHTML=user_text;
			document.getElementById("Newusername").style.visibility = "visible";
			document.getElementById("submitEdit").style.visibility = "visible";
			document.getElementById("CancelEdit").style.visibility = "visible";
			document.getElementById("EditUserName").style.visibility = "hidden";
			
			
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#CancelEdit",function(){
		 		   
			var	user_text = "User Name : "+oldUserName;		   
			document.getElementById("OlduserName").innerHTML=user_text;
			document.getElementById("Newusername").style.visibility = "hidden";
			document.getElementById("submitEdit").style.visibility = "hidden";
			document.getElementById("CancelEdit").style.visibility = "hidden";
			document.getElementById("EditUserName").style.visibility = "visible";
			
			
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#Editpassword",function(){
		 	var	user_text = "Old Password : ";	   
			document.getElementById("Oldpassword").innerHTML=user_text;
			document.getElementById("oldpasswordinput").style.visibility = "visible";
			document.getElementById("submitEditpass").style.visibility = "visible";
			document.getElementById("CancelEditpass").style.visibility = "visible";
			document.getElementById("newpasswordtext1").style.visibility = "visible";
			document.getElementById("newpasswordtext2").style.visibility = "visible";
			document.getElementById("Newpasswordinput1").style.visibility = "visible";
			document.getElementById("Newpasswordinput2").style.visibility = "visible";
			document.getElementById("Editpassword").style.visibility = "hidden";
			
			
	   });

});

$( document ).ready(function() {

	   $('body').on('click', "#CancelEditpass",function(){
		 		   
			var star =""
		
				for(i=0;i<oldpassword.length;i++)
				{
					star = star + "*";
				}
				var user_pass = "Password : " + star;		   
			   
			document.getElementById("Oldpassword").innerHTML=user_pass;
			document.getElementById("oldpasswordinput").style.visibility = "hidden";
			document.getElementById("submitEditpass").style.visibility = "hidden";
			document.getElementById("CancelEditpass").style.visibility = "hidden";
			document.getElementById("newpasswordtext1").style.visibility = "hidden";
			document.getElementById("newpasswordtext2").style.visibility = "hidden";
			document.getElementById("Newpasswordinput1").style.visibility = "hidden";
			document.getElementById("Newpasswordinput2").style.visibility = "hidden";
			document.getElementById("Editpassword").style.visibility = "visible";
			
			
	   });

});
$( document ).ready(function() {

	   $('body').on('click', "#submitEditpass",function(){
		  
		 var oldpass = $("#oldpasswordinput").val();
		 var newpass1 = $("#Newpasswordinput1").val();
		 var newpass2 = $("#Newpasswordinput2").val();
		 if(oldpass=="" )
		   {
		   alert("Please enter your old password");
		   return;
		   }
		   if(newpass1=="" )
		   {
		   alert("Please enter your new password");
		   return;
		   }
		   if(newpass2=="" )
		   {
		   alert("Please enter your new password again");
		   return;
		   }
		   if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(oldpass) == false)
		   {
			alert("Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
			return;
		   }
		     if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(newpass1) == false)
		   {
			alert("Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
			return;
		   }
		     if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(newpass2) == false)
		   {
			alert("Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
			return;
		   }
		    if(newpass1 != newpass2)
		   {
		   alert("New Password not match");
		   return;
		   }
		    if(oldpass != oldpassword)
		   {
		   alert("Old Password not match");
		   return;
		   }
		   
		 
		var mydata={"old":oldpassword,"newpass":newpass1};
			$.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/editpassword",
		   dataType:'JSON', // Data type, HTML, json etc.
            data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   { 
		   oldpassword = newpass1; 
		
			var star =""
				for(i=0;i<oldpassword.length;i++)
				{
					star = star + "*";
				}
				var user_pass = "Password : " + star;		   
			   
			document.getElementById("Oldpassword").innerHTML=user_pass;
			document.getElementById("oldpasswordinput").style.visibility = "hidden";
			document.getElementById("submitEditpass").style.visibility = "hidden";
			document.getElementById("CancelEditpass").style.visibility = "hidden";
			document.getElementById("newpasswordtext1").style.visibility = "hidden";
			document.getElementById("newpasswordtext2").style.visibility = "hidden";
			document.getElementById("Newpasswordinput1").style.visibility = "hidden";
			document.getElementById("Newpasswordinput2").style.visibility = "hidden";
			document.getElementById("Editpassword").style.visibility = "visible";
			alert("Edit successfully");
			alert("Please login again");
			logout();
			},
			error:function(xhr, ajaxOptions, thrownError)
			{
			alert(thrownError);
			}		   
		});
		
			
			
	   });

});
$( document ).ready(function() {

	   $('body').on('click', "#submitEdit",function(){
		 var newUserName = $("#Newusername").val();
		  if(newUserName=="" )
		   {
		   alert("Please enter your new username");
		   return;
		   }
		if(newUserName=="WebCreator" )
		{
			alert("You can't use this name. Please use other name.");
		   return;
		}
		 var mydata={"old":oldUserName,"newName":newUserName};
		 
			$.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/editusername",
		    dataType:'JSON', // Data type, HTML, json etc.
            data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   { oldUserName = newUserName;
		   var user_text = "User Name : "+newUserName;		   
			document.getElementById("OlduserName").innerHTML=user_text;
			document.getElementById("Newusername").style.visibility = "hidden";
			document.getElementById("submitEdit").style.visibility = "hidden";
			document.getElementById("CancelEdit").style.visibility = "hidden";
			document.getElementById("EditUserName").style.visibility = "visible";
			alert("Edit successfully");
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
