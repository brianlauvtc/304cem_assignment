var http = require('http');
var fs = require("fs");
var qs = require('querystring');
var formidable = require('formidable');
var nodemailer = require('nodemailer');
var MongoClient = require('mongodb').MongoClient;

var dbUrl = "mongodb://localhost:27017/";

var insertresult;
var result_name;
var display_movie_num;
var updatedset = false;
var Commentset = false;
var Deleteset = false;
var file_name;
http.createServer(function (request, response) {

    if (request.url === "/index") {
        sendFileContent(response, "index.html", "text/html");
    } else if (request.url === "/") {
        console.log("Requested URL is url" + request.url);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<b>Hey there!</b><br /><br />This is the default response. Requested URL is: ' + request.url);
    } else if (request.url === "/form") {
        sendFileContent(response, "nonmenber.html", "text/html");
    } else if (request.url === "/personal") {
        sendFileContent(response, "PersonalDetail.html", "text/html");
    } else if (request.url === "/menber") {
        sendFileContent(response, "menber.html", "text/html");

    } else if (request.url === "/fav") {
        sendFileContent(response, "favList.html", "text/html");

    } else if (request.url === "/fav2") {
        sendFileContent(response, "MovieDetailPageRemove.html", "text/html");

    } else if (request.url === "/movie") {
        sendFileContent(response, "MovieDetailPage.html", "text/html");

    } else if (request.url === "/addnew") {
        sendFileContent(response, "NewMovieImport.html", "text/html");

    } else if (request.url === "/yourmovie") {
        sendFileContent(response, "UserAddMovieListPage.html", "text/html");

    } else if (request.url === "/yourmoviedetail") {
        sendFileContent(response, "UserAddMovieDetailPage.html", "text/html");

    } else if (request.url === "/getapi") {
        sendFileContent(response, "webapi.html", "text/html");

    } else if (request.url === "/movielistapipage") {
        sendFileContent(response, "MovieListAPI.html", "text/html");

    } else if (request.url === "/edit") {
        sendFileContent(response, "UserEditMoviePage.html", "text/html");

    }
	else if (request.url === "/reg") {
        if (request.method === "POST") {
            formData = '';
            return request.on('data', function (data) {
                formData = '' + data;

                var obj = JSON.parse(formData);

                return request.on('end', function () {
                    /////////////////////
                    MongoClient.connect(dbUrl, function (err, db) {
                        var finalcount;
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var favName = obj.username + "_fav";
						 
                        var myobj = { "email": obj.email, "username": obj.username, "PassWord": obj.pass, "FavListName": favName};
                        //	dbo.collection("login").count(myobj, function(err, count){
                        //console.log(err, count);
                        //finalcount = count;
                        var query = { "email": obj.email };

                        dbo.collection("login").find(query).toArray(function (err, result) {

                            if (err) throw err;
                            var n = result.length;
                            console.log(n);
                            if (n == 0) {
                                var query2 = { "username": obj.username };
                                dbo.collection("login").find(query).toArray(function (err, result) {

                                    if (err) throw err;
                                    var n = result.length;

                                    if (n == 0) {


                                        dbo.collection("login").insertOne(myobj, function (err, res) {
                                            if (err) throw err;

                                            dbo.createCollection(favName, function (err, res) {
                                                if (err) throw err;
                                                console.log("Collection created!");
                                                db.close();
                                            });
                                            result_name = obj.username;

                                            console.log("user register success");

                                            return response.end('{"result":"success"}');
                                            db.close();
                                        });
                                    } else {
                                        db.close();
                                        console.log("user register fail : This username is already registered");
                                        return response.end('{"result":"This username is already registered"}');
                                    }

                                });


                            } else {
                                db.close();
                                console.log("user register fail : This email is already registered");
                                return response.end('{"result":"This email is already registered"}');
                            }

                        });


                    });
                    //return res.end(msg);

                    //					});
                });


            });
        }
    }
    else if (request.url === "/login") {
        if (request.method === "POST") {
            formData = '';
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {

                    MongoClient.connect(dbUrl, function (err, db) {
                        var finalcount;
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var query = { "username": obj.username };
                        //	dbo.collection("login").count(myobj, function(err, count){
                        //console.log(err, count);
                        //finalcount = count;

                        dbo.collection("login").find(query).toArray(function (err, result) {

                            if (err) throw err;

                            if (result.length == 0) {
                                var query2 = { "email": obj.username };

                                dbo.collection("login").find(query2).toArray(function (err, result2) {

                                    if (result2.length == 0) {
                                        db.close();
                                        console.log("Login Fail: This user name has not been registered");
                                        return response.end('{"result":"This user name has not been registered"}');
                                    } else {
										
										
										
                                        var n = result2[0].PassWord;
                                        if (n == obj.pass) {
											 result_name = obj.username;
                                            db.close();
                                            console.log("Login Succuss");

                                            return response.end('{"result":"success"}');
											
												
											
											
											
											
                                        } else {
                                            db.close();
                                            console.log("Login Fail: Wrong password");
                                            return response.end('{"result":"Wrong password"}');
                                        }
										
										
										
                                    }

                                });

                            } else {
                                var n = result[0].PassWord;
                                if (n == obj.pass) {
									 db.close();
                                    console.log("Login Succuss");
                                    result_name = obj.username;
                                    return response.end('{"result":"success"}');
									
									
                                } else {
                                    db.close();
                                    console.log("Login Fail: Wrong password");
                                    return response.end('{"result":"Wrong password"}');
                                }

                            }

                            //return res.end(msg);

                            //					});
                        });


                    });


                });
            });
        }
    }
    else if (request.url === "/ShowFavDetail") {
		
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
					if(result_name != null)
					{  MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };

                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;

                            dbo.collection(result[0].FavListName).find().toArray(function (err, result2) {
                                if (err) throw err;



                                var resultReturn = JSON.stringify(result2);
                                db.close();
                                return response.end(resultReturn);
                            });
                        });
                    });

				}
                });
            });
        }
    }
    else if (request.url === "/ShowMovieData") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");

                        dbo.collection("MovieList").find().toArray(function (err, result) {
                            if (err) throw err;



                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);
                        });
                    });



                });
            });
        }
    }
    else if (request.url === "/cancledisplay_movie_num") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                ;
                return request.on('end', function () {
                    display_movie_num = null;
                    return response.end("success");
                });
            });
        }
    }
    else if (request.url === "/sendmoviedetail") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var db_data = spileText(formData);
                return request.on('end', function () {


                    display_movie_num = db_data[1];

                    return response.end("success");

                });
            });
        }
    }
    else if (request.url === "/removefav") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {

                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };

                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;

                            if (result.length == 1) {
                                var myquery2 = { "Movie_Name": obj.title };

                                var collectionName = result[0].FavListName;
                                dbo.collection(collectionName).find(myquery2).toArray(function (err, result2) {

                                    if (err) throw err;

                                    if (result2.length == 1) {

                                        dbo.collection(collectionName).deleteOne(myquery2, function (err, obj) {
                                            if (err) throw err;
                                            console.log("1 document deleted");
                                            db.close();
                                            return response.end('{"result":"success"}');
                                        });
                                    }
                                    else { return response.end('{"result":"fail"}'); }



                                });

                            }

                        });
                    });


                });
            });
        }
    }
    else if (request.url === "/Addfav") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };

                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;

                            if (result.length == 1) {
                                var myquery2 = { "Movie_Name": obj.title };
                                var collectionName = result[0].FavListName;
                                dbo.collection(collectionName).find(myquery2).toArray(function (err, result2) {

                                    if (err) throw err;

                                    if (result2.length == 1) {
                                        db.close();
                                        return response.end('{"result":"fail"}');
                                    }
                                    if (result2.length == 0) {

                                        dbo.collection("MovieList").find(myquery2).toArray(function (err, result3) {

                                            if (result3.length == 1) {

                                                var myobj = { "Movie_Name": result3[0].Movie_Name, "description": result3[0].description, "USreleasedate": result3[0].USreleasedate, "Director": result3[0].Director, "Maincharacters": result3[0].Maincharacters, "Poster": result3[0].Poster, "comment": result3[0].comment, "Edit": result3[0].Edit };
                                                dbo.collection(collectionName).insertOne(myobj, function (err, res) {
                                                    if (err) throw err;
                                                    db.close();
                                                    return response.end('{"result":"success"}');

                                                });
                                            }

                                        });

                                    }


                                });

                            }

                        });
                    });



                });
            });
        }
    }
    else if (request.url === "/getactordetail") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        dbo.collection("MovieList").find().toArray(function (err, result) {
                            if (err) throw err;
                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);

                        });
                    });



                });
            });
        }
    }
    else if (request.url === "/getonemoviedetail") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);

                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        dbo.collection("MovieList").find().toArray(function (err, result) {
                            if (err) throw err;

                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);
                        });
                    });



                });
            });
        }
    }
    else if (request.url === "/getfavactordetail") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
					if(result_name != null)
					{
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };

                        dbo.collection("login").find(myquery).toArray(function (err, result2) {
                            if (err) throw err;
                            if (result2.length == 1) {
                                var collectionName = result2[0].FavListName;
                                dbo.collection(collectionName).find().toArray(function (err, result) {
                                    if (err) throw err;
                                    var resultReturn = JSON.stringify(result);
                                    db.close();
                                    return response.end(resultReturn);

                                });
                            }
                        });
                    });
					}

                });
            });
        }
    }
    else if (request.url === "/getfavonemoviedetail") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
	if(result_name != null)
					{
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };
                        dbo.collection("login").find(myquery).toArray(function (err, result2) {
                            if (err) throw err;
                            if (result2.length == 1) {
                                var collectionName = result2[0].FavListName;
                                dbo.collection(collectionName).find().toArray(function (err, result) {
                                    if (err) throw err;
                                    var resultReturn = JSON.stringify(result);
                                    db.close();
                                    return response.end(resultReturn);
                                });
                            }
                        });
                    });
					}

                });
            });
        }
    }
    else if (request.url === "/logout") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var db_data = spileText(formData);
                return request.on('end', function () {
                    result_name = null;
                    return response.end("success");


                });
            });
        }
    }
    else if (request.url === "/getuserdata") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };
                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 1) {


                                var resultReturn = JSON.stringify(result);
                                db.close();
                                return response.end(resultReturn)
                            }

                        });
                    });
                });
            });
        }
    }
    else if (request.url === "/editusername") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {

                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };

                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 1) {
                                var oldfavName = result[0].FavListName;
                                var favName = obj.newName + "_fav";
                                var newvalues = { $set: { "username": obj.newName, "FavListName": favName } };
                                dbo.collection("login").updateOne(myquery, newvalues, function (err, res) {
                                    if (err) throw err;
                                    result_name = obj.newName;
                                    dbo.createCollection(favName, function (err, res) {
                                        if (err) throw err;
                                        console.log("Collection created!");

                                    });
                                    dbo.collection(oldfavName).find().toArray(function (err, result2) {
                                        if (err) throw err;
                                        if (result2.length == 0) {
                                            dbo.collection(oldfavName).drop(function (err, delOK) {
                                                if (err) throw err;
                                                if (delOK) console.log("Collection deleted");
                                                db.close();
                                                return response.end('{"result":"success"}');
                                            });

                                        } else if (result2.length >= 1) {
                                            var myobj = result2;

                                            dbo.collection(favName).insertMany(myobj, function (err, res) {
                                                if (err) throw err;
                                                console.log("Number of documents inserted: " + res.insertedCount);
                                                dbo.collection(oldfavName).drop(function (err, delOK) {
                                                    if (err) throw err;
                                                    if (delOK) console.log("Collection deleted");
                                                    db.close();
                                                    return response.end('{"result":"success"}');
                                                });
                                            });

                                        }


                                    });




                                });
                            }
                        });
                    });
                });
            });
        }
    }
    else if (request.url === "/editpassword") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {

                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };

                        dbo.collection("login").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 1) {

                                var newvalues = { $set: { "PassWord": obj.newpass } };
                                dbo.collection("login").updateOne(myquery, newvalues, function (err, res) {
                                    if (err) throw err;

                                    db.close();
                                    return response.end('{"result":"success"}');

                                });

                            }



                        });
                    });
                });
            });
        }
    }
    else if (request.url === "/checklogin") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var db_data = spileText(formData);
                return request.on('end', function () {

                    if (result_name == null) {
                        return response.end("null");
                    } else { return response.end(result_name); }



                });
            });
        }
    }
    else if (request.url === "/getcommentdetail") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        dbo.collection("MovieList").find().toArray(function (err, result) {
                            if (err) throw err;
                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);

                        });
                    });



                });
            });
        }
    }
    else if (request.url === "/getfavcommentdetail") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
					if(result_name != null)
					{
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "username": result_name };

                        dbo.collection("login").find(myquery).toArray(function (err, result2) {
                            if (err) throw err;
                            if (result2.length == 1) {
                                var collectionName = result2[0].FavListName;
                                dbo.collection(collectionName).find().toArray(function (err, result) {
                                    if (err) throw err;
                                    var resultReturn = JSON.stringify(result);
                                    db.close();
                                    return response.end(resultReturn);

                                });
                            }
                        });
                    });
					}


                });
            });
        }
    }
    else if (request.url === "/submitcomment") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var db_data = spileText(formData);
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Movie_Name": db_data[0] };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 1) {
                                if (result[0].comment == null) {
                                    var data = [];
                                    data[0] = db_data[1];

                                    var newvalues1 = { $set: { "comment": data } };
                                    dbo.collection("MovieList").updateOne(myquery, newvalues1, function (err, res) {
                                        if (err) throw err;


                                    });
                                }
                                else if (result[0].comment.length == 1) {
                                    var data = [];
                                    data[0] = result[0].comment[0];
                                    data[1] = db_data[1];
                                    var newvalues1 = { $set: { "comment": data } };
                                    dbo.collection("MovieList").updateOne(myquery, newvalues1, function (err, res) {
                                        if (err) throw err;


                                    });
                                }
                                else if (result[0].comment.length > 1) {
                                    var data = [];
                                    for (i = 0; i < result[0].comment.length; i++) {
                                        data[i] = result[0].comment[i];
                                    }
                                    data[result[0].comment.length] = db_data[1];
                                    var newvalues1 = { $set: { "comment": data } };
                                    dbo.collection("MovieList").updateOne(myquery, newvalues1, function (err, res) {
                                        if (err) throw err;


                                    });
                                }




                            }




                        });




                        dbo.collection("login").find().toArray(function (err, result2) {
                            if (err) throw err;
                            var loopcount = result2.length;
                            var length2 = 0;
                            var myquery3 = { "Movie_Name": db_data[0] };

                            for (g = 0; g < loopcount; g++) {
                                AddCommentFavEach(result2, g, myquery3, dbo, db_data);


                                if (Commentset = true) {
                                    length2++;

                                    Commentset = false;
                                    if (length2 == loopcount) {
                                        return response.end("success");
                                        db.close();
                                    }
                                }

                            }





                        });

                    });
                });
            });
        }
    }
    else if (request.url === "/getdisplaynum") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;

                return request.on('end', function () {

                    return response.end("num=" + display_movie_num);


                });
            });
        }
    }
    else if (request.url === "/checkAddSuccessfully") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                console.log("ok");
                return request.on('end', function () {


                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Movie_Name": obj.newMovieTitle };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                           
                           
                            if (result.length != 0) {
                                return response.end('{"result":"There are same movie in the database."}');
                                db.close();
                            } else if (result.length == 0) {
                                
                                 var Actors_list = obj.newMovieActors.split("/");
                                 var mydata = { "Movie_Name": obj.newMovieTitle, "description": obj.newMovieDescription, "USreleasedate": obj.NewMovieDate, "Director": obj.NewMovieDirector, "Maincharacters": Actors_list, "Poster": file_name, "Edit": result_name };
                                 dbo.collection("MovieList").insertOne(mydata, function (err, res) {
                                     if (err) throw err;
                                     insertresult = "success";
                                     console.log("Insert Success");
                                      db.close();
                                     return response.end('{"result":"success"}');

                                 });

                                        

                                    
                            }
                            

                        });

                    });



                });
            });
        }
    }
    else if (request.url === "/ShowUserAddMovieData") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
					if(result_name != null)
					{
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Edit": result_name };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            var database_data;


                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);
                        });
                    });
					}


                });
            });
        }
    }
    else if (request.url === "/removemovie") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        dbo.collection("login").find().toArray(function (err, result) {
                            if (err) throw err;
                            var loopcount = result.length;
                            var length2 = 0;
                            var clear = false;
                            for (i = 0; i < loopcount; i++) {
                                DeleteFavEach(result, i, obj, dbo);

                                if (Deleteset = true) {
                                    length2++;

                                    Deleteset = false;
                                    if (length2 == loopcount) {
                                        clear = true;
                                    }
                                }


                            }
                            if (clear == true) {
                                var myquery2 = { "Movie_Name": obj.title };
                                dbo.collection("MovieList").find(myquery2).toArray(function (err, result3) {
                                    if (result3.length == 1) {
                                        dbo.collection("MovieList").deleteOne(myquery2, function (err, obj) {
                                            if (err) throw err;

                                            db.close();
                                            return response.end('{"result":"success"}');
                                        });
                                    }
                                });

                            }


                        });
                    });


                });
            });
        }
    }
    else if (request.url === "/getcommentdetailuseradd") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
					if(result_name != null)
					{
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Edit": result_name };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);

                        });
                    });
					}


                });
            });
        }
    }
    else if (request.url === "/getactordetailuseradd") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
					if(result_name != null)
					{
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Edit": result_name };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);

                        });
                    });
					}


                });
            });
        }
    }
    else if (request.url === "/getonemoviedetailuseradd") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);

                return request.on('end', function () {
					if(result_name != null)
					{
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Edit": result_name };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;

                            var resultReturn = JSON.stringify(result);
                            db.close();
                            return response.end(resultReturn);
                        });
                    });

					}

                });
            });
        }
    }
    else if (request.url === "/EditMovie") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
                var obj = JSON.parse(formData);
                return request.on('end', function () {
                    var done1 = false;

                    var oldMovieTitle = obj.old_Movie_Name;
                    var newMovieTitle = obj.newMovieTitle;
                    var newMovieDescription = obj.newMovieDescription;
                    var NewMovieDate = obj.NewMovieDate;
                    var NewMovieDirector = obj.NewMovieDirector;
                    var newMovieActors = obj.newMovieActors;
                    var actors_list = newMovieActors.split("/");
                    var updatePoster = obj.updatePoster;
                    MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Movie_Name": oldMovieTitle };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
                            if (result.length == 1) {

                                var newvalues;
                                if (file_name == null || updatePoster == "no") {
                                    newvalues = { $set: { "Movie_Name": newMovieTitle, "description": newMovieDescription, "USreleasedate": NewMovieDate, "Director": NewMovieDirector, "Maincharacters": actors_list } };
                                }

                                if (file_name != null) {
                                    newvalues = { $set: { "Movie_Name": newMovieTitle, "description": newMovieDescription, "USreleasedate": NewMovieDate, "Director": NewMovieDirector, "Maincharacters": actors_list, "Poster": file_name } };
                                }
                                dbo.collection("MovieList").updateOne(myquery, newvalues, function (err, res) {
                                    if (err) throw err;

                                    done1 = true;
                                    dbo.collection("login").find().toArray(function (err, result2) {
                                        if (err) throw err;
                                        var length = result2.length;
                                        var length2 = 0;


                                        for (i = 0; i < length; i++) {
                                            UpdateFavEach(dbo, result2, myquery, obj, i, updatePoster);


                                            if (updatedset = true) {
                                                length2++;

                                                updatedset = false;
                                                if (length2 == length) {

                                                
                                                    return response.end('{"result":"success"}');
                                                    db.close();
                                                }
                                            }



                                        }








                                    });

                                });
                            }


                        });



                    });
                });
            });
        }
    }
    else if (request.url === "/Moviefileupload") {
        if (request.method === "POST") {
          
            console.log("ok1");
            var form = new formidable.IncomingForm(); console.log("ok2");
            form.parse(request, function (err, fields, files) {
                console.log("ok4");  var oldpath = files.NewMoviePoster.path; console.log("ok3");
                if (files.NewMoviePoster.name == "") {
                    file_name = null; console.log("ok56");
                } else {
                    console.log("ok5");
                    file_name = files.NewMoviePoster.name; console.log("ok6");
                    var newpath = 'assets/img/' + files.NewMoviePoster.name; console.log("ok7");
                    fs.rename(oldpath, newpath, function (err) {
                        if (err) throw err;
                      

                    });
                }
               
               
            });


             
        }
    }
    else if (request.url === "/cancelposter") {
        if (request.method === "POST") {
            return request.on('data', function (data) {
                formData = '' + data;
           
                return request.on('end', function () {
                    file_name = null;  

                    return response.end("success");

                });
            });
        }
    }
	else if(request.url === "/uploadMovie")	{
		if (request.method === "POST") 
		{
			return request.on('data', function(data) {
						formData =''+data;
						var obj = JSON.parse(formData);
						return request.on('end', function() {
							  MongoClient.connect(dbUrl, function (err, db) {
                        if (err) throw err;
                        var dbo = db.db("Assign_database");
                        var myquery = { "Edit": "WebCreator" };
                        dbo.collection("MovieList").find(myquery).toArray(function (err, result) {
                            if (err) throw err;
								if(result.length == 23)
								{db.close();
								 return response.end('{"result":"fail"}');}
								if(result.length!=23)
								{
									var myobj = [
							{"Movie_Name":"Iron Man" ,"description":"In the film, following his escape from captivity by a terrorist group, world famous industrialist and master engineer Tony Stark builds a mechanized suit of armor and becomes the superhero Iron Man.","USreleasedate" : "May 2, 2008", "Director" : "Jon Favreau", "Maincharacters":["Robert Downey Jr.", "Terrence Howard", "Jeff Bridges", "Shaun Toub", "Gwyneth Paltrow"], "Poster":"IronManposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"The Incredible Hulk" , "description":"In the film, Bruce Banner becomes the Hulk as an unwitting pawn in a military scheme to reinvigorate the Super-Soldier program through gamma radiation. Banner goes on the run from the military while attempting to cure himself of the Hulk.","USreleasedate" : "June 13, 2008", "Director" : "Louis Leterrier", "Maincharacters":["Edward Norton", "Liv Tyler", "Tim Roth", "Tim Blake Nelson", "Ty Burrell", "William Hurt"], "Poster":"TheIncredibleHulkposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Iron Man 2" , "description":"Six months after Iron Man, Tony Stark resists calls from the United States government to hand over the Iron Man technology, which is causing his declining health. Meanwhile, Russian scientist Ivan Vanko uses his own version of the technology to pursue a vendetta against the Stark family.","USreleasedate" : "May 7, 2010", "Director" : "Jon Favreau", "Maincharacters":["Robert Downey Jr", "Don Cheadle", "Scarlett Johansson", "Sam Rockwell", "Gwyneth Paltrow" , "Mickey Rourke" , "Samuel L. Jackson"], "Poster":"IronMan2poster.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Thor" ,"description":"After reigniting a dormant war, Thor is banished from Asgard to Earth, stripped of his powers and his hammer Mjölnir. As his brother Loki plots to take the Asgardian throne, Thor must prove himself worthy.","USreleasedate" : "May 6, 2011", "Director" : "Kenneth Branagh", "Maincharacters":["Chris Hemsworth", "Natalie Portman", "Tom Hiddleston", "Stellan Skarsgård", "Colm Feore" , "Ray Stevenson" , "Idris Elba" , "Kat Dennings" , "Rene Russo" , "Anthony Hopkins"], "Poster":"Thorposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Captain America: The First Avenger" ,"description":"During World War II, Steve Rogers, a sickly man, is transformed into the super-soldier Captain America and must stop the Red Skull from using the Tesseract as an energy-source for world domination.","USreleasedate" : "July 22, 2011", "Director" : "Joe Johnston", "Maincharacters":["Chris Evans", "Tommy Lee Jones", "Hugo Weaving", "Hayley Atwell", "Sebastian Stan" , "Dominic Cooper" , "Neal McDonough" , "Derek Luke" , "Stanley Tucci" ], "Poster":"CaptainAmericaTheFirstAvengerposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Marvel's The Avengers" ,"description":"In the film, Nick Fury and the spy agency S.H.I.E.L.D. recruit Tony Stark, Steve Rogers, Bruce Banner, and Thor to form a team capable of stopping Thor's brother Loki from subjugating Earth.","USreleasedate" : "May 4, 2012", "Director" : "Joss Whedon", "Maincharacters":["Chris Evans", "Robert Downey Jr.", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson" , "Jeremy Renner" , "Tom Hiddleston" , "Clark Gregg" , "Cobie Smulders" , "Stellan Skarsgård", "Samuel L. Jackson"], "Poster":"TheAvengers2012filmposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Iron Man 3" ,"description":"In Iron Man 3, Tony Stark wrestles with the ramifications of the events of The Avengers during a national terrorism campaign on the United States led by the mysterious Mandarin.","USreleasedate" : "May 3, 2013", "Director" : "Shane Black", "Maincharacters":["Gwyneth Paltrow", "Robert Downey Jr.", "Don Cheadle", "Guy Pearce", "Rebecca Hall" , "Stéphanie Szostak" , "James Badge Dale" , "Jon Favreau" , "Ben Kingsley" ], "Poster":"IronMan3theatricalposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Thor: The Dark World" ,"description":"In the film, Thor and Loki team up to save the Nine Realms from the Dark Elves.","USreleasedate" : "November 8, 2013", "Director" : "Alan Taylor", "Maincharacters":["Chris Hemsworth", "Natalie Portman", "Tom Hiddleston", "Stellan Skarsgård", "Anthony Hopkins" , "Christopher Eccleston" , "Adewale Akinnuoye-Agbaje" , "Kat Dennings" , "Idris Elba" , "Ray Stevenson" , "Zachary Levi" , "Tadanobu Asano" , "Jaimie Alexander" , "Rene Russo"], "Poster":"ThorTheDarkWorldposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Captain America: The Winter Soldier" ,"description":"In the film, Captain America joins forces with Black Widow and Falcon to uncover a conspiracy within the spy agency S.H.I.E.L.D. while facing a mysterious assassin known as the Winter Soldier.","USreleasedate" : "April 4, 2014", "Director" : "Anthony and Joe Russo", "Maincharacters":["Chris Evans", "Scarlett Johansson", "Sebastian Stan", "Anthony Mackie", "Cobie Smulders" , "Frank Grillo" , "Emily VanCamp" , "Hayley Atwell" , "Robert Redford" , "Samuel L. Jackson"], "Poster":"CaptainAmericaTheWinterSoldier.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Guardians of the Galaxy" ,"description":"In the film, Peter Quill and a group of extraterrestrial criminals go on the run after stealing a powerful artifact.","USreleasedate" : "August 1, 2014", "Director" : "James Gunn", "Maincharacters":["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel", "Bradley Cooper" , "Lee Pace" , "Michael Rooker" , "Karen Gillan" , "Djimon Hounsou" , "John C. Reilly", "Glenn Close" , "Benicio del Toro"], "Poster":"GuardiansoftheGalaxyposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Avengers: Age of Ultron" ,"description":"In the film, the Avengers fight Ultron, an artificial intelligence obsessed with causing human extinction.","USreleasedate" : "May 1, 2015", "Director" : "Joss Whedon", "Maincharacters":["Chris Evans", "Robert Downey Jr.", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson" , "Jeremy Renner" , "Don Cheadle" , "Aaron Taylor-Johnson" , "Elizabeth Olsen" , "Paul Bettany", "Cobie Smulders" , "Anthony Mackie" , "Hayley Atwell" , "Idris Elba" , "Stellan Skarsgård" , "James Spader" , "Samuel L. Jackson"], "Poster":"AvengersAgeofUltronposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
														
							{"Movie_Name":"Ant-Man" ,"description":"In the film, Lang must help defend Pym's Ant-Man shrinking technology and plot a heist with worldwide ramifications.","USreleasedate" : "July 17, 2015", "Director" : "Peyton Reed", "Maincharacters":["Paul Rudd", "Evangeline Lilly", "Corey Stoll", "Bobby Cannavale", "Michael Peña" , "T.I." , "Anthony Mackie" , "Wood Harris" , "Judy Greer" , "David Dastmalchian", "Michael Douglas" ], "Poster":"Ant-Manposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Captain America: Civil War" ,"description":"In Captain America: Civil War, disagreement over international oversight of the Avengers fractures the team into opposing factions—one led by Steve Rogers and the other by Tony Stark.","USreleasedate" : "May 6, 2016", "Director" : "Anthony and Joe Russo", "Maincharacters":["Chris Evans", "Scarlett Johansson", "Sebastian Stan", "Anthony Mackie", "Robert Downey Jr." , "Don Cheadle" , "Jeremy Renner" , "Chadwick Boseman" , "Paul Bettany" , "Elizabeth Olsen" , "Paul Rudd" , "Emily VanCamp" , "Tom Holland" , "Frank Grillo" , "William Hurt" , "Daniel Brühl"], "Poster":"CaptainAmericaCivilWarposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Doctor Strange" ,"description":"In the film, Strange learns the mystic arts after a career-ending car crash.","USreleasedate" : "November 4, 2016", "Director" : "Scott Derrickson", "Maincharacters":["Benedict Cumberbatch", "Chiwetel Ejiofor", "Rachel McAdams", "Benedict Wong", "Michael Stuhlbarg" , "Benjamin Bratt" , "Scott Adkins" , "Mads Mikkelsen" , "Tilda Swinton"], "Poster":"DoctorStrangeposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Guardians of the Galaxy Vol. 2" ,"description":"In Guardians of the Galaxy Vol. 2, the Guardians travel throughout the cosmos as they help Peter Quill learn more about his mysterious parentage.","USreleasedate" : "May 5, 2017", "Director" : "James Gunn", "Maincharacters":["Chris Pratt", "Zoe Saldana", "Dave Bautista", "Vin Diesel", "Bradley Cooper" , "Karen Gillan" , "Michael Rooker" , "Pom Klementieff" , "Elizabeth Debicki" , "Chris Sullivan", "Sean Gunn" , "Sylvester Stallone", "Kurt Russell"], "Poster":"GuardiansoftheGalaxyVol2poster.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Spider-Man: Homecoming" ,"description":"In Spider-Man: Homecoming, Peter Parker tries to balance high school life with being Spider-Man while facing the Vulture.","USreleasedate" : "July 7, 2017", "Director" : "Jon Watts", "Maincharacters":["Robert Downey Jr", "Tom Holland", "Michael Keaton", "Jon Favreau", "Gwyneth Paltrow" , "Zendaya" , "Donald Glover" , "Jacob Batalon" , "Laura Harrier" , "Tony Revolori" , "Bokeem Woodbine" , "Tyne Daly" , "Marisa Tomei"], "Poster":"Spider-ManHomecomingposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Thor: Ragnarok" ,"description":" In Thor: Ragnarok, Thor must escape the alien planet Sakaar in time to save Asgard from Hela and the impending Ragnarök.","USreleasedate" : "November 3, 2017", "Director" : "Taika Waititi", "Maincharacters":["Chris Hemsworth", "Cate Blanchett", "Tom Hiddleston", "Jeff Goldblum", "Tessa Thompson" , "Christopher Eccleston" , "Adewale Akinnuoye-Agbaje" , "Kat Dennings" , "Idris Elba" , "Ray Stevenson" , "Karl Urban" , "Mark Ruffalo" , "Anthony Hopkins" ], "Poster":"ThorRagnarokposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Black Panther" ,"description":"In Black Panther, T'Challa is crowned king of Wakanda following his father's death, but he is challenged by Killmonger who plans to abandon the country's isolationist policies and begin a global revolution.","USreleasedate" : "February 16, 2018", "Director" : "Ryan Coogler", "Maincharacters":["Chadwick Boseman", "Michael B. Jordan", "Lupita Nyong'o", "Danai Gurira", "Martin Freeman" , "Daniel Kaluuya" , "Letitia Wright" , "Winston Duke" , "Angela Bassett" , "Forest Whitaker" , "Andy Serkis"  ], "Poster":"BlackPantherfilmposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Avengers: Infinity War" ,"description":"In the film, the Avengers and the Guardians of the Galaxy attempt to prevent Thanos from collecting the six all-powerful Infinity Stones as part of his quest to kill half of all life in the universe.","USreleasedate" : "April 27, 2018", "Director" : "Anthony and Joe Russo", "Maincharacters":["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans", "Scarlett Johansson" , "Benedict Cumberbatch" , "Don Cheadle" , "Tom Holland" , "Chadwick Boseman" , "Paul Bettany" , "Elizabeth Olsen" , "Anthony Mackie" , "Sebastian Stan" , "Danai Gurira" , "Letitia Wright" , "Dave Bautista", "Zoe Saldana", "Josh Brolin", "Chris Pratt", "Vin Diesel", "Bradley Cooper"], "Poster":"AvengersInfinityWarposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Ant-Man and the Wasp" ,"description":"In Ant-Man and the Wasp, the titular pair work with Hank Pym to retrieve Janet van Dyne from the quantum realm.","USreleasedate" : "July 6, 2018", "Director" : "Peyton Reed", "Maincharacters":["Paul Rudd", "Evangeline Lilly", "Michael Peña", "Bobby Cannavale", "Walton Goggins" , "T.I." , "David Dastmalchian" , "Hannah John-Kamen" , "Judy Greer" , "Abby Ryder Fortson", "Randall Park" , "Michael Douglas" , "Laurence Fishburne" , "Michelle Pfeiffer" ], "Poster":"Ant-ManandtheWaspposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							
							{"Movie_Name":"Captain Marvel" ,"description":"Set in 1995, the story follows Danvers as she becomes Captain Marvel after Earth is caught in the center of a galactic conflict between two alien civilizations.","USreleasedate" : "March 8, 2019", "Director" : "Anna Boden and Ryan Fleck", "Maincharacters":["Brie Larson", "Samuel L. Jackson", "Ben Mendelsohn", "Djimon Hounsou", "Lee Pace" , "Lashana Lynch" , "Gemma Chan" , "Annette Bening" , "Clark Gregg" , "Jude Law" ], "Poster":"CaptainMarvelposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Avengers: Endgame" ,"description":"In the film, the surviving members of the Avengers and their allies attempt to reverse the damage caused by Thanos in Infinity War.","USreleasedate" : "April 26, 2019", "Director" : "Anthony and Joe Russo", "Maincharacters":["Robert Downey Jr.", "Chris Hemsworth", "Mark Ruffalo", "Chris Evans", "Scarlett Johansson" , "Jeremy Renner" , "Don Cheadle" , "Tom Holland" , "Paul Rudd" , "Brie Larson" , "Karen Gillan" , "Danai Gurira" , "Benedict Wong" , "Jon Favreau" , "Bradley Cooper" , "Gwyneth Paltrow", "Josh Brolin",], "Poster":"AvengersEndgameposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							
							{"Movie_Name":"Spider-Man: Far From Home" ,"description":"In Spider-Man: Far From Home, Parker is recruited by Nick Fury and Mysterio to face the Elementals while he is on a school trip to Europe.","USreleasedate" : "July 2, 2019", "Director" : "Jon Watts", "Maincharacters":["Samuel L. Jackson", "Tom Holland", "Cobie Smulders", "Jon Favreau", "J. B. Smoove" , "Zendaya" , "Martin Starr" , "Jacob Batalon" , "Jake Gyllenhaal"  , "Marisa Tomei"], "Poster":"Spider-ManFarFromHomeposter.jpg","comment":["Good Movie!", "Good Story."],"Edit":"WebCreator"},
							];
							
							dbo.collection("MovieList").insertMany(myobj, function(err, res) {
							if (err) throw err;
							console.log("Number of documents inserted: " + res.insertedCount);
							db.close();
							 return response.end('{"result":"success"}');
							});
									
								}
								
								});
									});
						});
			});
		}
	}
	
    else if (/^\/[-_a-zA-Z0-9\/]*.js$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/javascript");
    }
    else if (/^\/[-_a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    } else if (/^\/[-_a-zA-Z0-9\/]*.css$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "text/css");
    }
    else if (/^\/[-_a-zA-Z0-9\/]*.jpg$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "image/jpg");
    }
    else if (/^\/[-_a-zA-Z0-9\/]*.png$/.test(request.url.toString())) {
        sendFileContent(response, request.url.toString().substring(1), "image/png");
    }
    else {
        console.log("Requested URL is: " + request.url);
        response.end();
    }
}).listen(9999)




