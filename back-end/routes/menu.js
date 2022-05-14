var express = require('express');
var router = express.Router();
var mdb = require('../libs/config1');

/* GET users listing. */
router.get('/', function(req, res) {
  let menu = {
    path: '/students',
    name: '图示化信息',
    iconfont: 'fa fa-database',
    component: ('@/components/Students'),
    children: [
      {
        path: '/dataAnalyiew/dataOveriew',
        name: '学生图示化信息',
        iconfont: 'fa fa-crop',
        component: ('@/components/dataAnalyiew/DataOveriew')
      },
      {
        path: '/dataAnalyiew/mapData',
        name: '学生分布地图',
        iconfont: 'fa fa-map-marker',
        component: ('@/components/dataAnalyiew/MapData')
      },
      {
        path: '/dataAnalyiew/travelMap',
        name: '学生出差航线图',
        iconfont: 'fa fa-paper-plane',
        component: ('@/components/dataAnalyiew/TravelMap')
      }
    ]
  }
  mdb.insert('menu', menu, res)
  res.send({ status: 200, msg: '您的信息已经添加成功' });
});

router.get('/menu', (req, res) => {
    mdb.search('menu', {}, res)
});

module.exports = router;