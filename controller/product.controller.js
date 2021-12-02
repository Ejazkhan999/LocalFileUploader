const { Op, where } = require("sequelize");
const utils = require('../utils');
const fs = require('fs');
const path = require('path');
const {readFile} = require("fs");
let methods = {

 // get Images and product
  getAllDocuments: async (req, res) => {
    console.log('Get all products  api is called');
    try {
      
      let userdata ;
      var configFile = fs.readFileSync('./public/files/ErrorLog.json');
      console.log('config file --------------->' , configFile)
      var config = JSON.parse(configFile);
      console.log('config_____________>' , config);
    
      return res.status(200).json({ success: true, config  });
    }
  
    catch (error) {
      console.log(error);
      res
        .status(501)
        .json({ success: false, msg: "Error! Cannot fetch files", error });
    }
  },

  //Method @POST Add Product by admin or sale manager or inventory manager
  
    addDocument: async (req, res) => {
      console.log("Add Product Called");
      try {
        console.log('request ----> ' , req.files)
        /////////
        
       
        function appendObject(obj){
          var configFile = fs.readFileSync('./public/files/ErrorLog.json');
          console.log('config file --------------->' , configFile)
          var config = JSON.parse(configFile);
          console.log('config_____________>' , config)
          config.push(obj);
          var configJSON = JSON.stringify(config);
          console.log('condig json -===========> ' , config.json)
          fs.writeFileSync('./public/files/ErrorLog.json', configJSON);
        }
        
        
     ///////////////////
        let files = req.files;
        console.log('files --- > ' , files)
        let currentdate = new Date(Date.now());
        let file = files.file;
        let FileFormat= req.body.FileFormat;
        if (!file) throw "Error! No file found !";
        if(!FileFormat) throw 'Error ! no format found! '
        console.log('file ----> ' , file )
      
        let messagefile = './public/files/ErrorLog.txt'
        let filename = file.name;
        let result = await utils.uploadImage(file, "./public/uploadedFiles/" , FileFormat);
          let imageData = {
            imageurl: "/uploadedFiles/" + result,
          };
          
          
            DataOfUserMessage = `${filename} was uploaded to server at ${currentdate}`
          // console.log('da')
          appendObject({message : DataOfUserMessage});
          // console.log('ca')
        
         let succsessData = ` { message:"${filename} has been uploaded to server at ${currentdate}"},`;
         if(succsessData){
          fs.appendFile(messagefile , succsessData, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
         }

        
        return res
          .status(200)
          .json({ success: true, msg: "file uploaded  successfully" });
      } catch (error) {
        console.log(error);
        return res
          .status(501)
          .json({ success: false, msg: "Cannot upload file !", error });
      }
    }
  }
  //Method @PUT Update Product
    

module.exports = methods