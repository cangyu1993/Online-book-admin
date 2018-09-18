<template>
    <div>
      <h1 class="title">>>>>>>添加分类页</h1>
      <div class="breadcrumb" >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/onePage' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item >添加分类</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="mainContent">
        <input type="text" v-model="needData.title" placeholder="请输入需要添加的分类名：" class="nameTitle">
        <input type="file" @change="handleImgTo">
        <img :src="needData.icon" alt="" class="icon">
      </div>
       <el-button type="primary" class="btn" @click="handleClick">添加分类</el-button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "index",
        data(){
          return{
            needData:{
              title:"",
              icon:'http://img18.3lian.com/d/file/201709/21/7cf4b7be5d7b2a21cbeabbffc55ce770.jpg'
            },
            token:""
          }
        },
      methods:{
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
            this.needData.icon = res.data.url
          })
        },
        handleClick(){
          this.$axios.post('/category',this.needData).then(res=>{
            console.log(res)
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '添加分类成功!',
              });
              this.$router.push('/home/sortList')
            }else {
              this.$message({
                type: 'error',
                message: '添加分类失败!'
              });
            }
          })
        }
      },
      created(){
        this.getToken()
      }

    }
</script>

<style scoped lang="scss">
     .breadcrumb{
       padding: 10px 0;
     }
     .title{
       font-weight: 400;
       font-size: 20px;
     }
     .mainContent{
        padding-left: 20px;
        display: flex;
        flex-direction: column;
       .icon{
         width: 200px;
         height: 200px;
         margin: 10px 0;
         border: 1px solid #111111;
         border-radius: 6px;
       }
       .nameTitle{
         width: 200px;
         padding: 5px 0;
         margin: 10px 0;
       }
       .btn{
         margin: 0 10px;
         width: 100%;
       }
     }
</style>
