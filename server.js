const express = require("express");

const app = express();

const cors = require("cors");
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use(express.static("website"));

const port = 8000

let projectdata = {};

app.get('/result', (req, res)=>{
    res.status(200).send(projectdata)
})

app.post("/weather", (req, res)=>{
    projectdata = req.body;
});

app.listen(port, ()=>{
    console.log(`Listening - localhost:${port}`);
});