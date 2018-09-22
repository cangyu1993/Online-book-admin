<template>
      <div>
        <el-form  label-width="80px" size="medium " class="formStyle">
          <el-form-item label="图书地址">
            <el-input v-model="bookData.url"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="bookData.author"></el-input>
          </el-form-item>
          <el-form-item label="头图">
            <el-switch
              v-model="choice"
              active-text="IMG-URl"
              inactive-text="手动上传">
            </el-switch>

            <el-input v-model="bookData.img" v-if="choice" placeholder="请输入IMG-URI"></el-input>
            <uploading  @ImgToThere="imgGetHere" v-else/>
            <img :src="bookData.img"
                 style="width: 100px;
                 height: 100px;
                 display: block;
                 border: 0 dashed #d9d9d9;
                 border-radius: 6px;
                 margin-top: 10px;
                 "
                 v-if="bookData.img"
            >

          </el-form-item>
          <el-form-item label="分类">


            <el-select v-model="value" placeholder="请选择" @visible-change="getSort" @change="getSortId" >
              <el-option
                v-for="(item,index) in sortData"
                :key="index"
                :value="item.title">
                <span style="float: left">{{ item.title }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.books.length }}</span>
              </el-option>
            </el-select>


          </el-form-item>
        </el-form>
        <el-button @click="enterToAdd" type="primary" round class="btn">确定添加</el-button>
      </div>
</template>

<script>
    import uploading from '@/components/uploading'
    export default {
        name: "index",
        components:{
          uploading,
        },
        data(){
          return{
            bookData:{
              url:"",
              author:"",
              img:"",
              typeId:""
            },
            sortData:[],
            choice:true,
            value:""
          }
        },
      methods:{
        getSort() {
          this.$axios.get('/category', {pn: 1, size: 100}).then(res => {
            console.log(res)
            this.sortData = res.data
          })
        },
        getSortId(index) {
          this.sortData.forEach(item => {
            if (item.title = index) {
              return this.bookData.typeId = item._id
            }
          })
        },
        enterToAdd(){
          console.log(this.bookData)
          this.$axios.post(`/book`,this.bookData).then(res=>{
            if (res.code==200){
              console.log(res)
              this.$message.success(res.msg)
              this.$router.push("/home/sortList")
            } else {
              this.$message.error("添加失败")
            }
          }).catch(err=>{
            this.$message.error("添加失败")
          })
        },
        imgGetHere(child){
          this.bookData.img = child
        }
      }
    }
</script>

<style scoped lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .formStyle{
    width: 400px;
  }
  .btn{
    margin-left: 100px;
  }
</style>
