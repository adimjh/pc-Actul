<template>
  <div class="menu">
      <el-aside width="200px">
            <el-menu
                router
                default-active="activePath"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#07160b"
                text-color="#fff"
                active-text-color="#64db25">
                <template v-for="(item,index) in menus">
                    <el-submenu :index="index + ''" :key="index" v-if="!item.hidden">
                        <template slot="title">
                            <i :class="item.iconfont"></i>
                            <span>{{item.name}}</span>
                        </template>
                        <el-menu-item-group v-for="(child,index) in item.children" :key="index">
                            <el-menu-item :index="child.path">
                              <i :class="child.iconfont"></i>
                              {{child.name}}
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </template>
            </el-menu>
        </el-aside>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menus: [],
      activePath: ''
    }
  },
  created () {
    // console.log(this.$router.options.routes)
    this.menus = [...this.$router.options.routes]
    
    // this.activePath = this.menus[3].children[0].path
    this.activePath = this.$router.currentRoute.path
    // console.log(this.$route.matched)
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style>
.menu .el-aside{
    position: absolute;
    height: calc(100vh - 60px);
}
.menu .el-aside .el-menu{
    height: 100%;
    text-align: left;
}
.menu .el-aside .el-submenu i{
    color: #d3d6d9;
    margin-right: 5px;
}
.menu .el-aside .el-menu-item.is-active i{
    color: #64db25;
}
</style>
