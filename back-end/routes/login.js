var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('login');
  let data = {usename:'jianghan1', prassword:'123456789'}
  db.collection('admin').insertOne(data,(err, result) => {
    if (err) throw err
    res.send('新增管理员成功')
  })
});

// POST users listing.
router.post('/', function(req, res, next) {
  // console.log(req.body)
  if(req.body.usename && req.body.prassword) {
    let data = db.collection('admin').find()
    // console.log(data);
    data.toArray((err, result) => {
      let pass = result.filter(currentValue => {
        return currentValue.usename === req.body.usename && currentValue.prassword === req.body.prassword
      })
      pass.length > 0 ? res.send({ status: 200, msg: '登录成功', usename: pass[0].usename}) : res.send({ status: 400, msg: '用户名或者密码错误' })
    })
  }else {
    res.send({ status: 401, msg: '无权限用户' })
  }
});

module.exports = router;
