<template>
  <div class="user-manage">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/onePage' }">用户管理</el-breadcrumb-item>
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
              @click="handleEdit(scope.row._id)">编辑
            </el-button>
            <!--(scope.$index, scope.row)-->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)">删除
            </el-button>
            <!--(scope.$index, scope.row)-->
          </template>
        </el-table-column>

      </el-table>
    </div>
    <div class="pageNum">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="pageChange"
        :page-size="7"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        count: 0,
        page: 1
      }
    },
    methods: {
      getData() {
        this.$axios.get('/user', {pn: this.page, size: 7}).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.tableData = res.data
            this.count = res.count
          }
        })
      },
      handleEdit(id) {
        let i
        this.$router.push('/home/usersDetails')
        this.tableData.forEach((item, index) => {
          if (item._id == id) {
            return i = index
          }
        })
        // console.log(i)
        // console.log(this.tableData[i])

        sessionStorage.setItem('user', JSON.stringify(this.tableData[i]));
      },
      // 删除管理员
      handleDelete(id) {
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.post('/user/delete', {userIds: [id]}).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() => {
              this.getData()
            }, 1000)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      pageChange(page) {
        console.log(page)
        this.page = page
        this.getData()
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .user-manage {
    .breadcrumb {

    }
    .table {
      margin-top: 20px;
      .avatar {
        width: 80px;
        height: 80px;
        border-radius: 6px;
      }
    }
    .pageNum {
      padding: 10px 0;
      text-align: center;
    }

  }
</style>
