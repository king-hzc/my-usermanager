<template>
  <h1 v-text="msg"></h1>
</template>
<script>
  export default ({
    data () {
      return {
        msg: '欢迎'
      }
    }
  })
</script>
<style>
  h1{
    text-align: center;
  }
</style>
