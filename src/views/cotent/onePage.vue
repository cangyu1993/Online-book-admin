<template>
    <div>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
      <el-rate v-model="value1"></el-rate>
    </div>
</template>

<script>
    export default {
        name: "onePage",
        data() {
        return {
          value1: null,
        }
      }
    }
</script>

<style scoped>

</style>
