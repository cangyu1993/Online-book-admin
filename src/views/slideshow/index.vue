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
         <el-button type="danger" class="item_btn">删除</el-button>
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

     <!--分页-->
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
        imgData: [],
        count: 0,
        page: 1,
        isShow: false,
        bookDetail: {},
        formLabelWidth: '120px'
      }
    },
    methods: {
      getData() {
        this.$axios.get('/swiper/?pn={{this.page}}&size={{this.count}}').then(res => {
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
     justify-content: space-between;
     padding: 10px 0;
    .item_img{
      padding: 10px 30px;
      width: 130px;
      height: 170px;
      cursor:pointer
    }
    .item_btn{
      display: block;
      margin-left: 25px;
      position: relative;
      left: 30px;
    }
  }
</style>
