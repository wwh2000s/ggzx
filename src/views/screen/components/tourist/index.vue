<template>
    <div class="box">
        <div class="top">
            <p class="title">实时游客统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span style="color:red;">999999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="charts" ref="charts">

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
import 'echarts-liquidfill'
let charts = ref()
let people = ref('2169080')
onMounted(() => {
    let myecharts = echarts.init(charts.value)
    myecharts.setOption({
        title: {
            text: '水球图'
        },
        xAxis: {},
        yAxis: {},
        series: {
            type: 'liquidFill',
            data: [0.6, 0.4, 0.2, 0.3],
            waveAnimation: true,//动画
            animationDuration: 3,
            animationDurationUpdate: 0, 
            radius: '100%'

        },
        grid: {
            left: 0,
            bottom: 0,
            top: 0,
            right: 0
        }
    })
})
</script>

<style scoped lang="scss">
.box {
    background: url('../../images/dataScreen-main-lb.png') no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;

    .top {
        margin-left: 20px;

        .title {
            color: white;
            font-size: 20px;

        }

        .bg {
            width: 60px;
            height: 7px;
            background: url('../../images/dataScreen-title.png') no-repeat;
            background-size: cover;
            margin-top: 10px;

        }

        .right {
            float: right;
            color: white;
            font-size: 16px;

            .span {
                color: yellowgreen;
            }
        }
    }

    .number {
        padding: 10px;
        margin-top: 35px;
        display: flex;

        span {
            text-align: center;
            flex: 1;
            height: 45px;
            line-height: 45px;
            background: url('../../images/total.png') no-repeat;
            background-size: cover;
            color: #29fcff;
        }
    }

    .charts {
        width: 100%;
        height: 250px;
    }
}
</style>