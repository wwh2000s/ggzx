<script setup lang="ts">
import { onMounted } from 'vue';
import {reqLogin,reqUserInfo} from '@/api/user'
const data={
  username:'admin',
  password:'111111'
}
// onMounted(()=>{
  // reqLogin(data).then(res=>{
  //   console.log(res)
  // })
  // reqUserInfo().then(res=>{
  //   console.log(res)
  // })
// })


</script>

<template>
  <div class="main">
    <RouterView/>
  </div>
</template>

<style scoped lang="scss"></style>
