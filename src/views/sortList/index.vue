<template>
  <div>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/sortList' }">用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>分类列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <el-table
      :data="listData"
      border
      style="width: 100%"
      class="tableData"
    >

      <el-table-column
        prop="title"
        label="分类名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="books.length"
        label="该分类下书籍数量"
        width="180">
      </el-table-column>

      <el-table-column
        prop="index"
        label="优先数值">
      </el-table-column>

      <el-table-column
        prop=""
        label="书籍封面">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" class="avatar">
        </template>
      </el-table-column>

      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row._id)">修改分类
          </el-button>
          <!--(scope.$index, scope.row)-->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row._id)">删除该分类
          </el-button>
          <!--(scope.$index, scope.row)-->
          <el-button
            size="mini"
            type="info"
            @click="handleLook(scope.row._id)">查看分类
          </el-button>
          <!--(scope.$index, scope.row)-->
        </template>
      </el-table-column>

    </el-table>
    <div class="pageNum">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="pageChange"
        :page-size="6"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        listData: [],
        page: 1,
        count: 20,

      }
    },
    methods: {
      getData() {
        this.$axios.get('/category', {pn: this.page, size: 6}).then(res => {
          console.log(res)
          this.listData = res.data
        })
      },
      // 删除
      handleDelete(id) {
        this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.delete(`/category/${id}`).then(res => {
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


      // 修改
      handleEdit(id) {
        setTimeout(() => {
          this.$router.push('/home/listdetail')
        }, 1000)
      },


      // 查看
      handleLook(id) {
        this.$message({
          type: 'success',
          message: '即将跳转至详情页'
        });
        this.$router.push({
          path: '/home/booktable',
          name:"booktable",
          params: {
            // name: 'booktable',
            sortId: id
          }
        })
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
  .tableData {
    margin-top: 10px;
    .avatar {
      width: 80px;
      height: 70px;
      border-radius: 6px;
    }
  }

  .pageNum {
    padding: 10px 0;
    text-align: center;
  }
</style>
