<template>
    <el-button type="default" size="small" circle icon="Refresh" @click="updateRefsh"></el-button>
    <el-button type="default" size="small" circle icon="FullScreen"></el-button>
    <el-popover placeholder="bottom" title="主题设置" :width="300" trigger="hover">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" ></el-color-picker>
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch @change="changeDark" v-model="dark"  active-icon="MoonNight" class="mt-2" inline-prompt
                    inactive-icon="Sunny"></el-switch>
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button size="small" circle icon="Setting"></el-button>
        </template>
    </el-popover>

    <img :src="UserStore.avatar" style="width:20px;height:20px;margin:0 10px;border-radius: 50%;" alt="">
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ UserStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item><span @click="logout">退出登录</span></el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useUserStore from '../../../stores/modules/user'
import useLayOutSettingStore from '../../../stores/modules/setting';
import { useRouter } from 'vue-router'
import { ref } from 'vue';
let dark = ref(false)
const color = ref('#409EFF')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
let router = useRouter();
let LayOutSettingStore = useLayOutSettingStore();
let UserStore = useUserStore();

const updateRefsh = () => {
    window.location.reload()
}
const logout = async () => {
    await UserStore.userLogout();
    router.push('/login')
}
const changeDark=()=>{
    let html =document.documentElement
    dark.value?html.className='dark':html.className=''
    
}
</script>
<script lang="ts">
export default {
    name: 'Set'
}
</script>
<style scoped></style>