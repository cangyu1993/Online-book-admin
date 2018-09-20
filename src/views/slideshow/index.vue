<!--轮播图列表-->

<template>
  <div>
    <!--顶部轮播图-->
    <div class="imgstart">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item,index) in imgData" :key="index">
          <img :src="item.img" @click="handleClick(item.book._id)">
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--渲染轮播图-->
     <div class="photo_time">
       <div v-for="(item,index) in imgData" :key="index">
         <img :src="item.img" class="item_img"  @click="handleClick(item.book._id)">
         <el-button type="danger" class="item_btn" @click="hendleDelete(item._id)">删除</el-button>
         <el-button  class="item_btn_two" @click="imgChange(item)">替换</el-button>
       </div>
     </div>

     <!--点击轮播图弹出详情-->
    <div class="photoDetail">
      <el-dialog title="图书信息" :visible.sync="isShow">
        <el-form :model="bookDetail">
          <div class="book_detail">
            <el-form-item label="封面" :label-width="formLabelWidth">
              <template>
                <img :src="bookDetail.img" class="img_change">
              </template>
            </el-form-item>
            <div class="detail_desc">
              <el-form-item label="作者:" :label-width="formLabelWidth">
                <el-input v-model="bookDetail.author" autocomplete="off" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="分类:" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="bookDetail.title" :disabled="true"></el-input>
              </el-form-item>

              <el-form-item label="看过的人:" :label-width="formLabelWidth">
                <el-input autocomplete="off" v-model="bookDetail.looknums" :disabled="true"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="isShow = false">老子不买</el-button>
        </div>
      </el-dialog>
    </div>

    <!--修改轮播图-->
    <div class="photoDetail">
      <el-dialog title="轮播图信息" :visible.sync="onShow">
        <el-form :model="changeItem">
          <div class="book_detail">
            <el-form-item label="封面" :label-width="formLabelWidth">
              <template>
                <img :src="changeItem.img" class="img_change">
                <input type="file" @change="handleImgTo">
              </template>
            </el-form-item>
            <div class="detail_desc">
              <el-form-item label="标题:" :label-width="formLabelWidth">
                <el-input v-model="changeItem.title" autocomplete="off" ></el-input>
              </el-form-item>

              <el-form-item label="优先数值:" :label-width="formLabelWidth">
                <el-input-number v-model="changeItem.index"  :min="1"></el-input-number>
              </el-form-item>

            </div>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onShow = false">取 消</el-button>
          <el-button type="primary" @click="imgToChange">确定修改</el-button>
        </div>
      </el-dialog>
    </div>

     <!--分页-->
    <div class="pageNum">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="count"
        @current-change="pageChange"
        :page-size=12
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "index",
    data() {
      return {
        imgData: [],
        count: 0,
        page: 1,
        token:"",
        isShow: false,
        bookDetail: {},
        formLabelWidth: '120px',
        changeItem:{
          title:"",
          img:"",
          book:"",
          index:""
        },
        onShow:false,
        imgId:""
      }
    },
    methods: {
      getData() {
        // '/swiper/?pn={{this.page}}&size=12'
        this.$axios.get(`/swiper?pn=${this.page}&size=12`).then(res => {
          console.log(res)
          this.count = res.count
          this.imgData = res.data
        })
      },
      pageChange(page) {
        console.log(page)
        this.page = page
        this.getData()
      },
      handleClick(id) {
        this.$axios.get(`/book/${id}`).then(res => {
          console.log(res)
          this.bookDetail = res.data
          this.isShow = true
        })
      },
      hendleDelete(id){
        console.log(id)
        this.$confirm('此操作将永久删除该轮播图, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$axios.post('/swiper/delete', {ids: [id] }).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除轮播图成功'
            });
            this.getData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      imgChange(item){
        this.changeItem.title = item.title
        this.changeItem.img = item.img
        this.changeItem.book = item.book._id
        this.changeItem.index = item.index
        this.imgId = item._id
        this.onShow = true
      },
      // 确定更改图片
      handleImgTo(event){
        // console.log(event)
        let file = event.target.files[0]
        let formData = new FormData()

        formData.append('file',file,'file')
        formData.append('token',this.token)
        axios.post('https://upload-z1.qiniup.com',formData,{
          headers:{
            'Content-Type':'multipart/form-data',
            // 'Content-Type':'application/x-www-form-urlencoded',
            // 'Content-Type':'application/json'
          }
        }).then(res=>{
          // console.log(res)
          this.changeItem.img = res.data.url
        })
      },
      getToken(){
        axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
          // console.log('下面是返回的token')
          // console.log(res)
          this.token = res.data.data
        })
      },
      imgToChange(){
        this.$axios.put(`/swiper/${this.imgId}`,this.changeItem).then(res=>{
          this.onShow = false
          if (res.code == 200){
            this.$message.success("轮播图更改成功")
            setTimeout(()=>{
              this.getData()
            },1000)
          } else {
            this.$message.error("更改失败")
          }

        }).catch(err=>{
          this.onShow = false
          this.$message.error("请求出错")
          setTimeout(()=>{
            this.getData()
          },1000)
        })
      }
    },
    created() {
      this.getData()
      this.getToken()
    }
  }
</script>

<style scoped lang="scss">
  .pageNum {
    padding: 10px 0;
    text-align: center;
  }

  .imgstart {
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }

  .photoDetail {
    .book_detail{
       display: flex;
       justify-content: space-around;
      .img_change {
        width: 130px;
        height: 150px;
      }
    }
    .detail_desc{
      width: 350px;
    }
  }
  .photo_time{
     display: flex;
     flex-wrap: wrap;
     /*justify-content: space-between;*/
     padding: 10px 0;
    .item_img{
      margin: 10px 30px;
      width: 150px;
      height: 190px;
      cursor:pointer
    }
    .item_btn{
      display: block;
      margin-left: 25px;
      position: relative;
      left: 10px;
    }
    .item_btn_two{
      position: relative;
      bottom: 39px;
      left: 106px;
    }
  }
</style>
