<template>
   <div>
     <!--<text_2>我的按钮</text_2>-->
     <text_3/>
   </div>
</template>

<script>
  import text_2 from "./text_2"
  import text_3 from "./text_3"
  export default {
    components:{
      text_2,
      text_3,
    },
    data(){
      return{
        msg:"父组件的按钮"
      }
    }

  }
</script>

<style scoped lang="scss">

</style>
