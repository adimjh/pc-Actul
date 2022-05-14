<template>
  <div class="header">
      <el-header>
          <router-link to="/home">
              <i class="fa fa-linux"></i>
              FrontEnd
          </router-link>
          <div>
                {{ usename }}
          </div>
      </el-header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      usename: ''
    }
  },
  created () {
    this.usename = localStorage.getItem('usename')
  }
}
</script>

<style>
.students .el-header{
  background-color: #07160b;
  color: #64db25;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.students .el-header a{
    color: #64db25;
    font-size: 24px;
    text-decoration: none;
}
</style>
