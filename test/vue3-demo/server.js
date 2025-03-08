/*
 * @author: phil.li
 */
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const coBody = require('co-body');
const path = require('path');
const serveStatic = require('serve-static');
const { default: axios } = require('axios');
const app = express();

// 
const rootPath = path.join(__dirname, 'dist');
app.use(serveStatic(rootPath));
app.use(bodyParser.json( { limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 50000 }));

// 存储错误数据
let errorList = [];
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

// 获取错误列表
app.get('/getErrorList', (req, res) => {
  res.send({
    code: 200,
    data: errorList
  })
})

// 获取js.map源码文件
app.get('/getJsMap', (req, res) => {
  const { fileName } = req.query;
  if (!fileName) {
    res.send({
      code: 400,
      data: '获取失败'
    })
    return
  }
  
  const mapFile = path.join(__dirname, 'dist/assets')
  let mapPath = path.join(mapFile, `${fileName}.map`);
  fs.readFile(mapPath, 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.send({
        code: 400,
        data: '获取失败'
      })
    } else {
      res.send({
        code: 200,
        data: data
      })
    }
  })
})

// 错误上报
app.post('/reportData', async (req, res) => {
  const data = await coBody.json(req)
  errorList.push(data);

  res.send({
    code: 200,
    data: '上报成功'
  })
})

app.listen(3005, () => {
  console.log('Example app listening on port 3005!');
});
