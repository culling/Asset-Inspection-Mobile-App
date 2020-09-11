"use strict";

const express = require("express");
const { response } = require("express");
const cors = require("cors");
// Constants
const PORT = process.env.PORT;
const config = {
  port: process.env.PORT || 80,
};

// App
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false }));

app.use(cors());



const router = express.Router();
//Define Routes
router.get("/", (req, res) => {
  res.status(200);
  res.contentType("html");
  res.write("Hello World");
  res.write(`<a href="/db/drop"><button class='btn'>Recreate table</button></a>`);

  res.end();
});

class Asset {
  constructor(
    latitude = null,
    longitude = null,
    inspection_time = null,
    assetType = "undefined",
    assetIdText = "undefined",
    assetIdPhoto = "undefined",
    assetIdPhotoUrl = "undefined",
    serialNumberText = "undefined",
    serialNumberPhoto = "undefined",
    serialNumberPhotoUrl = "undefined",
    company = "undefined"
  ) {
    this.latitude = latitude;
    this.longitude = longitude;
    this.inspection_time = inspection_time;
    this.assetType = assetType;
    this.assetIdText = assetIdText;
    this.assetIdPhoto = assetIdPhoto;
    this.assetIdPhotoUrl = assetIdPhotoUrl;
    this.serialNumberText = serialNumberText;
    this.serialNumberPhoto = serialNumberPhoto;
    this.serialNumberPhotoUrl = serialNumberPhotoUrl;
    this.company = company;
  }

  static createAssetFromJson(json) {
    let newAsset = new Asset;
    for (let key in newAsset) {
      newAsset[key] = json[key];
    };
    return newAsset;
  }
}


// SQL Queries
let sqlQueries = {
  createAssetsTable: `
  CREATE TABLE IF NOT EXISTS assets (
    asset_inspection_id serial PRIMARY KEY,
    latitude VARCHAR (255),
    longitude VARCHAR (255),
    inspection_time VARCHAR(255),
    asset_type VARCHAR (255),
    asset_id_text VARCHAR (255),
    serial_number_text VARCHAR (255),
    asset_id_photo TEXT,
    asset_id_photo_url TEXT,
    serial_number_photo TEXT,
    serial_number_photo_url TEXT
    );
`,
  dropTable: `
  DROP TABLE assets;
`,
};


//Database generally set
router.get("/db", (req, response) => {
  // client.connect();
  response.write("Test!\n");
  response.write("Connected\n");
  response.write(
    "process.env.DATABASE_URL: " + process.env.DATABASE_URL + "\n"
  );
  //https://stackoverflow.com/questions/19085609/trying-to-connect-my-node-js-to-heroku-postgresql-database-following-heroku-pos
  const { Client } = require("pg");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();
  let text = "";

  let queryText = sqlQueries.createAssetsTable;
  client.query(queryText, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      response.write(JSON.stringify(row) + "\n");
    }

    response.write("\n\n\n");


    queryText = "SELECT * FROM assets;";
    client.query(queryText, (err, res) => {
      if (err) throw err;
      for (let row of res.rows) {
        response.write(JSON.stringify(row) + "\n");
      }
      client.end();


      response.write("\n\n\n");

      response.write("Time: " + Date.now().toString() + "\n");
      response.write("\n" + "query completed" + "\n");
      response.end();
    });
  });
});



//Drop
router.get("/db/drop", (req, response) => {
  // client.connect();
  response.write("Test!\n");
  response.write("Connected\n");
  response.write(
    "process.env.DATABASE_URL: " + process.env.DATABASE_URL + "\n"
  );
  //https://stackoverflow.com/questions/19085609/trying-to-connect-my-node-js-to-heroku-postgresql-database-following-heroku-pos
  const { Client } = require("pg");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();
  let text = "";

  let queryText = sqlQueries.dropTable;
  queryText = queryText.concat(sqlQueries.createAssetsTable);
  client.query(queryText, (err, res) => {
    if (err) throw err;
    client.end();

    response.write("dropped table assets");
    response.write("created table asset");

    response.end();
  });

  // response.end();
});




//Get Assets
router.get("/assets", (req, response) => {
  //https://stackoverflow.com/questions/19085609/trying-to-connect-my-node-js-to-heroku-postgresql-database-following-heroku-pos
  const { Client } = require("pg");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();
  let text = "";
  let queryText = "SELECT * FROM assets;";

  response.write("[");//Array start
  client.query(queryText, (err, res) => {
    if (err) throw err;
    let i = 0;
    for (let row of res.rows) {
      response.write(JSON.stringify(row) + "\n");
      if ((res.rows.length > 1) && (i < res.rows.length - 1)) {
        response.write(",");
      }
      i++;
    }
    client.end();

    response.write("]");//Array end
    response.end();
  });
});




//Post
router.post("/assets", (req, response) => {
  const { Client } = require("pg");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();
  
  const asset = Asset.createAssetFromJson(req.body);
  
  let queryText = `
  INSERT INTO assets (
    latitude
    ,longitude
    ,inspection_time
    ,asset_type
    ,asset_id_text
    ,serial_number_text
    ,asset_id_photo_url
    ,asset_id_photo
    ,serial_number_photo_url
    ,serial_number_photo
  ) VALUES (
    '${asset.latitude}'
    ,'${asset.longitude}'
    ,'${asset.inspection_time}'
    ,'${asset.assetType}'
    ,'${asset.assetIdText}'
    ,'${asset.serialNumberText}'
    ,'${asset.assetIdPhotoUrl}'
    ,'${asset.assetIdPhoto}'
    ,'${asset.serialNumberPhotoUrl}'
    ,'${asset.serialNumberPhoto}'
  ) RETURNING *;`;
  client.query(queryText, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      response.write(JSON.stringify(row) + "\n");
    }

    client.end();

    // response.write("\n\n\n");
    if (req.body !== undefined) {
      response.write("req: " + JSON.stringify(req.body) + "\n\n\n");
    }

    response.end();
  });
});

//Setup
router.get("/assets/setup", (req, response) => {
  response.write("Test!\n");
  response.write("Connected\n");
  response.write(
    "process.env.DATABASE_URL: " + process.env.DATABASE_URL + "\n"
  );
  response.write("Setup?" + process.env.DATABASE_URL + "\n");
  response.write(req.body);

  const { Client } = require("pg");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();
  let text = "";

  let queryText = sqlQueries.createAssetsTable;
  client.query(queryText, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      response.write(JSON.stringify(row) + "\n");
    }
    // response.write(JSON.stringify(res) +" \n");
    client.end();

    response.write("Time: " + Date.now().toString() + "\n");
    response.write("\n" + "query completed" + "\n");
    response.end();
  });
});

//Start Server
process.env.NODE_ENV = process.env.NODE_ENV || "development";

app.use(router);

app.use(express.json()) // for parsing application/json

app.listen(config.port, function () {
  console.log(process.env.NODE_ENV);
  console.log("Listening on Port: " + config.port);
});