function AddCommentFavEach(result2, g, myquery3, dbo, db_data) {
    var fav_name = result2[g].FavListName;

    dbo.collection(fav_name).find(myquery3).toArray(function (err, result3) {
        if (err) throw err;
        if (result3.length == 1) {
            if (result3[0].comment == null) {
                var data2 = [];
                data2[0] = db_data[1];
                var newvalues2 = { $set: { "comment": data2 } };
                var myquery2 = { "Movie_Name": db_data[0] };
                dbo.collection(fav_name).updateOne(myquery2, newvalues2, function (err, res) {
                    if (err) throw err;
                    Commentset = true;

                });
            }
            else if (result3[0].comment.length == 1) {
                var data2 = [];
                data2[0] = result3[0].comment[0];
                data2[1] = db_data[1];
                var newvalues2 = { $set: { "comment": data2 } };
                var myquery2 = { "Movie_Name": db_data[0] };

                dbo.collection(fav_name).updateOne(myquery2, newvalues2, function (err, res) {
                    if (err) throw err;
                    Commentset = true;

                });
            }
            else if (result3[0].comment.length > 1) {
                var data2 = [];


                for (i = 0; i < result3[0].comment.length; i++) {
                    data2[i] = result3[0].comment[i];

                }

                data2[result3[0].comment.length] = db_data[1];

                var newvalues2 = { $set: { "comment": data2 } };

                var myquery2 = { "Movie_Name": db_data[0] };
                dbo.collection(fav_name).updateOne(myquery2, newvalues2, function (err, res) {
                    if (err) throw err;
                    Commentset = true;


                });
            }

        } else if (result3.length == 0) {
            Commentset = true;
        }





    });
}


