const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
   
/*------------------------------------------
--------------------------------------------
parse application/json
--------------------------------------------
--------------------------------------------*/
app.use(bodyParser.json());
   
/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'michael', /* MySQL User */
  password: 'michael', /* MySQL Password */
  database: 'todo', /* MySQL Database */
  
});
   


/*------------------------------------------
--------------------------------------------
Shows Mysql Connect
--------------------------------------------
--------------------------------------------*/
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected with App...');
});
   
/**
 * Get All Todos
 *
 * @return response()
 */
app.get('/api/todo',(req, res) => {
  let sqlQuery = "SELECT * FROM todo_list";
  
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.json(apiResponse(results));
  });
});
   
/**
 * Get Single todo
 *
 * @return response()
 */
app.get('/api/todo/:id',(req, res) => {
  let sqlQuery = "SELECT * FROM todo_list WHERE id=" + req.params.id;
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
    res.json(apiResponse(results));
  });
});
   

/**
 * Create New todo
 *
 * @return response()
 */
app.post('/api/todo',(req, res) => {
  console.log(req.body)
  let data = {todo: req.body.todo, isDone: req.body.isDone,dueDate: req.body.dueDate, dueTime: req.body.dueTime};
  
  let sqlQuery = "INSERT INTO todo_list SET ?";
  
  let query = conn.query(sqlQuery, data,(err, results) => {
    if(err) throw err;
    console.log(results)
    res.json(apiResponse(results));
  });
});
   
/**
 * Update Item
 *
 * @return response()
 */
app.put('/api/todo/:id',(req, res) => {
  let isDone = req.body.isDone ? 1:0;
  let sqlQuery = "UPDATE todo_list SET todo='"+req.body.todo+"', isDone='"+isDone+"', dueDate='"+req.body.dueDate+"', dueTime='"+req.body.dueTime+"' WHERE id="+req.params.id;
  
  let query = conn.query(sqlQuery, (err, results) => {
    console.log(err)
    if(err) throw err;
    res.json(apiResponse(results));
  });
});
   
/**
 * Delete Item
 *
 * @return response()
 */
app.delete('/api/todo/:id',(req, res) => {
  let sqlQuery = "DELETE FROM todo_list WHERE id="+req.params.id+"";
    
  let query = conn.query(sqlQuery, (err, results) => {
    if(err) throw err;
      res.json(apiResponse(results));
  });
});
  
/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results){
    return {"status": 200, "error": null, "response": results};
}
   
/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
app.listen(3001,() =>{
  console.log('Server started on port 3001...');
});