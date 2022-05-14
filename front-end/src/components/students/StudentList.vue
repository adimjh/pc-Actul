<template>
  <div class="student-list">
    <!-- 添加按钮 -->
    <el-button type="primary" @click="additonHandle"><i class="fa fa-download"></i> 添加</el-button>
    <!-- 对话框 -->
    <el-dialog :title="state ? '编辑学生信息(Edit Student Information)' : '添加学生信息(Add Student InforMation)'"  :visible.sync="dialogFormVisible" align="center" width="25%">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-radio v-model="form.gender" label="1">男(Male)</el-radio>
          <el-radio v-model="form.gender" label="2">女(Woman)</el-radio>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="form.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学号" :label-width="formLabelWidth" prop="studentId">
          <el-input v-model="form.studentId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth" prop="className">
          <el-select v-model="form.className" placeholder="请选择班级">
            <el-option label="wed-class01" value="1"></el-option>
            <el-option label="wed-class02" value="2"></el-option>
            <el-option label="wed-class03" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth" prop="state">
          <el-select v-model="form.state" placeholder="请选择班级">
            <el-option label="在读" value="1"></el-option>
            <el-option label="结业" value="2"></el-option>
            <el-option label="休学" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="concat">
          <el-input v-model="form.concat" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddConfirmHandle('form')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 搜素部分 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="姓名">
        <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="formInline.studentId" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item label="班级">
        <el-select v-model="formInline.className" placeholder="请选择对应的班级">
          <el-option label="wed-class01" value="1"></el-option>
          <el-option label="wed-class02" value="2"></el-option>
          <el-option label="wed-class03" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" @click="searchHandle"><i class="fa fa-search" ></i> 搜素</el-button>
      <el-button type="primary" @click="resetHandle"><i class="fa fa-refresh" ></i> 重置</el-button>
    </el-form>
    <!-- 表格 -->
    <!-- tableData.slice((当前页面 - 1 * 每页条数, 当前页数 * 每页条数)) -->
    <el-table :data="tableData" style="width: 100%" height="calc(100% - 103px)">
      <el-table-column fixed align="center" prop="name" label="姓名" width="120"></el-table-column>
      <el-table-column align="center" prop="gender_text" label="性别" width="120"></el-table-column>
      <el-table-column align="center" prop="age" label="年龄" width="100"></el-table-column>
      <el-table-column align="center" prop="studentId" label="学号" width="180"></el-table-column>
      <el-table-column align="center" prop="className_text" label="班级" width="180"></el-table-column>
      <el-table-column align="center" prop="state_text" label="状态" width="120"></el-table-column>
      <el-table-column align="center" prop="address" label="地址" width="320"></el-table-column>
      <el-table-column align="center" prop="concat" label="电话" width="160"></el-table-column>
      <el-table-column label="Operate">
        <template fixed slot-scope="scope">
          <el-button class="fontWeight bth-edit" size="mini" icon="el-icon-edit" @click="editHandle(scope.row)">编辑</el-button>
          <el-button class="fontWeight bth-delete" size="mini" icon="el-icon-delete" @click="deleteHandle(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <Paging :total='total' :url='url'></Paging>
  </div>
</template>

<script>
import { getData, changeData } from '../../api/api'
import Paging from '@/components/common/Paging.vue'
export default {
  components: {
    Paging
  },
  data () {
    return {
      // 校验
      rules: {
        name: [{ required: true, message: 'Name不能为空' }],
        gender: [{ required: true }],
        age: [{ required: true, message: 'Age不能为空' }],
        studentId: [{ required: true, message: 'StudentID不能为空' }],
        className: [{ required: true }],
        state: [{ required: true }],
        address: [{ required: true, message: 'Address不能为空' }],
        concat: [{ required: true, message: 'Concat不能为空' }]
      },
      // 搜素部分的数据
      formInline: {
        name: '',
        studentId: '',
        className: ''
      },
      // 添加表单的数据
      form: {
        name: '',
        gender: '1',
        age: '',
        studentId: '',
        className: '1',
        state: '1',
        address: '',
        concat: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '100px',
      state: false,
      // 表格的数据
      tableData: [],
      total: 100,
      // 当前页面
      currentPage: 1,
      // 每页条数
      pageSize: 20,
      url: 'list'
    }
  },
  // 初始化
  created () {
    getData(this, 'list')
  },
  methods: {
    // 查询数据
    searchHandle () {
      getData(this, 'list', this.formInline)
    },
    resetHandle () {
      getData(this, 'list')
      this.formInline = {}
    },
    // 获取添加表单的数据
    AddConfirmHandle () {
      if (this.state) {
        // 修改数据
        changeData(this, 'put', 'list', this.form)
      } else {
        // -----------新增数据----------
        changeData(this, 'post', 'list', this.form)
      }
    },
    // 添加
    additonHandle () {
      this.form = { gender: '1' }
      this.state = false
      this.dialogFormVisible = true
    },
    // 编辑
    editHandle (row) {
      console.log(row)
      // this.form = row
      this.form = {...row}
      this.state = true
      this.dialogFormVisible = true
    },
    // 删除
    deleteHandle (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        console.log(row)
        // 存一下数据
        let obj = { studentId: row.studentId }
        // 请求数据
        this.service.delete('list', { params: obj })
          .then(res => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: `${row.name} 的该文件删除成功!`
            })
            this.dialogFormVisible = false
            getData(this, 'list')
          })
          .catch(err => {
            throw err
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
.student-list{
  height: calc(100vh - 285px);
}
/* 添加按钮 */
.student-list>.el-button{
  position: absolute;
  left: 50px;
  width: 100px;
  height: 35px;
  background-color: #10401c;
  color: #d3d6d9;
  font-family: "楷体";
}
.student-list>.el-button:hover{
  border: 1px solid rgb(215, 229, 16);
  color: rgb(215, 229, 16);
}
.student-list .el-table .el-button.bth-edit{
  background-color: #10401c;
  color: #d3d6d9;
}
.student-list .el-table .el-button.bth-delete{
  background-color: rgba(255, 204, 102,.5);
  border-color: rgba(16, 64, 28, .2);
  color: #10401c;
}
.student-list .el-table .el-button.bth-delete,
.student-list .el-table .el-button.bth-edit{
  font-size: 12px;
  font-family: "楷体";
}
/* 表单样式 */
.student-list>.el-form{
  display: flex;
  justify-content: flex-end;
  min-width: 1054px;
}
.student-list>.el-form>.el-button{
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
