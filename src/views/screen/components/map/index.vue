<template>
    <div class="box4" ref="map">

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts'
import chinaJSON from './china.json'
let map = ref()
echarts.registerMap('china', chinaJSON as any)
onMounted(() => {
    let myechart = echarts.init(map.value)
    myechart.setOption({
        geo: {
            map: 'china',
            top: 50,
            left: 50,
            right: 50,
            label: {
                show: true,
                color: 'white',
                fontSize: 14
            },
            itemStyle: {
                color: '#677ff4'
            },
            series: [
                {
                    type: 'lines',
                    data: [
                        {
                            coords: [
                                [116.46, 39.87],
                                [116.33, 39.93]
                            ],
                            lineStyle: {
                                color: 'orange',
                                width: 100,
                            },
                     
                        }
                    ]
                }
            ]


        }
    })

})
</script>

<style scoped lang="scss"></style>