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
      </div>

      <div class="peopleDetail">
          <div class="content">
              <h4>用户名：</h4>
              <el-input :placeholder="tryData.username" :disabled="true" v-model="userData.username"/>
              <h4>昵称：</h4>
              <el-input :placeholder="tryData.nickname" v-model="userData.nickname"/>
              <h4>个人邮箱：</h4>
              <el-input :placeholder="tryData.email" v-model="userData.email"/>
              <h4>个人描述：</h4>
              <el-input :placeholder="tryData.desc" type="textarea"  :rows="4" v-model="userData.desc"/>
          </div>

          <div class="btnDown">
              <input type="file" @change="handleImgTo">
              <img :src="tryData.avatar" alt="" class="img">
              <el-button type="primary" class="btnTrue" @click="handleClick">更换头像</el-button>
          </div>

      </div>

  <el-button type="primary" class="btnToserver" @click="toSetData">提交更改</el-button>

</div>

</template>

<script>
    import axios from 'axios'
    export default {
        name: "usersDetails",
        data(){
          return{
             userData:{
               avatar:"",
               desc:"",
               email:"",
               nickname:""
             },
             tryData:{},
             token:""
          }
        },
      methods:{
        toSetData(){
            this.$axios.put('/user/userInfo',this.userData).then(res => {
              console.log(res)
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: '更改个人信息成功!'
                });
                this.$router.push('/home/users')
              }else {
                this.$notify({
                  title: '错误',
                  message: '更改信息失败！',
                  offset: 100
                });
              }
            })
          },
        getJson(){
          var userJsonStr = sessionStorage.getItem('user')
          this.tryData = JSON.parse(userJsonStr)
          console.log(this.tryData)
        },
        getToken(){
          axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
            console.log('下面是返回的token')
            console.log(res)
            this.token = res.data.data
          })
        },

        handleImgTo(event){
          console.log(event)
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
            console.log(res)
            this.userData.avatar = res.data.url
          })
        },
        handleClick(){
          this.tryData.avatar = this.userData.avatar
        }

        },
       created(){
         this.getJson()
         this.getToken()
       }
    }
</script>

<style scoped lang="scss">
  .btnToserver{
    margin-top: 20px;
    width: 400px;
    margin-left: 450px;
  }
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
  .peopleDetail{
     display: flex;
     justify-content: space-around;
    .content{
      width: 400px;
    }
    .btnDown{
      display: flex;
      flex-direction: column;
    }
    .img{
      margin-top: 10px;
      height: 200px;
      width: 200px;
      border: 1px solid black;
      border-radius: 4px;
    }
    .btnTrue{
      margin-top: 10px;
    }
  }
</style>
