<template>
    <div class="layout_container">
        <div class="layout_slider" :class="{fold:LayOutSettingStore.fold?true:false}">
            <logo />
            <el-scrollbar class="scrollbar">
                <el-menu class="lay_menu" 
                background-color="#001529" 
                text-color="white"
                :default-active="route.path"
                :collapse="LayOutSettingStore.fold?true:false"
                >
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <div class="layout_tabbar" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Tabbar></Tabbar>
        </div>
        <div class="layout_main" :class="{fold:LayOutSettingStore.fold?true:false}">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Main from './main/index.vue'
import logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/stores/modules/user'
import useLayOutSettingStore from '@/stores/modules/setting'
import { useRoute } from 'vue-router'
let LayOutSettingStore = useLayOutSettingStore();
let route = useRoute()
let userStore = useUserStore();

</script>
<script lang="ts">
export default {
    name: 'Layout'
}
</script>
<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: 260px;
        height: 100vh;
        background: #001529;
        color: white;
        transition: all 0.3s;
        .scrollbar {
            width: 100%;
            height: calc(100vh - 50px);

            .el-menu {
                border-right: none;

            }
        }
        &.fold{
            width: 50px;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - 260px);
        height: 50px;
        top: 0;
        left: 260px;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - 50px);
            left:50px;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - 260px);
        height: calc(100vh - 50px);
        top: 50px;
        left: 260px;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold{
            width: calc(100vw - 50px);
            left:50px;
        }
    }
}
</style>