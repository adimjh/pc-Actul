<template>
  <div class="student-information">
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
        <el-form-item label="出生日期" :label-width="formLabelWidth" prop="birthDate">
          <el-input v-model="form.birthDate" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" :label-width="formLabelWidth" prop="idNumber">
          <el-input v-model="form.idNumber" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父亲" :label-width="formLabelWidth" prop="father">
          <el-input v-model="form.father" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="母亲" :label-width="formLabelWidth" prop="mother">
          <el-input v-model="form.mother" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" :label-width="formLabelWidth" prop="homeAddress">
          <el-input v-model="form.homeAddress" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入学日期" :label-width="formLabelWidth" prop="inDate">
          <el-input v-model="form.inDate" autocomplete="off"></el-input>
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
      <el-form-item label="身份证号">
        <el-input v-model="formInline.idNumber" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-button type="primary" @click="searchHandle"><i class="fa fa-search" ></i> 搜素</el-button>
      <el-button type="primary" @click="resetHandle"><i class="fa fa-refresh" ></i> 重置</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%" height="calc(100% - 103px)">
      <el-table-column fixed align="center" prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column align="center" prop="gender_text" label="性别" width="60"></el-table-column>
      <el-table-column align="center" prop="age" label="年龄" width="60"></el-table-column>
      <el-table-column align="center" prop="birthDate" label="出生日期" width="110"></el-table-column>
      <el-table-column align="center" prop="idNumber" label="身份证号" width="180"></el-table-column>
      <el-table-column align="center" prop="father" label="父亲" width="100"></el-table-column>
      <el-table-column align="center" prop="mother" label="母亲" width="100"></el-table-column>
      <el-table-column align="center" prop="homeAddress" label="家庭住址" width="380"></el-table-column>
      <el-table-column align="center" prop="inDate" label="入学日期" width="110"></el-table-column>
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
import { getData, changeData, removeData } from '../../api/api'
import Paging from '@/components/common/Paging.vue'
export default {
  components: {
    Paging
  },
  data () {
    return {
      // 校验
      rules: {
        name: [{ required: true, message: 'name不能为空' }],
        gender: [{ required: true }],
        age: [{ required: true, message: 'age不能为空' }],
        birthDate: [{ required: true, message: 'birthDate不能为空' }],
        idNumber: [{ required: true, message: 'idNumber不能为空' }],
        father: [{ required: true, message: 'father不能为空' }],
        mother: [{ required: true, message: 'mother不能为空' }],
        homeAddress: [{ required: true, message: 'homeAddress不能为空' }],
        inDate: [{ required: true, message: 'inDate不能为空' }],
        concat: [{ required: true, message: 'concat不能为空' }]
      },
      // 搜素部分的数据
      formInline: {
        name: '',
        idNumber: ''
      },
      // 添加表单的数据
      form: {
        name: '',
        gender: '1',
        age: '',
        birthDate: '',
        idNumber: '',
        father: '',
        mother: '',
        homeAddress: '',
        inDate: '',
        concat: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      state: false,
      // 表格的数据
      tableData: [],
      total: 100,
      currentPage: 1,
      pageSize: 20,
      url: 'information'
    }
  },
  // 初始化
  created () {
    getData(this, 'information')
  },
  methods: {
    // 查询数据
    searchHandle () {
      getData(this, 'information', this.formInline)
    },
    // 重置按钮
    resetHandle () {
      getData(this, 'information')
      this.formInline = {}
    },
    // 获取添加表单的数据
    AddConfirmHandle () {
      if (this.state) {
        // 修改数据
        changeData(this, 'put', 'information', this.form)
      } else {
        // -----------新增数据----------
        changeData(this, 'post', 'information', this.form)
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
        this.service.delete('information', { params: obj })
          .then(res => {
            // console.log(res)
            this.$message({
              type: 'success',
              message: `${row.name} 的该文件删除成功!`
            })
            this.dialogFormVisible = false
            getData(this, 'information')
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

      // let obj = { idNumber: row.idNumber, name: row.name }
      // removeData(this, 'information', obj)
    }
  }
}
</script>

<style>
.student-information{
  height: calc(100vh - 285px);
}
/* 添加按钮 */
.student-information>.el-button{
  position: absolute;
  left: 50px;
  width: 100px;
  height: 35px;
  background-color: #10401c;
  color: #d3d6d9;
  font-family: "楷体";
}
.student-information>.el-button:hover{
  border: 1px solid rgb(215, 229, 16);
  color: rgb(215, 229, 16);
}
.student-information .el-table .el-button.bth-edit{
  background-color: #10401c;
  color: #d3d6d9;
}
.student-information .el-table .el-button.bth-delete{
  background-color: rgba(255, 204, 102,.5);
  border-color: rgba(16, 64, 28, .2);
  color: #10401c;
}
.student-information .el-table .el-button.bth-delete,
.student-information .el-table .el-button.bth-edit{
  font-size: 12px;
  font-family: "楷体";
}
/* 表单样式 */
.student-information>.el-form{
  display: flex;
  justify-content: flex-end;
  min-width: 1054px;
}
.student-information>.el-form>.el-button{
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
