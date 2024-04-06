<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" ref="loginForms" :model="loginForm" :rules="rules">
                    <h1>Hellow</h1>
                    <h2>欢迎来到硅谷</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" show-password v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="login" class="login_btn" type="primary" size="default">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive } from 'vue';
import useUserStore from '@/stores/modules/user'

import { ElMessage } from 'element-plus';
import { reqLogin } from '@/api/user';
import { useRouter } from 'vue-router';
const router = useRouter()
let useStore = useUserStore();
let loginForm = reactive({
    username: 'admin',
    password: '111111'
})
let rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, max: 8, message: '账号长度为3到8', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 3, max: 10, message: '密码长度为3到0', trigger: 'blur' },
    ]
}
let token = ref('')
let loginForms = ref();
const login = async () => {
    await loginForms.value.validate(async (value:boolean) => {
        if (value) {
            try {
                // await useStore.userLogin(loginForm); 
                const res = await reqLogin(loginForm)  
                if (res.code == 200) {
                    token.value = (res.data as string)
                    localStorage.setItem('TOKEN', (res.data as string))
                    router.push('/home')  
                }         
                console.log(res)   
                ElMessage({
                    type: 'success',
                    message: '登陆成功'
                })
            } catch (error) {
                console.log(error)
            }
        } else {
            ElMessage({
                type: 'error',
                message: '表单校验失败'
            })
        }
    })
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('../../assets/images/background.jpg') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 80%;
        top: 20vh;
        background: url('@/assets/images/login_form.png') no-repeat;
        background-size: cover;
        padding: 40px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            font-size: 20px;
            color: white;
            margin: 20px 0;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>