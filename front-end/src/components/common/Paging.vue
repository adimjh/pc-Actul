<template>
  <div class="paging">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :url="url"
    >
    </el-pagination>
  </div>
</template>

<script>
import { getData } from '../../api/api'
export default {
  props: {
    'total': Number,
    'url': String
  },
  data () {
    return {
      currentPage: 1,
      pageSize: 20
    }
  },
  methods: {
    // 分页的数据
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      getData(this.$parent, this.url, { pageSize: val })
    },
    handleCurrentChange (val) {
      this.currentPage = val
      let obj = {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      getData(this.$parent, this.url, obj)
    }
  }
}
</script>

<style>
.paging .el-pagination {
  margin-top: 20px;
  text-align: right;
}
</style>
