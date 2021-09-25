const express = require("express");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("website"));

const port = 8000

let projectdata = {};

app.post("/weather", (req, res)=>{
    projectdata = req.body;
});

app.get('/result', (req, res)=>{
    res.send(projectdata)
})

app.listen(port, ()=>{
    console.log(`Listening - localhost:${port}`);
});