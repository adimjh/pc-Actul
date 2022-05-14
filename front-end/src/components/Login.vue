<template>
    <div id="login">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Login</span>
        </div>
            <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="UserName" prop="usename">
                <el-input v-model="form.usename"></el-input>
            </el-form-item>
            <el-form-item label="PrassWord" prop="prassword">
                <el-input type="password" v-model="form.prassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginHandle('form')">登录</el-button>
            </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        usename: '',
        prassword: ''
      },
      rules: {
        usename: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 4, max: 20, message: '请输入正确的账号4位数到9位数的账号', trigger: ['blur', 'change']}
        ],
        prassword: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 20, message: '请输入正确的账号4位数到9位数的密码', trigger: ['blur', 'change']}
        ]
      },
      menuData: {}
    }
  },
  // created() {
  //   this.getMenuData()
  // },
  methods: {
    // getMenuData () {
    //   this.service.get('menu/menu')
    //   .then(res => {
    //     if(res.data.status === 200) {
    //       console.log(res.data.data)
    //       res.data.data.forEach(item => {
    //         item.component = () => import(item.component)
    //         // console.log(item)
    //         item.children.forEach(child => {
    //           child.component = () => import(child.component)
    //           console.log(child)
    //         })
    //       })
    //       this.menuData = res.data.data[0]
    //     }
    //   })
    //   .catch(err => {
    //     throw err
    //   })
    // },
    loginHandle (form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // console.log(this.form)
          this.service.post('login', this.form)
            .then(res => {
              // console.log(res)
              localStorage.setItem('usename', res.data.usename)
              if (res.data.status === 200) {
                this.$message({
                  message: res.data.msg,
                  type: 'success'
                })
                // 菜单栏权限
                // 1.请求菜单权限数据
                // let routerArr = {
                //     path: '/students',
                //     name: '图示化信息',
                //     iconfont: 'fa fa-database',
                //     component: () => import('@/components/Students'),
                //     children: [
                //       {
                //         path: '/dataAnalyiew/dataOveriew',
                //         name: '学生图示化信息',
                //         iconfont: 'fa fa-crop',
                //         component: () => import('@/components/dataAnalyiew/DataOveriew')
                //       },
                //       {
                //         path: '/dataAnalyiew/mapData',
                //         name: '学生分布地图',
                //         iconfont: 'fa fa-map-marker',
                //         component: () => import('@/components/dataAnalyiew/MapData')
                //       },
                //       {
                //         path: '/dataAnalyiew/travelMap',
                //         name: '学生出差航线图',
                //         iconfont: 'fa fa-paper-plane',
                //         component: () => import('@/components/dataAnalyiew/TravelMap')
                //       }
                //     ]
                //   }

                  // this.$router.addRoutes([routerArr])
                  // this.$router.options.routes.push(routerArr)
                  // console.log(this.$router.options.routes)
                  // console.log(this.menuData);
                  // this.$router.addRoutes([this.menuData])
                  // this.$router.options.routes.push(this.menuData)
                  this.$router.push('/students')
              } else {
                this.$message.error(res.data.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          console.log(this.form)
        }
      })
    }
  }
}
</script>

<style scoped>
#login {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url(../assets/images/GIF.gif) no-repeat;
    background-size: 100% 100%;
}
#login .box-card {
    width: 520px;
    margin: 280px auto;
    background-color: rgba(54, 49, 49, 0.8);
    color: rgb(38, 247, 107);
}
#login .box-card .el-button {
    width: 100%;
    background-color: #000000;
    color: rgb(38, 247, 107);
}
</style>
