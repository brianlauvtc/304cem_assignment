




function updateMovieList()
{
	var mydata={"type":"webapi"};
	   $.ajax({		   
		   type: "POST", 
		   url: "http://127.0.0.1:9999/webapi",
		   dataType:'JSON', // Data type, HTML, json etc.
           data:JSON.stringify(mydata), //Form variables
		   success:function(response)
		{ 		
				var obj = JSON.stringify(response);
				
				document.getElementById("apitext").innerHTML=obj;
				
			 
				},
				error:function(xhr, ajaxOptions, thrownError)
				{
				alert(thrownError);
				}		   
		});
}



$( document ).ready(function() {
	
	updateMovieList();	
	
});










