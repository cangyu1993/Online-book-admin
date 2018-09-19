<template>

  <div class="comBtn" >
    <el-button  size="mini" @click="changeTodo">修改分类</el-button>
    <el-dialog title="更改分类信息"   :visible.sync="isShow">
      <el-form :model="sortId">

        <el-form-item label="输入更改标题" :label-width="formLabelWidth">
          <el-input v-model="sortId.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="优先数值" :label-width="formLabelWidth">
          <el-input-number v-model="sortId.index" autocomplete="off" :min="1"></el-input-number>
        </el-form-item>

        <el-form-item label="图标" :label-width="formLabelWidth">
          <template>
            <img :src="sortId.icon" alt="" class="icon">
            <input type="file" @change="handleClick">
          </template>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="ToServerChange">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios'
  export default {
    name: "changeSort",
    props:{
      sortId:{
        type:Object
      }
    },
    data() {
      return {
        isShow: false,
        token:"",
        formLabelWidth: '120px'
      };
    },
    methods:{
      changeTodo(){
        this.isShow = true
      },
      ToServerChange(){
        this.$axios.put(`/category/${this.sortId._id}`, this.sortId).then(res=>{
          console.log(res)
          this.isShow = false
          this.$message.success(res.msg)
        })
      },
      handleClick(event){

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
          this.sortId.icon = res.data.url
        })
      },
      getToken(){
        axios.get('http://upload.yaojunrong.com/getToken').then(res=>{
          // console.log('下面是返回的token')
          // console.log(res)
          this.token = res.data.data
        })
      },
      // 判断是否接收到
      // hassortId(){
      //   if (this.sortId) {
      //     console.log(this.sortId)
      //   }
      // }
    },
    created(){
      this.getToken()
      // this.hassortId()
    }


  }
</script>

<style scoped lang="scss">
     .comBtn{
        display: inline-block;
       .icon{
         width: 80px;
         height: 80px;
         border: 1px solid black;
       }
     }

</style>
