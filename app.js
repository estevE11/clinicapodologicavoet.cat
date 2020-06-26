const path = require("path");
const url = require("url");
var fs = require('fs');

const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

app.engine('pug', require('pug').__express)
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, function() {
    console.log("Listening to " + PORT);
});

app.get("/laclinica", function(req, res) {
    let p = path.join(req.url, "index");

    const files = fs.readdirSync(__dirname + '/public/img/laclinica');

    let args = {
        url_args: url.parse(req.url, true),
        files: files,
        caca: "cacota"
    }
    res.render(p.substring(1, p.length), args);
});

app.get("*", function(req, res) {
    let p = path.join(req.url, "index");
    res.render(p.substring(1, p.length), url.parse(req.url, true));
});
