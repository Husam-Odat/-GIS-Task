// npm i body - parser express sqlite3
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const cors = require("cors"); // Import the cors package

// establish connection with database
const sqlite = require("sqlite3").verbose();
// ==insert data==
let sql;
// ==insert data==

// ==get request==
const url = require("url");
// ==get request==
const db = new sqlite.Database("./maps.db", sqlite.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
});

app.use(cors()); // Add this line to enable CORS

app.use(bodyParser.json());

//post request
app.post("/maps", (req, res) => {
    try {
        // console.log(req.body.movie);

        // ==insert data==
        const { Name, Notes, LAT, LNG } = req.body;
        sql = "INSERT INTO locations (Name, Notes, LAT, LNG) VALUES (?,?,?,?)"
        db.run(sql, [Name, Notes, LAT, LNG], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err });
            console.log("successful input", Name, Notes, LAT, LNG);
        });
        // ==insert data==
        return res.json({
            status: 200,
            success: true,
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})
//==========================================================
//delete request
app.delete("/maps/:id", (req, res) => {
    try {
        const id = req.params.id; // Get the id from the URL parameter
        // console.log(req.body.movie);

        // ==insert data==
        // const { id } = req.body;
        sql = "Delete From locations WHERE id=?"
        db.run(sql, [id], (err) => {
            if (err) return res.json({ status: 300, success: false, error: err });
            console.log("successful input", id);
        });
        // ==insert data==
        return res.json({
            status: 200,
            success: true,
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})
//==========================================================
//========update==================================================
app.patch("/maps/:id", (req, res) => {
    try {
        const id = req.params.id; // Get the id from the URL parameter
        const { Name, Notes, LAT, LNG } = req.body;

        sql = "UPDATE locations SET Name = ?, Notes = ?, LAT = ?, LNG = ? WHERE id = ?";

        db.run(sql, [Name, Notes, LAT, LNG, id], (err) => {
            if (err) {
                return res.json({ status: 300, success: false, error: err });
            } else {
                console.log("Successful update for id", id);
                return res.json({
                    status: 200,
                    success: true,
                });
            }
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
});
// ==get request==
app.get("/maps", (req, res) => {
    sql = "SELECT * FROM locations";
    try {
        //===========get spacific data===
        const queryObject = url.parse(req.url, true).query;
        if (queryObject.field && queryObject.type)
            sql += ` WHERE ${queryObject.field} LIKE '%${queryObject.type}%'`;
        //===========get spacific data===

        db.all(sql, [], (err, rows) => {
            if (err) return res.json({ status: 300, success: false, error: err });

            if (rows.lenght < 1) return res.json({ status: 300, success: false, error: "no match" });

            // return res.json({ status: 200, data: rows, success: true });
            return res.json(rows);
        });
    } catch (error) {
        return res.json({
            status: 400,
            success: false,
        });
    }
})

// ==get request==
app.listen(3001);



//drop table
//db.run("DROP TABLE locations");

// //update data
// sql = `UPDATE locations SET Name = ? WHERE id=?`;
// db.run(sql, ["Jake", 1], (err) => {
// if (err) return console.error(err.message);
// });


// //Delete data
// sql = `Delete From locations WHERE id=?`;
// db.run(sql, [1], (err) => {
// if (err) return console.error(err.message);
// });


// //insert data
// sql = "INSERT INTO locations(Name, Notes, LAT, LNG) VALUES (?,?,?,?)";
// db.run(sql, [Name, Notes, LAT, LNG], (err) => {
//     if (err) return res.json({ status: 300, success: false, error: err });
//     console.log("successful input", Name, Notes, LAT, LNG);
// });


// //query the data
// sql = `SELECT * FROM users`;
// db.all(sql, [], (err, rows) => {
//     if (err) return console.error(err.message);
//     rows.forEach((row) => {
//         console.log(row);
//     });
//     });

// app.listen(3000);

