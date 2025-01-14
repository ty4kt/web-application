const express = require("express")
const router = express.Router()
const { check, validationResult } = require('express-validator');

router.get('/search',function(req, res, next){
    res.render("search.ejs")
})

router.get('/search_result', [
    check('search_text').notEmpty()
], function (req, res, next) {
    // Check for validation errors
    const search_result = req.sanitize(req.query.search_text);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.redirect('./search');
    }

    // Modified query to search both fireworks and manufacturers
    let sqlquery = `
        SELECT DISTINCT f.*, m.name AS manufacturer_name
        FROM Fireworks f
        JOIN Manufacturers m ON f.manufacturer_id = m.manufacturer_id
        WHERE f.name LIKE ? 
        OR m.name LIKE ?
        ORDER BY f.name`;
    
    db.query(sqlquery, [`%${search_result}%`, `%${search_result}%`], (err, result) => {
        if (err) {
            return next(err);
        }
        res.render("list.ejs", { availableFireworks: result });
    });
})


router.get('/list', function(req, res, next) {
    let sqlquery = `
        SELECT Fireworks.*, Manufacturers.name AS manufacturer_name
        FROM Fireworks
        JOIN Manufacturers ON Fireworks.manufacturer_id = Manufacturers.manufacturer_id
        ORDER BY Fireworks.name`; // query database to get all fireworks with manufacturer info
    
    db.query(sqlquery, (err, result) => {
        if (err) {
            next(err);
        }
        res.render("list.ejs", {availableFireworks: result});
    });
});

router.get('/addfireworks', function (req, res, next) {
    res.render('addfireworks.ejs')
})


router.post('/fireworkadded', [
    // Validate all required fields
    check('name').notEmpty(),
    check('type').notEmpty(),
    check('color').notEmpty(),
    check('effect').notEmpty(),
    check('price').notEmpty().isNumeric(),
    check('manufacturer_id').notEmpty().isNumeric()
], function (req, res, next) {
    // Sanitize all inputs
    const name = req.sanitize(req.body.name);
    const type = req.sanitize(req.body.type);
    const color = req.sanitize(req.body.color);
    const effect = req.sanitize(req.body.effect);
    const price = req.sanitize(req.body.price);
    const manufacturer_id = req.sanitize(req.body.manufacturer_id);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('./addfirework')
    } else {
        // Insert into Fireworks table
        let sqlquery = "INSERT INTO Fireworks (name, type, color, effect, price, manufacturer_id) VALUES (?, ?, ?, ?, ?, ?)";
        let newrecord = [name, type, color, effect, price, manufacturer_id];
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(`New firework added: ${name} (${type}) - £${price}`);
        });
    }
});

router.get('/bargainfireworks', function(req, res) {
    // Query to get all fireworks under £10, including manufacturer info
    let sqlquery = `
        SELECT Fireworks.name, 
               Fireworks.type, 
               Fireworks.color, 
               Fireworks.effect, 
               Fireworks.price, 
               Manufacturers.name AS manufacturer_name
        FROM Fireworks
        JOIN Manufacturers ON Fireworks.manufacturer_id = Manufacturers.manufacturer_id
        WHERE Fireworks.price < 10
        ORDER BY Fireworks.price ASC`;

    db.query(sqlquery, (err, result) => {
        if (err) {
            res.redirect('./');
        }
        res.render('list.ejs', {availableFireworks: result});
    });
});

router.get('/addmanufacturer', function(req, res, next) {
    res.render('addmanufacturer');
});

router.post('/manufactureradded', [
    // Validate required fields
    check('name').notEmpty().trim(),
    check('location').optional().trim(),
    check('contact').optional().trim()
], function(req, res, next) {
    // Sanitize inputs
    const name = req.sanitize(req.body.name);
    const location = req.sanitize(req.body.location);
    const contact = req.sanitize(req.body.contact);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.redirect('./addmanufacturer');
    } else {
        let sqlquery = "INSERT INTO Manufacturers (name, location, contact) VALUES (?, ?, ?)";
        let newrecord = [name, location, contact];
        
        db.query(sqlquery, newrecord, (err, result) => {
            if (err) {
                return next(err);
            }
            res.send(`New manufacturer added: ${name}`);
        });
    }
});

router.get('/listmanufacturers', function(req, res, next) {
    let sqlquery = "SELECT * FROM Manufacturers";
    
    db.query(sqlquery, (err, result) => {
        if (err) {
            return next(err);
        }
        res.render('listmanufacturers', { manufacturers: result });
    });
});

// Export the router object so index.js can access it
module.exports = router