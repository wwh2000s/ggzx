<template>
    <div class="box2">
        <div class="title">
            <p>年龄比例</p>
            <img src="../../images/dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts3">

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from 'echarts'
let charts3=ref()

let option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: 40,
    right: 10, 
    orient:'vertical',
    textStyle:{
        color:'white',
        fontSize:14
    }
  },
  series: [
    {
      name: '年龄比例',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside',
        color:'white'
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '20岁' },
        { value: 735, name: '30岁' },
        { value: 580, name: '0-10岁' },
        { value: 484, name: '30-50岁' },
        { value: 300, name: '50-100岁' }
      ]
    }
  ],
  grid:{
    left:0,
    top:0,
    bottom:0,
    right:0
  }
};

onMounted(()=>{
    let myecharts = echarts.init(charts3.value)
    myecharts.setOption(option)
})

</script>

<style scoped lang="scss">
.box2 {
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
    .charts{
        height:260px;    
    }
}
</style>