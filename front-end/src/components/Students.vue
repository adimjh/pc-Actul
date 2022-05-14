<template>
  <div class="students">
    <!-- 头部内容 -->
    <Header></Header>
      <el-container>
        <!-- 左侧导航部分 -->
        <Menu></Menu>
        <!-- 中间内容部分 -->
        <el-container class="content">
          <main>
            <!-- 面包屑 -->
            <el-card>
              <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item class="fontWeight">学生系统</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index">{{item.name}}</el-breadcrumb-item>
              </el-breadcrumb>
            </el-card>
            <!-- 路由展示出口 -->
            <el-card>
              <router-view></router-view>
            </el-card>
          </main>
          <!-- 底部 -->
          <Footer></Footer>
        </el-container>
      </el-container>
  </div>
</template>

<script>
// 引用
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
import Menu from '@/components/common/Menu.vue'
// 挂载
export default {
  components: {
    Header,
    Footer,
    Menu
  }
}
</script>

<style>
.students {
    width: 100vw;
    height: 100vh;
}
/* 中间内容部分的样式和定位 */
.students .content {
    position: absolute;
    left: 240px;
    width: calc(100vw - 240px);
    padding: 20px;
    display: flex;
    flex-direction: column;
}
.students .content main{
    width: 100%;
    height: calc(100% - 100px);
    margin-bottom: 20px;
}
.students .content main .el-card{
  margin-bottom: 20px;
}
</style>
