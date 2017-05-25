// Dependencies
var express = require('express');
var bodyparser = require('body-parser');
var exphbs = require('express-handlebars');
var path = require('path');


// Set up express app instance
var app = express();
var db = require("./models");

var PORT = process.env.PORT || 8080;

// Set up express app to handle data parsing
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.text());
app.use(bodyparser.json({ type: "application/vnd.api+json" }));

// Set up static routes
app.use(express.static(path.join(__dirname, "/public")));

app.set('views', path.join(__dirname, '/views'));

// set handlebars
var hbs = exphbs.create({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main'
});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Routes
require("./api")(app);
require("./controller")(app);

// Start the server
// if (process.env.NODE_ENV !== "production") {
db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log("app listening on PORT " + PORT);
    });
});
// }