<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/sortList' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>分类详情页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="bookTable">
      <el-table
        :data="bookNum"
        border
        style="width: 100%">

        <!--<el-table-column-->
          <!--prop=""-->
          <!--label="封面">-->
          <!--<template slot-scope="scope">-->
            <!--<img :src="scope.row.img" alt="" class="avatar">-->
          <!--</template>-->
        <!--</el-table-column>-->

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
          label="书籍描述">
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
        sortId: "",
        pn: 1,
        size: 10,
        bookNum: [],
      }
    },
    created() {
      this.getData()
      // this.getParams ()
    },
    methods: {
      getParams () {
        // 取到路由带过来的参数
        let routerParams = this.$route.params.sortId
        // 将数据放在当前组件的数据内
        console.log(this.$route.params.sortId)
        this.sortId = routerParams
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
    },
    watch: {
      // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
  }
</script>

<style scoped>

</style>
