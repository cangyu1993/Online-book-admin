<template>
    <div class="homePage">
         <div class="header">
              <h1 class="title">在线云书后台管理系统</h1>
           <el-row class="btn-out">
             <el-button type="danger" @click="handleOut">退出登录</el-button>
           </el-row>
         </div>
      <div class="nav">
            <left_nav/>
      </div>
      <div class="mainContent">
          <router-view/>
      </div>

    </div>
</template>

<script>

    import left_nav from '@/components/left_nav'
    export default {
      name: "home",
      components: {
        left_nav,
      },
      methods: {
        handleOut() {
          this.$axios.get('/logout').then(res => {
            console.log(res)
            this.$router.push('/')
          })

        }
      },



    }
</script>

<style scoped lang="scss">
.homePage{
    .header{
      padding-left: 200px;
      /*background-color: #ae5aff;*/
      .title{
        position: relative;
        height: 60px;
        font-weight: 400;
        text-align: center;
        line-height: 60px;
        border-bottom: 1px solid #e9e9e9;
      }
      .btn-out{
        position: absolute;
        top: 10px;
        left: 1385px;
        /*position: fixed;*/
        /*top: 10px;*/
        /*right: 20px;*/
      }
    }
  .mainContent{
    padding: 20px 20px 20px 220px;
    /*background-color: #56ff3a;*/
  }
  .nav{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    background-color: #505b60;
  }
}
</style>
