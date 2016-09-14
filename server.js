var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
   res.send('Todo API Root');
});

//GET /todos
app.get('/todos',function (req,res){
   res.json(todos);
});
//GET /todo/:id
app.get('/todos/:id', function(req,res){
   var todoId = parseInt(req.params.id, 10);
   var matched;

   // itterate over todos array looking for match
   todos.forEach(function (todo){
      if (todoId === todo.id){
         matched = todo;
      }
   });

   if (matched){
      res.json(matched);
   } else {
      res.status('404').send();
   }

});

// POST /todos
app.post('/todos', function (req, res){
var body = req.body;

    // add ID field
    body.id = todoNextId++;
    todos.push(body);
    // push body into array

    res.json(body);
});

app.listen(PORT, function (){
   console.log('Express listening on Port: ' + PORT + '!');
});