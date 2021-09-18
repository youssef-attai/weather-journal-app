const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(express.static("website"));

const port = 1234

const projectdata = {};

app.get("/result", (req, res)=>{
    console.log(projectdata);
    res.send(projectdata);
});

app.post("/weather", (req, res)=>{
    console.log(req.body);
    projectdata = req.body;
});

app.listen(port, ()=>{
    console.log(`Listening - localhost:${port}`);
});