<template>
  <div class="attendance-management">
    <!-- 搜素部分 -->
    <el-form ref="form" :model="formInline" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入学生的名称"></el-input>
      </el-form-item>
      <el-button type="primary" @click="searchHandle"><i class="fa fa-search"></i> 搜素</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table border :data="tableData" style="width: 100%" height="calc(100% - 103px)">
      <el-table-column fixed align="center" prop="name" label="姓名" ></el-table-column>
      <el-table-column align="center" prop="class" label="班级" ></el-table-column>
      <el-table-column align="center" prop="toBeDue" label="应到" ></el-table-column>
      <el-table-column align="center" prop="actual" label="实到" ></el-table-column>
      <el-table-column align="center" prop="attendance" label="到课率" ></el-table-column>
      <el-table-column align="center" prop="attendanceRanking" label="到课率的排名" ></el-table-column>
      <el-table-column align="center" prop="attendanceRate" label="到课率拼比" ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <Paging :total='total' @numChange="pageChanges"></Paging> -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
// import Paging from '@/components/common/Paging.vue'
export default {
  // components: {
  //   Paging
  // },
  created () {
    // 数据加载
    this.getAttendanceData('attendance/find')
  },
  data () {
    return {
      // 搜素部分的数据
      formInline: {
        name: ''
      },
      // 表格的数据
      tableData: [],
      total: 100,
      // 当前页面
      currentPage: 1,
      // 每页条数
      pageSize: 20
    }
  },
  methods: {
    // 数据加入  封装复用
    getAttendanceData (url) {
      this.service.get(url)
        .then(res => {
          if (res.data.status === 200) {
            console.log(res)
            // 数据
            this.tableData = [...res.data.data]
            // 总条数
            this.total = res.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 查找数据
    searchHandle () {
      console.log(this.formInline.name)
      // 非空校验
      if (this.formInline.name === '') {
        this.$message.error('不可以是空的哦')
        this.getAttendanceData('attendance/find')
      } else {
        this.service.get('attendance/find?name=' + this.formInline.name)
          .then(res => {
          // 清空数据
            this.formInline.name = ''
            if (res.data.status === 200) {
              this.tableData = [...res.data.data]
            } else {
              this.$message.error(res.data.msg)
            }
          })
          .catch(err => {
            throw err
          })
      }
    },
    // 分页的数据
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      console.log(`每页 ${val} 条`)
      this.getAttendanceData('attendance/page?pageSize=' + val)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      console.log(`当前页: ${val}`)
      // 页面切换
      this.getAttendanceData(`attendance/page?currentPage=${this.currentPage}&pageSize=${this.pageSize}`)
    }
  }
}
</script>

<style>
.attendance-management{
  height: calc(100vh - 285px);
}
/* 表单样式 */
.attendance-management>.el-form{
  display: flex;
  justify-content: flex-end;
  min-width: 1054px;
}
.attendance-management>.el-form>.el-button{
  width: 100px;
  height: 35px;
  background-color: #10401c;
  color: #d3d6d9;
  font-family: "楷体";
  margin-left: 15px;
  margin-top: 3px;
}
.el-pagination {
  float: right;
}
</style>
