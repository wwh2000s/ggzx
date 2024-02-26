<template>
    <div class="box1">
        <div class="title">
            <p>男女比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="sex">
            <div class="man">
              
                <img src="../../images/man.png" alt="">
            </div>
            <div class="women">
               
                <img src="../../images/woman.png" alt="">
            </div>

        </div>
        <div class="rate">
            <p>男士58%</p>
            <p>女士42%</p>
        </div>
        <div class="charts" ref="charts2">

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
let charts2=ref()
onMounted(()=>{
    let myecharts = echarts.init(charts2.value)
    myecharts.setOption({
        title:{
            text:'男女比例',
            textStyle:{
                color:'skyblue'
            },
            left:'40%'   
        },
        xAxis:{
            show:false
        },
        yAxis:{
            show:false,
            type:'category'
        },
        series:[
            {
                type:'bar',
                data:[58],
                barWidth:15
             
            },
            {
                type:'bar',
                data:[42],
                barWidth:15
             
            },

        ],
        grid:{
       
        }
    })
})




</script>

<style scoped lang="scss">
.box1 {
    width: 100%;
    height: 100%;
    background: url('../../images/dataScreen-main-cb.png') no-repeat;
    background-size: cover;
    margin: 20px 0;

    .title {
        margin-left: 20px;

        p {
            color: white;
            font-size: 20px;
        }
    }

    .sex {
        display: flex;
        justify-content: center;

        .man {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/man-bg.png') no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .women {
            margin: 20px;
            width: 111px;
            height: 115px;
            background: url('../../images/women-bg.png') no-repeat;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
    .rate{
        display:flex;
        justify-content:space-around;
        color:white;
    }
    .charts{
        width: 100%;
        height: 100px;
        
    }
}</style>