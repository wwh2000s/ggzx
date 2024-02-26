<template>
    <el-icon style="margin-right:10px;" @click="changeIcon">
        <component :is="fold?'Fold':'Expand'"></component>
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon>
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span style="margin: 0 5px;">{{ item.meta.title }}</span>
        </el-breadcrumb-item>

    </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useLayOutSettingStore from '../../../stores/modules/setting'
import { ref } from 'vue';
import { useRoute } from 'vue-router';
let route = useRoute();
let LayOutSettingStore = useLayOutSettingStore();
let fold = ref(false)
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold
}


</script>
<script lang="ts">
export default {
    name: 'Breadcrumb'
}
</script>
<style scoped></style>