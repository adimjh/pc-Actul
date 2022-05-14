var express = require('express');
const { Db } = require('mongodb');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    let arr = []
    for(let i = 0; i < 85; i++) {
        let obj = {
            name: 'Name' + i,
            class: 'Web-Class01',
            toBeDue: 100,
            actual: 85,
            attendance: '85%',
            attendanceRanking: 1,
            attendanceRate: 'Excellent'
        }
        arr.push(obj)
    }
    db.collection('attendance').insertMany(arr, (err, result) => {
        if(err) throw err
        res.send({ status: 200, msg: '数据新增成功' })
    })
});

// 后端查找数据接口
router.get('/find',async (req,res) => {
    let data = db.collection('attendance').find(req.query).limit(20)
    let total = await db.collection('attendance').find().count()
    data.toArray((err, result) => {
        if(err) throw err
        result.length > 0 ? res.send({ status: 200, data: result, total: total}) :
        res.send({ data: [], msg: '查询不到或者您输入有误!' })
    })
})

router.get('/page',async (req, res) => {
    // skip参数: (当前页数 - 1) * 每页条数
    let skip = Number(req.query.currentPage - 1) * Number(req.query.pageSize)
    let total = await db.collection('attendance').find().count()
    let data = db.collection('attendance').find().limit(Number(req.query.pageSize)).skip(skip)
    data.toArray((err, result) => {
        if(err) throw err
        res.send({ status: 200, data: result ,total: total})
    })
})

module.exports = router;
