const server = require("express");
const path = require("path");

const app = server();

// to used static file like image, html, css and javaScript
let staticPath = path.join(__dirname, './views');
app.use(server.static(staticPath));

// to used view template engine 
// it will search default folder views and auto search the root file which is define below index
app.set("view engine", "hbs");

app.get("/", (req, res) => {
    // when dealing with template engine we have to used render insteead of send to render on html page
    res.render("index", {
        // it will dynamically add the content on html page
        userName : "Nabin Poudel"
    });
});

app.listen(1000, () => {
    console.log("server is listening..");
    
})