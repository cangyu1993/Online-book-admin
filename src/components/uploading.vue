<template>
    <div class="img">
      <label>
        <i class="el-icon-plus"></i>
        <input type="file" style="display: none" @change="getImgUrl">
      </label>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "uploading",
        data(){
         return{
           token:''
         }

        },
      methods:{
        getToken() {
          axios.get('http://upload.yaojunrong.com/getToken').then(res => {
            this.token = res.data.data
          })
        },
        getImgUrl(event){
          let file = event.target.files[0]
          let formData = new FormData()
          formData.append('file', file, 'file')
          formData.append('token', this.token)
          axios.post('https://upload-z1.qiniup.com', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              // 'Content-Type':'application/x-www-form-urlencoded',
              // 'Content-Type':'application/json'
            }
          }).then(res => {
            this.$emit('ImgToThere',res.data.url)
          })
        }
      },
      created(){
          this.getToken()
      }
    }
</script>

<style scoped lang="scss">
   .img{
     position: relative;
     width: 150px;
     height: 150px;
     margin-top: 10px;
     border: 1px dashed #d9d9d9;
     border-radius: 6px;
     position: relative;
     overflow: hidden;
     .el-icon-plus{
       font-size: 25px;
       font-weight: normal;
       display: block;
       padding: 90px;
       cursor: pointer;
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
     }
   }
  .img:hover{
    border: 1px dashed #409EFF;
  }
</style>
