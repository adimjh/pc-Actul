// 封装初始化数据
export function getData (root, url, params) {
  root.service(url, { params: params || { pageSize: root.pageSize } })
    .then(res => {
      if (res.data.status === 200) {
        res.data.data.forEach(item => {
          switch (item.gender) {
            case '1':
              item.gender_text = '男'
              break
            case '2':
              item.gender_text = '女'
              break
          }
          switch (item.state) {
            case '1':
              item.state_text = '在校'
              break
            case '2':
              item.state_text = '结业'
              break
            case '3':
              item.state_text = '退学'
              break
          }
          switch (item.className) {
            case '1':
              item.className_text = 'wed-class01'
              break
            case '2':
              item.className_text = 'wed-class02'
              break
            case '3':
              item.className_text = 'wed-class03'
              break
          }
        })
        root.tableData = [...res.data.data]
        root.total = res.data.total
      }
    })
    .catch(err => {
      throw err
    })
}

// 封装新增和修改的数据
export function changeData (root, method, url, obj, params) {
  root.service[method](url, obj)
    .then(res => {
      if (res.data.status === 200) {
        root.dialogFormVisible = false
        root.$message({
          type: 'success',
          message: res.data.msg
        })
        getData(root, url, params)
      }
    })
    .catch(err => {
      throw err
    })
}

// 封装删除的数据
export function removeData (root, url, obj, params) {
  root.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
    callback: action => {
      root.service.delete(url, { params: obj })
        .then(res => {
          if (res.data.status === 200) {
            root.$message({
              type: 'success',
              message: res.data.msg
            })
            getData(root, url, params)
          }
        })
        .catch(err => {
          throw err
        })
    }
  })
}
