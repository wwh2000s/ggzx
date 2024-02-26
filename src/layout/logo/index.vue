<template>
    <div class="logo">
        <img src="../../assets/images/logo.png" alt="">
        <p>硅谷运营平台管理系统</p>
    </div>
</template>

<script setup lang="ts">

</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>
<style scoped lang="scss">
.logo {
    width: 100%;
    height: 50px;
    color: white;
    display: flex;
    align-items: center;
    padding: 5px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: 18px;
        margin-left:10px;
       
    }
}
</style>