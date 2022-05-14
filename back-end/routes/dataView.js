var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  let x1 = ["一班", "二班", "三班", "四班", "五班", "六班"],
      y1 = [55, 68, 75, 52, 85, 97]
  res.send({ status: 200, data: [x1, y1] })
});

router.get('/data', (req, res) => {
    let obj = {
        '一班': 58,
        '二班': 68,
        '三班': 75,
        '四班': 52,
        '五班': 85,
        '六班': 97
    }
    res.send({ status: 200, data: obj })
});

router.get('/datas', (req, res) => {
    let obj = {
        name: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
        date: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        arr: [
            {
                name: "邮件营销",
                type: "line",
                stack: "总量",
                data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
                name: "联盟广告",
                type: "line",
                stack: "总量",
                data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
                name: "视频广告",
                type: "line",
                stack: "总量",
                data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
                name: "直接访问",
                type: "line",
                stack: "总量",
                data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
                name: "搜索引擎",
                type: "line",
                stack: "总量",
                data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
        ]
    }
    res.send({ status: 200, data: obj })
})

module.exports = router;