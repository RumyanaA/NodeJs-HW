"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _csvtojson = _interopRequireDefault(require("csvtojson"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var csvFilePath = "./csv/nodejs-hw1-ex1.csv";

var writerStream = _fs["default"].createWriteStream("./nodejs19-hw1-ex2.txt");

function readFromFile() {
  return _readFromFile.apply(this, arguments);
}

function _readFromFile() {
  _readFromFile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee() {
    var jsonArray;
    return _regeneratorRuntime["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _csvtojson["default"])({
              noheader: false,
              headers: ["book", "author", "amount", "price"]
            }).fromFile(csvFilePath);

          case 2:
            jsonArray = _context.sent;
            write(jsonArray);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _readFromFile.apply(this, arguments);
}

function write(data) {
  data.forEach(function (chunk, index) {
    try {
      if (index === data.length - 1) {
        writerStream.write(JSON.stringify(chunk), "UTF8");
        writerStream.end();
        return;
      }

      writerStream.write(JSON.stringify(chunk), "UTF8");
      writerStream.write("\n", "UTF8");
    } catch (e) {
      console.error(e.message);
    }
  });
}

readFromFile();