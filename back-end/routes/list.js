var express = require('express');
var router = express.Router();

/* GET home page. */
// 加载出数据和查询数据
router.get('/',async function(req, res) {
  // 多少条数据
  let total = await db.collection('list').find().count()
  // 起始位置
  let skip = (Number(req.query.currentPage - 1) * Number(req.query.pageSize))
  let data = db.collection('list').find(req.query.name ? req.query : {}).limit(Number(req.query.pageSize)).skip(skip)
  data.toArray((err, result) => {
    if(err) throw err
    res.send({ status: 200, data: result, total: total})
  })
});

// 添加数据
router.post('/', (req, res) => {
  let data = req.body
  db.collection('list').insertOne(data, (err, result) => {
    if(err) throw err
    res.send({ status: 200, msg: '数据添加成功' })
  })
})

// 更新数据
router.put('/', (req, res) => {
  const { name, gender, age, studentId, className, state, address, concat } = req.body
  db.collection('list').updateOne({ studentId: req.body.studentId }, {
    $set: {
      name,
      gender,
      age,
      studentId,
      className,
      state,
      address,
      concat
    }
  }, err => {
    if(err) throw err
    res.send({ status: 200, msg: '数据修改成功' })
  })
})

// 删除数据
router.delete('/', (req, res) => {
  db.collection('list').remove(req.query, (err, result) => {
    if(err) throw err 
    res.send({ status: 200 })
  })
})

module.exports = router;
