<template>
  <div>
    <!--面包屑-->
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>图书管理</el-breadcrumb-item>
        <el-breadcrumb-item>图书列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--图书-->
    <div class="bookNum">
      <div v-for="(item,index) in bookData" :key="index">
        <div class="img_btn">
          <img :src="item.img" class="img">
          <p class="title">{{item.title}}</p>
          <el-button class="btn" type="danger" @click="handleDelete(item._id)">删除</el-button>
          <el-button class="btn" type="primary" @click="handleToSort(item._id)">添加到分类</el-button>
        </div>
      </div>
    </div>
    <!--分页-->
    <div class="pageNum">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="pageChange"
        :page-size=16
      >
      </el-pagination>
    </div>
    <!--添加分类弹窗-->
    <div class="toSort">
      <el-dialog title="添加到分类" :visible.sync="isShow">
        <h1 style="padding: 10px 0">请选择分类：</h1>

        <el-select v-model="value1" placeholder="请选择" @visible-change="getSort" @change="getSortId" @blur="lookChange">
          <el-option
            v-for="(item,index) in sortData"
            :key="index"
            :value="item.title">
            <span style="float: left">{{ item.title }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.books.length }}</span>
          </el-option>
        </el-select>

        <div slot="footer" class="dialog-footer">
          <el-button @click="isShow = false">取 消</el-button>
          <el-button type="primary" @click="bookToSort001">确 定</el-button>
        </div>
      </el-dialog>

    </div>
    <!--是否存在于其他分类判断-->
    <div class="againDialog">
      <el-dialog title="提示" :visible.sync="isSeenAgs">
        <h4 style="display: inline-block">此书已在
          <h2 class="changeColor" style="display: inline-block">
            {{this.sortTitle}}
          </h2>分类中存在,如需改动分类，请先移出原分类！
        </h4>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handleClickToBookList">确定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>


  export default {
    name: "index",
    data() {
      return {
        page: 1,
        count: 150,
        bookData: [],
        isShow: false,
        bookId: '',
        sortId: '',
        value1: '',
        sortData: [],
        isSeen: true,
        sortTitle: "",
        isSeenAgs: false
      }
    },
    methods: {
      getData() {
        this.$axios.get(`/book?pn=${this.page}&size=16`).then(res => {
          console.log(res)
          this.bookData = res.data
        })
      },
      lookChange(){
        this.getFalse()
      },
      pageChange(page) {
        console.log(page)
        this.page = page
        this.getData()
      },
      handleDelete(id) {
        this.$confirm('此操作将永久删除该图书, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.delete(`/book/${id}`).then(res => {
            if (res.code == 200) {
              this.$message.success("删除书籍成功")
              this.getData()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      handleToSort(id) {
        this.isShow = true
        this.bookId = id
        console.log("书籍id")
        console.log(this.bookId)
      },
      getSort() {
        this.$axios.get('/category', {pn: 1, size: 100}).then(res => {
          console.log(res)
          this.sortData = res.data
        })
      },
      getSortId(index) {
        // console.log(index)
        this.sortData.forEach(item => {
          if (item.title = index) {
            return this.sortId = item._id
          }
        })
        // console.log("分类id")
        // console.log(this.sortId)

      },
      handleClickToBookList() {
        this.isSeenAgs = false
        this.isShow = false
      },
      bookToSort001() {
        this.$axios.post(`/category/${this.sortId}/book/${this.bookId}`).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.$message.success("添加到分类成功")
            this.isShow = false
            this.$router.push('/home/sortList')
          }
        }).catch(err => {
          this.$message.error("添加到分类失败")
          this.isShow = false
        })
      },
      getFalse() {
        for (let i = 0; i < this.sortData.length; i++) {
          let newArr = this.sortData[i].books
          for (let j = 0; j < newArr.length; j++) {
            if (newArr[j] === this.bookId) {
              this.isSeenAgs = true
              break
            }
          }
          if (this.isSeenAgs) {
            this.sortTitle = this.sortData[i].title
            break
          }
        }
        console.log(this.isSeenAgs)
        console.log(this.sortTitle)
      }


    },
    created() {
      this.getData()
    }

  }
</script>

<style scoped lang="scss">
  .pageNum {
    padding: 10px 0;
    text-align: center;
  }

  .bookNum {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 10px;
    .img {
      width: 250px;
      height: 325px;
      display: block;
      margin: 10px 30px;
    }
    .img_btn {
      margin: 10px auto;
      text-align: center;
    }
    .title {
      margin: 0 auto;
      text-align: center;
      width: 300px;
      height: 24px;
      overflow: hidden;
    }
  }
  .againDialog{
    .changeColor{
      color: red;
    }
  }
</style>
