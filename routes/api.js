const express = require("express")
const router = express.Router()
const request = require('request')

router.get('/', function (req, res, next) {

    // Query database to get all the books
    let sqlquery =   `SELECT Fireworks.*, Manufacturers.name AS manufacturer_name
    FROM Fireworks
    JOIN Manufacturers ON Fireworks.manufacturer_id = Manufacturers.manufacturer_id
    ORDER BY Fireworks.name`; 

    // Execute the sql query
    db.query(sqlquery, (err, result) => {
        // Return results as a JSON object
        if (err) {
            res.json(err)
            next(err)
        }
        else {
            res.render("list.ejs", {availableFireworks: result});
        }
    })
})

module.exports = router;
