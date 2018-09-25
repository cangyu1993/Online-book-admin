<template>
  <div>
    <div :class="{'all':isShow,'all_1':!isShow}">
      <ul class="all_ul">
        <li v-for="(item,index) in bookData" :key="index" class="nav_every">
          <router-link to="/home/text" class="nav_link">
            {{item.title}}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="menu">
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" class="menu_btn"></el-button>
        <el-button type="primary" icon="el-icon-minus" class="menu_btn"></el-button>
        <el-button type="primary" icon="el-icon-menu" class="menu_btn" @click="handleClick"></el-button>
        <el-button type="primary" icon="el-icon-plus" class="menu_btn"></el-button>
        <el-button type="primary" icon="el-icon-arrow-right" class="menu_btn"></el-button>
      </el-button-group>
    </div>

  </div>
</template>

<script>
  export default {
    name: "text_3",
    data() {
      return {
        isShow:true,
        bookData: []
      }
    },
    methods: {
      getData() {
        this.$axios.get(`/book?pn=1&size=10`).then(res => {
          console.log(res)
          this.bookData = res.data
        })
      },
      handleClick(){
        this.isShow = !this.isShow
      },
      toDetali(){

      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .all {
    width: 320px;
    transition: .8s;
    transform: translate3d(420%,0,0);
    .all_ul {
      list-style: none;
      position: fixed;
      z-index: 998;
      .nav_every {
        background-color: #DCDFE6;
        padding: 10px;
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        border-bottom: 1px solid #ccc;
        .nav_link {
          text-decoration: none;
          color: black;
        }
      }
      .nav_every:hover {
        cursor: pointer;
      }
      .nav_every:active {
        color: #909399;
        background-color: #409EFF;
      }
    }
  }
  .all_1 {
    width: 320px;
    transition: .8s;
    transform: translate3d(300%,0,0);
    .all_ul {
      list-style: none;
      position: fixed;
      z-index: 998;
      .nav_every {
        background-color: #DCDFE6;
        padding: 10px;
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        border-bottom: 1px solid #ccc;
        .nav_link {
          text-decoration: none;
          color: black;
        }
      }
      .nav_every:hover {
        cursor: pointer;
      }
      .nav_every:active {
        color: #909399;
        background-color: #409EFF;
      }
    }
  }

  .menu {
    position: relative;
    left: 20px;
    top: 440px;
    .menu_btn{
      padding: 20px 35px;
    }
  }
</style>
