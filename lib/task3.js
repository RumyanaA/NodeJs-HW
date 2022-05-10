"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _csvtojson = _interopRequireDefault(require("csvtojson"));

var _regeneratorRuntime = _interopRequireDefault(require("regenerator-runtime"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fsPromises = _fs["default"].promises;
var csvFilePath = './csv/nodejs-hw1-ex1.csv';

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
              headers: ['book', 'author', 'amount', 'price']
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

function write(_x) {
  return _write.apply(this, arguments);
}

function _write() {
  _write = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime["default"].mark(function _callee2(data) {
    var i;
    return _regeneratorRuntime["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            i = 0;

          case 2:
            if (!(i < data.length)) {
              _context2.next = 16;
              break;
            }

            if (!(i === 0)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return fsPromises.writeFile('./nodejs19-hw1-ex2.txt', JSON.stringify(data[i]));

          case 6:
            _context2.next = 8;
            return fsPromises.appendFile('./nodejs19-hw1-ex2.txt', '\n');

          case 8:
            return _context2.abrupt("continue", 13);

          case 9:
            _context2.next = 11;
            return fsPromises.appendFile('./nodejs19-hw1-ex2.txt', JSON.stringify(data[i]));

          case 11:
            _context2.next = 13;
            return fsPromises.appendFile('./nodejs19-hw1-ex2.txt', '\n');

          case 13:
            i++;
            _context2.next = 2;
            break;

          case 16:
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](0);
            console.error(_context2.t0.message);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 18]]);
  }));
  return _write.apply(this, arguments);
}

readFromFile();