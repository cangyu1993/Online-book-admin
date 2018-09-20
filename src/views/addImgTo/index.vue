<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/slideshow' }">轮播图管理</el-breadcrumb-item>
        <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="imgDetail">
      <el-form label-width="80px">

        <el-form-item label="添加标题" class="titleLength">
          <el-input v-model="imgData.title"></el-input>
        </el-form-item>

        <el-form-item label="选择图片">
          <img :src="imgData.img" class="toImg">
          <input type="file" @change="handleImgTo">
        </el-form-item>

        <el-form-item label="选择图书">
          <div>
            <el-select v-model="value" placeholder="请选择" @visible-change="getSort" @change="getBook">
              <el-option
                v-for="(item,index) in sortData"
                :key="index"
                :value="item.title"
              >
              </el-option>
            </el-select>
          </div>
        </el-form-item>

        <el-form-item label="图书" v-if="flage">
            <div class="bookOne_msg">
              <img :src="bookOne.img" class="bookOne_img">
              <div>
                <p>作者：{{bookOne.author}}</p>
                <p>书名：{{bookOne.title}}</p>
              </div>
            </div>
        </el-form-item>


        <el-form-item label="优先数值">
          <el-input-number v-model="imgData.index" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item>
          <el-button type="info" @click="imgToImgSort">确认添加</el-button>
        </el-form-item>
      </el-form>
    </div>


    <!--选择分类弹出分类详情-->
    <div class="photoDetail">
      <el-dialog title="该分类下图书信息" :visible.sync="isShow">
        <el-table
          :data="bookArray"
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
            prop="looknums"
            align=center
            label="观看人数">
          </el-table-column>

          <el-table-column
            prop=""
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleAdd(scope.row._id)">选择
              </el-button>
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
      </el-dialog>
    </div>


  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "index",
    data() {
      return {
        imgData: {
          title: '',
          img: '',
          book: '',
          index: ''
        },
        isShow: false,
        sortData: [],
        value: '',
        sortId: "",
        bookArray: [],
        count: 0,
        page: 1,
        bookOne: {},
        flage:false
      }
    },
    methods: {
      // 获取全部分类
      getSort() {
        this.$axios.get('/category', {pn: 1, size: 100}).then(res => {
          // console.log(res)
          this.sortData = res.data
          this.count = res.count
        })
      },
      getToken() {
        axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          // console.log('下面是返回的token')
          // console.log(res)
          this.token = res.data.data
        })
      },
      handleImgTo(event) {
        // console.log(event)
        let file = event.target.files[0]
        let formData = new FormData()

        formData.append('file', file, 'file')
        formData.append('token', this.token)
        axios.post('https://upload-z1.qiniup.com', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            // 'Content-Type':'application/x-www-form-urlencoded',
            // 'Content-Type':'application/json'
          }
        }).then(res => {
          // console.log(res)
          this.imgData.img = res.data.url
        })
      },
      getBook(index) {
        // console.log(index)
        this.sortData.forEach(item => {
          if (item.title = index) {
            return this.sortId = item._id
          }
        })
        // console.log(this.sortId)
        this.$axios.get(`/category/${this.sortId}/books?pn=${this.page}&size=6`).then(res => {
          console.log(res.data.books)
          this.bookArray = res.data.books
        })
        this.isShow = true
      },
      handleAdd(id) {
        // console.log(id)
        this.$axios.get(`/book/${id}`).then(res => {
          console.log(res)
          this.bookOne = res.data
          this.imgData.book = res.data._id
        })
        setTimeout(() => {
          this.isShow = false
          this.flage = true
        }, 1000)
      },
      pageChange(page) {
        // console.log(page)
        this.page = page
        this.getBook()
      },
      imgToImgSort(){
        this.$axios.post('/swiper',this.imgData).then(res=>{
          if (res.code == 200){
            this.$message.success("轮播图添加成功")
            setTimeout(()=>{
              this.$router.push('/home/slideshow')
            },1500)
          }
        })
      }
    },
    created() {
      this.getToken()
    }
  }
</script>

<style scoped lang="scss">
  .imgDetail {
    margin-top: 20px;
    .titleLength {
      width: 600px;
    }
    .toImg {
      width: 100px;
      height: 100px;
      border: 1px dashed #f1f1f1;
      border-radius: 6px;
    }
    .bookOne_msg{
      display: flex;
      justify-content: space-between;
      width: 300px;
      padding: 40px;
      border: 1px solid slategray;
      border-radius: 4px;
      .bookOne_img{
        width: 80px;
        height: 100px;
      }
    }
  }

  .photoDetail {
    .avatar {
      width: 50px;
      height: 70px;
    }
    .pageNum {
      padding: 10px 0;
      text-align: center;
    }
  }
</style>
