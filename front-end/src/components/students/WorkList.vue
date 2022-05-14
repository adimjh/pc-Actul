<template>
  <div class="work-list">
    <!-- 搜素部分 -->
    <el-form ref="form" :model="formInline" label-width="80px">
      <el-form-item label="作业名称">
        <el-input v-model="formInline.jobName" placeholder="请输入作业名称"></el-input>
      </el-form-item>
      <el-button type="primary"><i class="fa fa-search" @click="onSubmit"></i> 搜素</el-button>
    </el-form>
    <!-- 表格 -->
    <!-- tableData.slice((当前页面 - 1 * 每页条数, 当前页数 * 每页条数)) -->
    <el-table border :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" style="width: 100%" height="calc(100% - 103px)">
      <el-table-column fixed align="center" prop="jobName" label="作业名称" ></el-table-column>
      <el-table-column align="center" prop="completeNumber" label="完成人数" ></el-table-column>
      <el-table-column align="center" prop="uncompleteNumber" label="未完成人数" ></el-table-column>
      <el-table-column align="center" prop="completionRate_text" label="完成率" ></el-table-column>
      <el-table-column align="center" prop="uncheck" label="待批改" ></el-table-column>
      <el-table-column align="center" prop="checkRate_text" label="批改率" ></el-table-column>
      <el-table-column align="center" prop="passNumber" label="及格人数" ></el-table-column>
      <el-table-column align="center" prop="excellentNumber" label="优秀人数" ></el-table-column>
    </el-table>
    <!-- 分页 -->
    <Paging :total='total' @numChange="pageChanges"></Paging>
  </div>
</template>

<script>
import Paging from '@/components/common/Paging.vue'
export default {
  components: {
    Paging
  },
  created () {
    this.service.get('http://rap2api.taobao.org/app/mock/301444/workList')
      .then(res => {
        if (res.status === 200) {
          console.log(res)
          res.data.data.forEach(item => {
            item.completionRate_text = item.completionRate * 100 + '%'
          })
          res.data.data.forEach(item => {
            item.checkRate_text = item.checkRate * 100 + '%'
          })
          this.total = res.data.total
          this.tableData = [...res.data.data]
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  data () {
    return {
      // 搜素部分的数据
      formInline: {
        jobName: ''
      },
      // 表格的数据
      tableData: [],
      total: 1,
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    pageChanges (currentPage, pageSize) {
      this.currentPage = currentPage
      this.pageSize = pageSize
    }
  }
}
</script>

<style>
.work-list{
  height: calc(100vh - 285px);
}
/* 表单样式 */
.work-list>.el-form{
  display: flex;
  justify-content: flex-end;
  min-width: 1054px;
}
.work-list>.el-form>.el-button{
  width: 100px;
  height: 35px;
  background-color: #10401c;
  color: #d3d6d9;
  font-family: "楷体";
  margin-left: 15px;
  margin-top: 3px;
}
</style>
