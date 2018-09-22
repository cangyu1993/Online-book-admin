
<!--书籍分类详情页-->

<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/sortList' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>分类详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
     <div class="sortTitle"><h3>>>>>>>>>{{bigTitle}}</h3></div>
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
          prop="title"
          align=center
          label="书名">
        </el-table-column>

        <el-table-column
          prop="author"
          align=center
          label="作者"
          width="180">
        </el-table-column>

        <el-table-column
          prop="index"
          label="总章节"
          align=center
          width="180">
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
    <div class="pageNum">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="pageChange"
        :page-size=5
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
        pn: 1,
        bookNum: [],
        sortId: "",
        count:0,
        page:1,
        bigTitle:""
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
          this.$axios.get(`/category/${this.sortId}/books?pn=${this.page}&size=5`).then(res => {
            console.log(res)
            this.count = res.count
            this.bookNum = res.data.books
            this.bigTitle = res.data.title
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
        this.$confirm('此操作将永久从该分类中删除, 是否继续?', '提示', {
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
      pageChange(page) {
        console.log(page)
        this.page = page
        this.getData()
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
    .sortTitle{
      padding: 10px 0;
    }
    .pageNum {
      padding: 10px 0;
      text-align: center;
    }
</style>
