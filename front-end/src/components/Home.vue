<template>
  <div class="home">
    <el-container class="item">
      <el-card class="box-card" v-for="(item,index) in 4" :key="index">
        {{ 'Card0' + (index + 1) }}
      </el-card>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home{
  width: 100vw;
  height: 100vh;
}
.home .item {
  justify-content: center;
  padding: 50px 100px;
  flex-wrap: wrap;
}
.home .item .el-card{
  width: 20%;
  min-width: 160px;
  max-width: 280px;
  height: 320px;
  line-height: 200px;
  font-size: 24px;
  color: #10401c;
  margin: 20px 40px;
  cursor: pointer;
  transition: transform .5s;
}
.home .item .el-card:hover{
  transform: scale(1.05);
}
</style>
