<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/sortList' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>分类详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bookTable">
      <el-table
        :data="bookNum"
        border
        style="width: 100%">

        <el-table-column
          prop=""
          label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.img" alt="" class="avatar">
          </template>
        </el-table-column>

        <el-table-column
          prop="author"
          label="作者"
          width="180">
        </el-table-column>

        <el-table-column
          prop="index"
          label="总章节"
          width="180">
        </el-table-column>

        <el-table-column
          prop="looknums"
          label="观看人数">
        </el-table-column>

        <el-table-column
          prop="desc"
          label="书籍描述"
          width="300"
        >
        </el-table-column>

        <el-table-column
          prop=""
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row._id)">删除该图书
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        pn: 1,
        size: 10,
        bookNum: [],
        sortId: ""
      }
    },
    created() {
      this.getQuery()
      this.getData()
    },
    methods: {
      getQuery() {
        // 取到路由带过来的参数
        let routerQuery = this.$route.query.name
        // 将数据放在当前组件的数据内
        console.log(routerQuery)
        this.sortId = routerQuery
      },
      getData() {
        if (this.sortId) {
          this.$axios.get(`/category/${this.sortId}/books?pn=1&size=10`).then(res => {
            console.log(res)
            this.bookNum = res.data.books
            console.log(this.bookNum)
          })
        } else {
          this.$message({
            type: 'err',
            message: '未获取到Id'
          });
        }
      },
      handleDelete(id) {
        this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.delete(`/category/${this.sortId}/book/${id}`).then(res => {
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













    }
  }
</script>

<style scoped lang="scss">
    .bookTable{
      margin-top: 20px;
      .avatar{
        width: 200px;
        height: 250px;
      }
    }
</style>
