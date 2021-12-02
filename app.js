const port = 3000;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const fileUpload = require("express-fileupload");
app.use(cors());
const Routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));
//app.use(express.static(path.join(__dirname, "build")));
//app.use(express.static(path.join(__dirname, "admin_app")));

app.use(
  fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    safeFileNames: true,
  })
);

app.use('/', Routes);

app.listen(3000, (err)=>{
  if(err) console.log(err);
  console.log('server is runinng on port 3000')
})

