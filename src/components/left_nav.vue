
<!--左侧固定导航-->


<template>
    <div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#505b60"
        text-color="#e9e9e9"
        :router=true
      >
        <!--导航1-->
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/onePage">首页</el-menu-item>
            <el-menu-item index="/home/twoPage">登陆</el-menu-item>
            <el-menu-item index="/home/users">用户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!--导航2-->
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/sortList">分类列表</el-menu-item>
            <el-menu-item index="/home/addclassify">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
         <!--导航3-->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>图书管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/bookList">图书列表</el-menu-item>
            <el-menu-item index="3-2">添加图书</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!--导航4-->
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>轮播图管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/slideshow">轮播图列表</el-menu-item>
            <el-menu-item index="3-2">添加轮播图</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "left_nav",
        methods: {
          handleOpen(key, keyPath) {
            // console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            // console.log(key, keyPath);
          }
        }
    }
</script>

<style scoped lang="scss">
.el-menu-vertical-demo{
  margin-top: 60px;
  width: 200px;
}
</style>
