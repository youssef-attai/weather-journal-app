const express = require("express");

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const cors = require("cors");
app.use(cors());

app.use(express.static("website"));

const port = 1234

app.listen(port, ()=>{
    console.log(`Listening - localhost:${port}`);
});