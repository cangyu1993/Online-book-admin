<template>
    <button class="my-btn">
      <slot></slot>
    </button>
</template>

<script>
    export default {
        name: "text_2",
        props:{
          text :String
        }
    }
</script>

<style scoped>
  .my-btn{
    -webkit-appearance: none;
    line-height: 1;
    color: #343434;
    font-size: 14px;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 12px 20px;
    background: #fff;
  }
  .my-btn:active{
    background-color: #409eff;
    color: #fff;
  }
</style>
