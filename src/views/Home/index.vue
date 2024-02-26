<template>
    <el-card>
        <div class="box">
            <img :src="userStore.avatar" alt="" class="avatar">
            <div class="bottom">
                <h3 class="title">{{ userStore.username }}</h3>
                <p class="subtitle">硅谷甄选运营平台</p>
            </div>
        </div>   
    </el-card>
    <div class="bottoms">
    <svg-icon name="welcome" width="600px" height="300px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import useUserStore from '@/stores/modules/user';
let userStore = useUserStore();
onMounted(() => {
    userStore.userInfo();
})
</script>

<style scoped lang="scss">
.box {
    display: flex;

    .avatar {
        width: 100px;
        height: 100px;
        border-radius: 50%;
    }
    
    .bottom{
        margin-top: 20px;
        margin-left: 10px;
        .title{
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        }
        .subtitle{
            font-style: italic;
            color:aqua
        }
      
    }

}
.bottoms{
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>