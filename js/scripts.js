/*!
    * Start Bootstrap - Grayscale v6.0.1 (https://startbootstrap.com/themes/grayscale)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-grayscale/blob/master/LICENSE)
    */
	




	$( document ).ready(function() {
	


     $('body').on('click', "#login",function(){
           
		   var loginuser = $("#Form-emaillORusername").val();
		   var loginpassword = $("#Form-pass").val();
	
		   
		   if(loginuser=="" )
		   {
		   alert("Please enter your username or email");
		   return;
		   }
		   if(loginpassword=="" )
		   {
		   alert("Please enter your password");
		   return;
		   }
		   
		
		   
		   if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(loginpassword) == false)
		   {
			alert("Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
			return;
		   }
		   
		 
		   var mydata={"username":loginuser,"pass":loginpassword};
		   
		   $.ajax({
		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/login",
		     dataType:'JSON', // Data type, HTML, json etc.
           data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   {
		   //alert(response);
		var res = JSON.stringify(response);
		  var obj = JSON.parse(res);
		  var result = obj.result;
			
		   if(result == "success")
		   {	alert("Login Success");
				
			 window.location="/menber";}
		   else if(result != "success")
		   {	alert(result);
			   window.location="/index";
		   }
		   },
		   error:function(xhr, ajaxOptions, thrownError)
		   {alert(thrownError);
		   }
		   });
		   
      });       
            
});

$( document ).ready(function() {
	
	 var mydata={"username":"text"};
	 $.ajax({
		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/uploadMovie",
		     dataType:'JSON', // Data type, HTML, json etc.
           data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   {
		  
		   },
		   error:function(xhr, ajaxOptions, thrownError)
		   {alert(thrownError);
		   }
		   });
		   
      });       
	




	$( document ).ready(function() {


     $('body').on('click', "#reg",function(){
            var regemail = $("#Form-email1reg").val();
		   var regusername = $("#Form-usernamereg").val();
		   var regpassword = $("#Form-passreg1").val();
		   var regpassword2 = $("#Form-passreg2").val();
		
		 
		   if(regusername=="" )
		   {
		   alert("Please enter your username");
		   return;
		   }
		   if(regemail=="" )
		   {
		   alert("Please enter your email");
		   return;
		   }
		  
		   if(regpassword=="" )
		   {
		   alert("Please enter your password");
		   return;
		   }
		    if(regpassword2=="" )
		   {
		   alert("Please enter your password again");
		   return;
		   }
		   
		   if(regpassword != regpassword2)
		   {
		   alert("Password not match");
		   return;
		   }
		   
		    if(/[a-z0-9._%+-]+@gmail.com/.test(regemail) == false)
		   {
			alert("Email Must followed by an @gmail.com");
			return;
		   }
		   if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(regpassword) == false)
		   {
			alert("Password Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters");
			return;
		   }
		   
		 
		   	var mydata={"email":regemail,"username":regusername,"pass":regpassword};
	
		   $.ajax({
		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/reg",
		  dataType:'JSON', // Data type, HTML, json etc.
           data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		   {
		  var res = JSON.stringify(response);
		  var obj = JSON.parse(res);
		  var result = obj.result;
           
		   if(result == "success")
		   {
			  
			   window.location="/menber";
			}
		   else if(result != "success")
		   {	alert(result);
			   window.location="/index";
		   }
		   },
		   error:function(xhr, ajaxOptions, thrownError)
		   {alert(thrownError);
		   }
		   });
		   
      });       
            
});
	

    (function ($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (
            location.pathname.replace(/^\//, "") ==
                this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length
                ? target
                : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 100,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict
