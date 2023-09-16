/////////////////////////////////////////////////////////////////

const express = require ("express");
const mysql = require ("mysql2");
const cors = require ("cors");

const app = express();
app.use(express.json());
app.use (cors());


let connection = mysql.createConnection({
    host: "bc6i40w2yd71szw7sxmc-mysql.services.clever-cloud.com",
    user: "un4gmu6glahekmyu",
    password: "jgrCLiMQCT7Oy48qwCAI",
    database: "bc6i40w2yd71szw7sxmc",
  });

  /////////////////////////////////////////////////////////////////
  app.get("/", function (req, res) {    
    connection.query("select * from Data1", function (err, result, fields) {
      //   console.log(err);
        console.log(result);
      //   console.log(fields);
      res.send(result);
    });
  });
//////////////////////////////////////////////////////////////////
  app.get("/:id", (req, res) => {
    const elem = req.params;
    // sql id get method
    connection.query("select * from Data1", function (err, result, fields) {
      console.log(result);
      for (let i = 0; i < result.length; i++) {
        if (elem.id == result[i].ID) {
          res.send(result[i]);
        }
      }
    });
  });
  ////////////////////////////////////////////////////////////////
  app.delete("/:id", (req, res) => {
    const elem = req.params.id;
    
    connection.query(
      `DELETE FROM Data1 WHERE ID=${elem}`,
      function (err, result, fields) {
        console.log(result);
      }
    );
    // axios.delete("http://localhost:3000/" )
  });
  ///////////////////////////////////////////////////////////////
  // post method
app.post("/", (req, res) => {
    let obj = req.body;

    connection.query(
      `INSERT INTO users (ID, Firstname, Lastname,)
      VALUES ("${obj.ID}", "${obj.Firstname}", "${obj.Lastname}",)`,
      function (err, result, fields) {
        //   console.log(result);
        //   app.get("/users", function (req, res) {
        //     res.send(result);
        //   });
      }
    );
    connection.query("select * from Data1", function (err, result, fields) {
      //   console.log(err);
      console.log(result);
      res.send(result);
    });
    // axios.post("http://localhost:3000/")
  });

  app.listen(process.env.PORT || 3000)