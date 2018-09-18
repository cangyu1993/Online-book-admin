<template>
  <div class="allPage">
    <h1 class="title">>>>>>>添加管理员页面</h1>
    <div class="demo-input-size">

      <p class="titleInput">请输入用户名:</p>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="userData.username">
      </el-input>

      <p class="titleInput">请输入密码:</p>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="userData.password" type="password">
      </el-input>

      <p class="titleInput">请输入个人描述：</p>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="userData.desc">
      </el-input>

      <p class="titleInput">请输入个人邮箱：</p>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="userData.email">
      </el-input>

      <p class="titleInput">请输入个人昵称：</p>
      <el-input
        size="medium"
        placeholder="请输入内容"
        suffix-icon="el-icon-date"
        v-model="userData.nickname">
      </el-input>

    </div>

    <div class="headerImg">
      <p class="img-top">点击上传头像:</p>
      <input type="file" class="img_header" @change="handleImgTo">
      <img :src="userData.avatar" class="img_001">
      <el-button type="primary" class="ing_btn" @click="upToNewImg">上传头像</el-button>
    </div>
    <el-button type="primary" class="bit-on" @click="handleClickTo">注册管理员</el-button>
   </div>
</template>

<script>
    import axios from 'axios'
    export default {
      name: "twoPage",
      data() {
        return {
          userData:{
            username: '',
            password: '',
            desc: '',
            avatar:'http://img18.3lian.com/d/file/201709/21/7cf4b7be5d7b2a21cbeabbffc55ce770.jpg',
            email: '',
            nickname: '',
          },
          token:''
        }
      },
      methods: {
        handleClickTo(){
          this.$axios.post('/user',this.userData).then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '注册成功!'
            });
            setTimeout(()=>{
              this.$router.push('/home/users')
            },1000)
          })
        },
        // 获取token
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
        upToNewImg(){
          this.$message({
            type: 'success',
            message: '上传头像成功!'
          });
        }
      },
      created(){
        this.getToken()
      }

    }
</script>

<style scoped lang="scss">
   .allPage{
     position: relative;
    .title{
      font-weight: 400;
      font-size: 24px;
    }
    .demo-input-size{
      width: 500px;
      .titleInput{
        padding: 15px 10px;
      }
    }
    .bit-on{
      margin-top: 10px;
      width: 100%;
    }
    .headerImg{
      position: absolute;
      top: 70px;
      left: 820px;
      display: flex;
      flex-direction: column;

      .img_001{
        width: 200px;
        height: 200px;
        margin: 10px 0;
        border: 1px solid #111111;
        border-radius: 6px;
      }
      .ing_btn{
        width: 100px;
        font-size: 12px;
      }
    }
  }
</style>
