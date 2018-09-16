<template>
    <div class="fristPage">
      <h1 class="title">欢迎来到在线云书后台管理系统</h1>
          <div class="loginBox">
             <h2 class="login-box-title">请登录</h2>
            <el-form class="login-form">
              <el-form-item label="用户名">
                 <el-input v-model="formDate.username" placeholder="请输入用户名："></el-input>
              </el-form-item>
              <el-form-item label="密码">
                 <el-input v-model="formDate.password" type="password" placeholder="请输入密码："></el-input>
              </el-form-item>
            </el-form>
            <el-button @click="handleLogin" type="primary" class="btn"  :loading="isLoading">登陆</el-button>
          </div>
    </div>
</template>

<script>
    export default {
        name: "index",
      data(){
          return{
            formDate:{
              username:"",
              password:""
            },
            isLoading:false
          }
      },
      methods:{
        handleLogin(){
             this.isLoading = true
             this.$axios.post('/login',this.formDate).then(res=>{
                console.log(res)
                if(res.code == 200){
                   this.$message.success('登陆成功')
                   setTimeout(()=>{
                     this.$router.push('/home/onePage')
                   },1000)

                }else {
                  this.$message.error(res.msg)
                }
               this.isLoading=false
             }).catch(err=>{
               this.isLoading=false
             })
        }
      }
    }
</script>

<style scoped lang="scss">
.fristPage{
  height: 100vh;
  background-color: #545c64;
  overflow: hidden;
  .title{
    margin-top: 100px;
    text-align: center;
    color: #fff;
    font-weight: 400;
  }
  .loginBox{
    width: 400px;
    height: 300px;
    border: 1px solid #f1f1f1;
    background-color: #fff;
    border-radius: 6px;
    padding: 40px;
    margin: 0 auto;
    margin-top: 20px;
    .login-box-title{
      text-align: center;
      font-weight: 400;
      color: #333;
    }
    .login-form{
      margin-top: 25px;
    }
    .btn{
      width: 100%;
    }
  }


}
</style>
