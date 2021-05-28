const express = require("express");
const app = express();
const port = 3000;
app.use("/",express.static(__dirname+"/public"));
console.log(`listen in port ${port}`);
app.listen(port);
