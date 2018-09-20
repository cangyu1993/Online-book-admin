<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="peopleDetail">
      <div class="content">
        <h4>用户名：</h4>
        <el-input :placeholder="tryData.username" :disabled="true" />
        <h4>昵称：</h4>
        <el-input placeholder="输入更改的昵称" v-model="tryData.nickname"/>
        <h4>个人邮箱：</h4>
        <el-input placeholder="输入更改的邮箱" v-model="tryData.email"/>
        <h4>个人描述：</h4>
        <el-input placeholder="输入更改的个人描述" type="textarea"  :rows="4" v-model="tryData.desc"/>
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
        name: "onePage",
        data() {
        return {
          value1: null,
          tryData:{},
          userData:{
            avatar:"",
            desc:"",
            email:"",
            nickname:""
          },
          token:""
        }
      },
      methods:{
        toSetData(){

          this.$axios.put('/user/userInfo',this.tryData).then(res => {
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
          var userJsonStr = sessionStorage.getItem('usermsg')
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
        },
        tochangeimg(){
          this.userData.avatar=this.tryData.avatar
        }
      },
      created(){
        this.getJson()
        this.getToken()
        this.tochangeimg()
      }
    }
</script>

<style scoped lang="scss">
   .star{
     margin-top: 10px;
   }
   .peopleDetail{
     display: flex;
     justify-content: space-around;
     .content{
       width: 400px;
       h4{
         padding: 5px 0;
       }
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
   .btnToserver{
     margin-top: 20px;
     width: 400px;
     margin-left: 450px;
   }
</style>