function DeleteFavEach(result, i, obj, dbo) {
    var fav_name = result[i].FavListName;
    var myquery = { "Movie_Name": obj.title };
    dbo.collection(fav_name).find(myquery).toArray(function (err, result2) {
        if (result2.length == 1) {
            dbo.collection(fav_name).deleteOne(myquery, function (err, obj) {
                if (err) throw err;
                Deleteset = true;

            });
        } else if (result2.length == 0) {
            Deleteset = true;
        }
    });

}



function UpdateFavEach(dbo, result2, myquery, obj, i, updatePoster) {
    var oldMovieTitle = obj.old_Movie_Name;
    var newMovieTitle = obj.newMovieTitle;
    var newMovieDescription = obj.newMovieDescription;
    var NewMovieDate = obj.NewMovieDate;
    var NewMovieDirector = obj.NewMovieDirector;
    var newMovieActors = obj.newMovieActors;
    var actors_list = newMovieActors.split("/");
    var collectionsName = result2[i].FavListName;


    dbo.collection(collectionsName).find(myquery).toArray(function (err, result3) {
        if (err) throw err;


        if (result3.length == 1) {
         
            var newvalues;
            if (file_name == null || updatePoster == "no")
            {
                 newvalues = { $set: { "Movie_Name": newMovieTitle, "description": newMovieDescription, "USreleasedate": NewMovieDate, "Director": NewMovieDirector, "Maincharacters": actors_list } };
            }

            if (file_name != null) {
                newvalues = { $set: { "Movie_Name": newMovieTitle, "description": newMovieDescription, "USreleasedate": NewMovieDate, "Director": NewMovieDirector, "Maincharacters": actors_list, "Poster": file_name } };
            }
            
            dbo.collection(collectionsName).updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                updatedset = true;


            });
        }
        else if (result3.length == 0) {
            updatedset = true;

        }

    });
}

function spileText(stringText) {
    var db_data = [];
    info = stringText.split("&");

    for (i = 0; i < info.length; i++) {
        var d = info[i].split("=");
        db_data[i] = d[1];
    }
    return db_data;
}


function sendFileContent(response, fileName, contentType) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            response.writeHead(404);
            response.write("Not Found!");

        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.write(data);
        }
        response.end();
    });
}