<template>
    <div class="user-manage">
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home/onePage' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="table">
            <el-table
              :data="tableData"
              border
              style="width: 100%">

              <el-table-column
                prop="username"
                label="姓名"
                width="180">
              </el-table-column>

              <el-table-column
                prop="nickname"
                label="昵称"
                width="180">
              </el-table-column>

              <el-table-column
                prop="updatedTime"
                label="日期">
              </el-table-column>

              <el-table-column
                prop="desc"
                label="个性签名">
              </el-table-column>

              <el-table-column
                prop=""
                label="头像">
                <template slot-scope="scope">
                  <img :src="scope.row.avatar" alt="" class="avatar">
                </template>
              </el-table-column>

              <el-table-column
                prop=""
                label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
          </div>
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData:[]
        }
      },
      methods:{
        getData(){
          this.$axios.get('/user').then(res=>{
            console.log(res)
            if(res.code == 200){
              this.tableData=res.data
            }
          })
        },
        handleEdit(){},
        handleDelete(){}
      },
      created(){
        this.getData()
      }
    }
</script>

<style scoped lang="scss">
.user-manage {
  .breadcrumb{

  }
  .table{
    margin-top: 20px;
    .avatar{
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }
  }

}
</style>
