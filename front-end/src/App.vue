<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import url('./assets/css/Reste');
html{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #10401c;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color: #10401c;
}
.fontWeight {
  font-weight: bolder;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color:  #07160b;
    color: #64db25;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover {
    background-color:  #07160b;
    color: #64db25;
}
/* 对话框的公共样式 */
.el-dialog .el-form .el-form-item{
  text-align: left;
}
.el-dialog .el-form .el-form-item .el-select{
  width: 100%;
}
.el-select .el-input__inner:focus {
  border-color: #07160b;
}
.el-range-editor.is-active, .el-range-editor.is-active:hover, .el-select .el-input.is-focus .el-input__inner {
    border-color: #07160b;
}
.el-radio__input.is-checked+.el-radio__label {
    color: #07160b;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #fc6;
    background: #fc6;
}
.el-select-dropdown__item.selected {
    color: #07160b;
    font-weight: 700;
}
.el-button--primary {
    color: #FFF;
    background-color: #07160b;
    border-color: #64db25;
}
.el-button--primary:focus, .el-button--primary:hover {
    background: #07160b;
    border-color: #fc6;
    color: #FFF;
}
.dialog-footer .el-button{
  border-color: #07160b;
}
.el-button--primary {
  color: #d3d6d9;
  background-color: #07160b;
  border-color: #07160b;
}
/* .el-button:focus, .el-button:hover {
  color: #10401c;
  border-color: #10401c1a;
  background-color: #10401c1a;
} */
.el-button--primary:focus,
.el-button--primary:hover {
  background-color: #206933;
  border-color: #206933;
}
</style>
