<template>
  <div id="data-overiew">
    <div id="main1"></div>
    <div id="main2"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      x1: [],
      y1: []
    }
  },
  created () {
    this.service.get('data')
      .then(res => {
        if (res.data.status === 200) {
          this.x1 = res.data.data[0]
          this.y1 = res.data.data[1]
          // console.log(res.data.data)
          // this.draw('main1', 'vue图像实战', this.x1, this.y1)
        }
      })
      .catch(err => {
        throw err
      })
    // 第一个柱状图
    this.service.get('data/data')
      .then(res => {
        if (res.data.status === 200) {
          console.log(res.data.data)
          let obj = res.data.data
          var arr1 = []
          var arr2 = []
          for (let key in obj) {
            arr1.push(key)
            arr2.push(obj[key])
          }
          // console.log(arr1, arr2);
          this.draw('main1', 'vue图像实战', arr1, arr2)
        }
      })
      .catch(err => {
        throw err
      })
    
    // 第二个折线的图
    this.service.get('data/datas')
      .then(res => {
        if (res.data.status === 200) {
          console.log(res.data.data)
          let options = {
            title: {
              text: 'Stacked Line'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: res.data.data.name
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: res.data.data.date
            },
            yAxis: {
              type: 'value'
            },
            series: res.data.data.arr
          }
          this.draw2('main2', options)
        }
      })
      .catch(err => {
        throw err
      })
  },
  mounted () {

  },
  methods: {
    // 封装第一个图表
    draw (el, title, x, y) {
      // 基于准备好的dom，初始化echarts实例
      var myChart1 = this.$echarts.init(document.getElementById(el))
      // 绘制图表
      myChart1.setOption({
        title: {
          text: title
        },
        tooltip: {},
        xAxis: {
          data: x
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: y
          }
        ]
      })
    },
    // 封装第二个
    draw2 (el, options) {
      var myChart2 = this.$echarts.init(document.getElementById(el))
      // 绘制图表
      myChart2.setOption(options)
    }
  }
}
</script>

<style scoped>
#data-overiew {
  width: 100%;
  display: flex;
}
#data-overiew #main1 {
  width: 50%;
  height: 500px;
}
#data-overiew #main2 {
  width: 50%;
  height: 500px;
}
</style>
