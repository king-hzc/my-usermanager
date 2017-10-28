<template>
  <p v-text="msg"></p>
</template>
<script>
  export default ({
    data () {
      return {
        msg: '找不到页面'
      }
    }
  })
</script>
<style>
  p{
    position: absolute;
    text-align: center;
  }
</style>
