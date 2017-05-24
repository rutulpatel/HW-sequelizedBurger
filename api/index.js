// Dependencies
var db = require("../models");

module.exports = function(app) {

    // Get all burgers data
    app.get("/api/all", function(req, res) {
        if (Object.keys(req.query).length !== 0) {
            console.log(req.query);
            var whr = {};
            for (var k in req.query) {
                if (req.query.hasOwnProperty(k)) {
                    whr[k] = req.query[k];
                }
            }
            console.log(whr);
        }
        db.Burger.findAll({
            where: whr
        }).then(function(result) {
            // console.log(result);
            res.json(result);
        });
    });

    // Add a burger
    app.post("/api/new", function(req, res) {
        console.log("Adding new burger:");
        console.log(req.body.burgerName);
        db.Burger.create({ "name": req.body.burgerName })
            .then(function(data) {
                if (data != -1) {
                    res.json(data);
                } else {
                    console.log("FATAL ERROR in orm.js > insertOne() function.");
                }
            });
    });


    app.put("/api/devoured/:id", function(req, res) {
        console.log("HERE-app.delete");
        var reqData = req.body.data;
        console.log(reqData);

        if (req.body.data.customer_name !== "") {
            db.Burger.update({ "devoured": 1, "customer_name": req.body.data.customer_name }, { where: { id: req.params.id } })
                .then(function(data) {
                    console.log(data);
                    res.json(data);
                });
        }
    });
}