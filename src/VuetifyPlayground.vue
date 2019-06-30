<template>
    <div class="">
      <login-page></login-page>
    </div>
</template>

<script>
import LoginPage from './LoginPage.vue';
export default {  
  components: {
    LoginPage
  },
  methods:{
  },
    data(){
      return{
        open: false
      }
    }
};
</script>

<style>
    .test{
        background: red;
        border: 1px solid red !important;
    }
    .test-1{
        background: green;
        border: 1px solid green !important;
    }
    .test-2{
        background: blue;
        border: 1px solid blue !important;
    }
</style>
