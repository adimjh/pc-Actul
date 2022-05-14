var express = require('express');
var router = express.Router();
var mdb = require('../libs/config1');

/* GET home page. */
// 加载出数据和查询数据
router.get('/', (req, res) => {
  mdb.search('information', req.query, res)
});

// 添加数据
router.post('/', (req, res) => {
  mdb.insert('information', req.body, res)
});

// 修改数据
router.put('/', (req, res) => {
  const { name, gender, age, birthDate, idNumber, father, mother, homeAddress, inDate, concat } = req.body
  mdb.update('information', { idNumber:req.body.idNumber }, { 
    $set: {
      name, gender, age, birthDate, idNumber, father, mother, homeAddress, inDate, concat
    }
   }, res)
})

// 删除
router.delete('/', (req, res) => {
  mdb.remove('information', req.query, res)
})
module.exports = router;
