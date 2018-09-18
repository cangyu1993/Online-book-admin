<template>
    <div>
      <div class="breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/sortList' }">分类列表</el-breadcrumb-item>
          <el-breadcrumb-item>分类详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="details">
        <el-table
          :data="newData"
          border
          style="width: 100%"
          class="tableData"
        >
          <el-table-column
            prop="title"
            label="分类名"
            width="180">
          </el-table-column>

          <el-table-column
            prop="books.length"
            label="该分类下书籍数量"
            width="180">
          </el-table-column>

          <el-table-column
            prop="index"
            label="优先数值"
            width="180">
          </el-table-column>

          <el-table-column
            label="书籍封面">
            <template slot-scope="scope">
              <img :src="scope.row.icon" alt="" class="avatar">
            </template>
          </el-table-column>

        </el-table>
      </div>
    </div>
</template>

<script>
    import bus from '@/views/bus'
    export default {
        name: "index",
        data(){
          return{
            newData:[]
          }
        },
        created(){
          bus.$on('toData',(listData)=>{
            this.newData = listData
            console.log(this.newData)
          })
        }
    }
</script>

<style scoped>

</style>
