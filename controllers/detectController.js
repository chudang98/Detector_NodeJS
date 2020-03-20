// import { findPhoneNumbersInText } from './../node_modules/libphonenumber-js';

const phoneLib = require('libphonenumber-js');
const fs = require('fs');

var data = fs.readFileSync(`${__dirname}/../header_numberphone.json`);

var dau_so = JSON.parse(data);
exports.detectPhone = async (req, res, next) => {
  var text = req.body.text;
  var result = await detectNumber(text);
  result = result.filter(checkNumber);
  return res.status(200).json({
    value: result
  });
};
exports.detectEmail = async (req, res, next) => {
  var text = req.body.text;
  var result = await detectEmail(text);

  return res.status(200).json({
    value: result
  });
};

exports.testcase = async (req, res, next) => {
  var result = await runTestcase();
  return res.status(200).json({
    result: result
  });
};

const checkNumber = number => {
  for (let props in dau_so) {
    for (let i = 0; i < dau_so[props].length; i++) {
      if (number.startsWith(dau_so[props][i]) == true) return true;
    }
  }
  return false;
};
const detectNumber = async text => {
  var result = [];
  var size_sub = 0;
  if (text == '' || text == undefined) return [];
  var str = await preProcessText(text);
  var list_number = phoneLib.findPhoneNumbersInText(str, 'VN');
  while (list_number.length > 0) {
    list_number.forEach(async element => {
      result.push(element.number.number.replace('+84', '0'));
      let sub = str.substring(
        element.startsAt + size_sub,
        element.endsAt + size_sub
      );
      size_sub -= sub.length;
      str = str.replace(sub, '');
    });
    list_number = phoneLib.findPhoneNumbersInText(str, 'VN');
    size_sub = 0;
  }
  return result;
};

const preProcessText = async text => {
  var str = text;
  var re = /([/-])/g;
  var re2 = /[a-zA-Z][0-9]|[0-9][a-zA-Z]/g;
  str = str.replace(re, ' $1 ');
  var index = str.search(re2);
  while (index != -1) {
    index++;
    str = str.slice(0, index) + ' ' + str.slice(index);
    index = str.search(re2);
  }
  return str;
};

const runTestcase = async () => {
  var result = [];
  data = await fs.readFileSync(`${__dirname}/../testdata.json`);
  var list = JSON.parse(data);
  var count = 1;
  list.forEach(async element => {
    var str = element.string;
    var res = await detectNumber(str);
    result.push(res);
  });
  console.log(result);
  return result;
};

const detectEmail = text => {
  var str = text;
  if (text === '' || text == undefined) return [];
  // var regexEmail = /^[a-zA-Z][a-zA-z0-9_\.]{5,64}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/g;
  var regexEmail = /([a-zA-Z0-9][a-zA-Z0-9._-]{7,60}@[a-zA-Z0-9][a-zA-Z0-9._-]{2,5}\.[a-zA-Z0-9_-]{2,5})/g;
  res = str.match(regexEmail);
  console.log(res);
  return res;
};
