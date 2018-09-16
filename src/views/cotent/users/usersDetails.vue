<template>
<div>

    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/onePage' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/users' }">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

     <div class="mainContent">
            <div class="title">
              <span class="line"></span>
              <h1 class="title">欢迎来到管理员详情页面</h1>
              <span class="line"></span>
            </div>
            <div class="content">
                <div class="headerImg">
                  <img src="" alt="">
                  <el-button type="success" round>更换头像</el-button>
                </div>
                 <div class="nikename"></div>
            </div>
     </div>





</div>

</template>

<script>
    import bus from '../../../views/bus/index'
    export default {
        name: "usersDetails",
        data(){
          return{
             userData:[],
          }
        },
      methods:{
          // getData(){
          //   this.$axios.put('/user/userInfo',{}).then(res => {
          //     console.log(res)
          //     if (res.code == 200) {}
          //   })
          // },

        },

       created(){
         bus.$on('toData',(tableData)=>{
              console.log('下面是刚传过来的数据：')
              console.log(tableData)
              this.userData = tableData
              console.log('下面是赋值的数据：')
              console.log(this.userData)
         })
       }






    }
</script>

<style scoped lang="scss">
  .mainContent{
    margin-top: 20px;
    .line{
      position: relative;
      bottom: 12px;
      display: inline-block;
      width: 380px;
      height: 0;
      border-top: 1px solid #ccc;
    }
    .title{
      padding: 0 40px;
      display: inline-block;
      font-size: 25px;
      font-style: oblique;
      background-image: -webkit-linear-gradient(left,blue,#66ffff 10%,#cc00ff 20%,#CC00CC 30%, #CCCCFF 40%, #00FFFF 50%,#CCCCFF 60%,#CC00CC 70%,#CC00FF 80%,#66FFFF 90%,blue 100%);
      -webkit-text-fill-color: transparent;/* 将字体设置成透明色 */
      -webkit-background-clip: text;/* 裁剪背景图，使文字作为裁剪区域向外裁剪 */
      -webkit-background-size: 200% 100%;
      -webkit-animation: masked-animation 4s linear infinite;
    }
  }
</style>
