/*
 * @author: phil.li
 */
const express = require('express');
const app = express();

// 存储错误数据
let errorList = [12];
// 存储性能数据
let performanceList = [];
// 存储录屏数据
let recordScreenList = [];

app.all('*', function (res, req, next) {
  req.header('Access-Control-Allow-Origin', '*');
  req.header('Access-Control-Allow-Headers', 'Content-Type');
  req.header('Access-Control-Allow-Methods', '*');
  req.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.get('/getErrorList', (req, res) => {
  res.send({
    code: 200,
    data: errorList
  })
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
