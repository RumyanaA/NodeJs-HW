"use strict";

process.stdin.on('data', function (data) {
  var outputData = data.toString().split("").reverse().join("");
  console.log(outputData);
});