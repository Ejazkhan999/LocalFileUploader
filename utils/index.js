
const fs = require("fs");


const { resolve } = require("path");
const formidable = require('formidable')

const methods = {
//upload image file 
  uploadImage: (file, path , FileFormat) => {
    return new Promise((resolve) => {
      try {
        let sampleFile = file;
        let x = new Date();
        let filename =
          file.name +
          "" +
          x.getDate() +
          "" +
          x.getMonth() +
          "" +
          x.getFullYear() +
          "" +
          x.getHours() +
          "" +
          x.getMinutes() +
          "" +
          x.getSeconds() +
          "."+
          FileFormat;
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(path + filename, (err) => {
          if (err) {
            throw err;
          }
          resolve(filename);
        });
      } catch (err) {
        throw err;
      }
    });
  },

};

module.exports = methods;
