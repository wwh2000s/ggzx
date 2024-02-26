<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">
                首页
            </span>
        </div>
        <div class="center">
            <div class="title">
                智慧旅游可视化大数据平台
            </div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref,onMounted,onBeforeUnmount} from 'vue'
import moment from 'moment'
import {useRouter} from 'vue-router'
let router = useRouter()
let time=ref(moment().format('YYYY-MM-DD:hh:mm:ss'))
let timer = ref()
const goHome=()=>{
    router.push('/home')
}
onMounted(()=>{
    timer.value=setInterval(()=>{
        time.value=moment().format('YYYY-MM-DD:hh:mm:ss')

    },1000)
})
onBeforeUnmount(()=>{
    clearInterval(timer.value)
})
</script>

<style scoped lang="scss">
.top{
    width:100%;
    height:40px;
    display:flex;
    .left{
        flex:1;
        background:url('../../images/dataScreen-header-left-bg.png') no-repeat;
        background-size:cover;
        .lbtn{
            width:100px;
            height:40px;
            width:150px;
            float:right;
            background:url('../../images/dataScreen-header-btn-bg-l.png') no-repeat;
            background-size:cover;
            text-align:center;
            line-height:40px;
            color:#29fcff;
            font-size:20px;
        }
    }
    .center{
        flex:2;
        .title{
            width:100%;
            height:74px;
            background:url('../../images/dataScreen-header-center-bg.png') no-repeat;
            background-size:100% 100%;
            text-align:center;
            line-height:74px;
            color:#29fcff;
            font-size:30px;
        }
    }
    .right{
        flex:1;
        background:url('../../images/dataScreen-header-right-bg.png') no-repeat;
        background-size:cover;
        .rbtn{
            width:100px;
            height:40px;
            width:150px;
            float:left;
            background:url('../../images/dataScreen-header-btn-bg-r.png') no-repeat;
            background-size:cover;
            text-align:center;
            line-height:40px;
            color:#29fcff;
            font-size:20px;
        }
        .time{
            text-align:center;
            line-height:40px;
            color:#29fcff;
            font-size:20px;
            margin-left:50px;
        }
    }
}
</style>