var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"./static")));

app.set('views',path.join(__dirname,'./views'));
app.set('view engine','ejs');
app.get('/', function(req,res){
	res.render("index");
})

var results_array = [];
var id_count = 0;
app.post('/plants', function(req,res){
	console.log("POST DATA",req.body);
	var name = req.body.name;
	var location = req.body.location;
	var description = req.body.description;
	var info = req.body.info;
	results_array.push({'id': id_count,
						'name':name,
						'location':location,
						'description':description,
						'info':info});
	id_count+=1;
	res.redirect('/');
})

app.get('/results',function(req,res){
	res.render("results",{results: results_array});
})

app.get('/destroy/:id',function(req,res){
	var id = req.params.id;
	var index = 0;
	for(var i = 0; i < results_array.length; i++){
		if(results_array[i].id == id){
			index = i;
			break;
		}
	}
	results_array.splice(index,1);
	res.redirect('/results');
})

app.get('/destroy_all',function(req,res){
	results_array = [];
	id_count = 0;
	res.redirect('/results');
})

app.listen(8000,function(){
	console.log("listen on port 8000");
})