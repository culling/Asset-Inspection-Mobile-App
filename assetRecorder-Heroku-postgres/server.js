
'use strict';

const express = require('express');
const { response } = require('express');

// Constants
const PORT = process.env.PORT;
const config = {
  port: process.env.PORT || 80
};


// App
const app = express();


//Define Routes
app.get('/', (req, res) => {
  res.status(200);
  res.contentType("html");
  res.write('Hello World');
  res.send();
});



app.get('/db', (req, response) => {
  // client.connect();
  response.write("Test!\n");
  response.write("Connected\n");
  response.write("process.env.DATABASE_URL: " + process.env.DATABASE_URL + "\n");
  //https://stackoverflow.com/questions/19085609/trying-to-connect-my-node-js-to-heroku-postgresql-database-following-heroku-pos
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect();
  let text = "";
  // let queryText = "SELECT table_schema,table_name FROM information_schema.tables;";
  let queryText = 'SELECT * FROM test_table;';
  client.query(queryText , (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      response.write(JSON.stringify(row)  + "\n");
    }
    client.end();

    response.write("Time: " + Date.now().toString() + "\n");
    response.write( "\n" + "query completed"+ "\n");
    response.end();
  });
});

app.get('/dbSetup', (req, response) => {
  // client.connect();
  response.write("Test!\n");
  response.write("Connected\n");
  response.write("process.env.DATABASE_URL: " + process.env.DATABASE_URL + "\n");
  //https://stackoverflow.com/questions/19085609/trying-to-connect-my-node-js-to-heroku-postgresql-database-following-heroku-pos
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  client.connect();
  let text = "";
  let queryText = `INSERT INTO test_table VALUES (${3}, '${Date().toString()}') RETURNING *;`;
  client.query(queryText , (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      response.write(JSON.stringify(row) +  "\n");
    }
    // response.write(JSON.stringify(res) +" \n");
    client.end();

    response.write("Time: " + Date.now().toString() + "\n");
    response.write( "\n" + "query completed"+ "\n");
    response.end();
  });

});


//Start Server
process.env.NODE_ENV = process.env.NODE_ENV || "development";
app.listen(config.port, function () {
  console.log(process.env.NODE_ENV);
  console.log("Listening on Port: " + config.port);
});