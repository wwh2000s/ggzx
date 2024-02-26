<template>
    <router-view></router-view>
</template>

<script setup lang="ts">

import {watch,ref} from 'vue' 
let flag = ref(true)

</script>
<script lang="ts">
export default {
    name: 'Main'
}
</script>
<style scoped>

</style>