import fs from "fs";
import os from "os";

function getStream (filename) {
  return fs.createReadStream(filename, {
    flags: "r",
    encoding: "utf-8",
    fd: null,
    mode: 438,
    bufferSize: 64 * 1024
  });
}

function getLines (filename, lineCount, callback) {
  let stream = getStream(filename),
    data = "",
    lines = [];

  stream.on("data", function (moreData) {
    data += moreData;
    lines = data.split("\n");
  });

  stream.on("error", function (err) {
    callback(err);
  });

  stream.on("end", function () {
    let arrays = [];

    while (lines.length > 0)
      arrays.push(lines.splice(0, lineCount));

    callback(false, arrays);
  });

}

function checkStore() {
  let check = new Map();
  check.set(" :_: :|: :|:|:_:|", 0);
  check.set(" : : : : :|: : :|", 1);
  check.set(" :_: : :_:|:|:_: ", 2);
  check.set(" :_: : :_:|: :_:|", 3);
  check.set(" : : :|:_:|: : :|", 4);
  check.set(" :_: :|:_: : :_:|", 5);
  check.set(" :_: :|:_: :|:_:|", 6);
  check.set(" :_: : : :|: : :|", 7);
  check.set(" :_: :|:_:|:|:_:|", 8);
  check.set(" :_: :|:_:|: :_:|", 9);
  return check;
}

function operate(linesArr) {
  let finalStr = "", check = checkStore();

  return new Promise(resolve => {
    linesArr.map(val => {
      let rows = [];
      val.forEach((innerVal, innerkey) => {
        rows[innerkey] = innerVal.split("");
      });
      while(rows[0].length){
        let str = rows[0][0] + ":" + rows[0][1] + ":" + rows[0][2] + ":" + rows[1][0] + ":" + rows[1][1] + ":" + rows[1][2]
          + ":" + rows[2][0] + ":" + rows[2][1] + ":" + rows[2][2];
        rows[0].splice(0, 3);
        rows[1].splice(0, 3);
        rows[2].splice(0, 3);

        finalStr += check.get(str) === undefined ? "?" : check.get(str);
        finalStr += ",";
      }
      finalStr += os.EOL;
    });
    resolve(finalStr);
  });
}

function writeStream(res, outfile){

  return new Promise(resolve => {
    let stream = fs.createWriteStream(outfile);
    stream.once('open', function(fd) {
      stream.write(res);
      stream.end(function () { resolve("DONE"); });
    });
  });
}

//export all the functions
module.exports = {getLines, operate, writeStream};