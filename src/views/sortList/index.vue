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
        align="center"
        label="分类名"
        width="180">
      </el-table-column>

      <el-table-column
        prop="books.length"
        align="center"
        label="该分类下书籍数量"
        width="180">
      </el-table-column>

      <el-table-column
        prop="index"
        align="center"
        label="优先数值">
      </el-table-column>

      <el-table-column
        prop=""
        align="center"
        label="书籍封面">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" class="avatar">
        </template>
      </el-table-column>

      <el-table-column
        prop=""
        label="操作">
        <template slot-scope="scope">

          <template>
            <changeSort :sortId="scope.row"/>
          </template>

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
        :page-size="size"
      >
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import changeSort from '@/components/changeSort.vue'
  export default {
    name: "index",
    components: {
      changeSort,
    },
    data() {
      return {
        listData: [],
        page: 1,
        count: 0,
        size:6

      }
    },
    methods: {
      getData() {
        // '/category', {pn: this.page, size: 6}
        this.$axios.get(`/category?pn=${this.page}&size=${this.size}`).then(res => {
          console.log(res)
          this.listData = res.data
          this.count = res.count
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
          path:"/home/booktable",
          query:{
            name:id,
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
