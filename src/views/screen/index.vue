<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top></Top>
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="tourist"/>
                    <Sex class="sex"/>
                    <Age class="age"/>
                </div>
                <div class="center">
                    <Map class="map"></Map>
                    <Line class="line"></Line>
                </div>
                <div class="right">
                    <Rank class="rank"></Rank>
                    <Year class="year"></Year>
                    <Counter class="count"></Counter>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Sex from './components/sex/index.vue'
import Age from './components/age/index.vue'
import Map from './components/map/index.vue'
import Line from './components/line/index.vue'
//引入右侧三个子组件
import Rank from './components/rank/index.vue';
import Year from './components/year/index.vue';
import Counter from './components/couter/index.vue'
let screen = ref()
onMounted(() => {
    screen.value.style.transfrom=`scale(${getScale()})`
})

function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w
    const wh = window.innerHeight / h
    return ww < wh ? ww : wh
}
window.onresize=()=>{
    screen.value.style.transfrom=`scale(${getScale()})`
}


</script>

<style scoped lang="scss">
.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;
    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;

        transform-origin: top left;
        transform: translate(-50%,-50%);
        .top{
            width: 100%;
            height: 40px;
        }
        .bottom{
            display: flex;
            .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                margin-left: 40px;

                .rank {
                    flex: 1.5;
                }

                .year {
                    flex: 1;

                }

                .count {
                    flex: 1;
                }
            }

            .center{
                flex: 2;
            }
            .left{
                flex: 1;
                height:1040px;
                display: flex;
                flex-direction: column;
                .tourist{
                    flex:1.3;
                    
                }
                .sex{
                    flex: 1;
                   
                }
                .age{
                    flex:1;

                }

            }
        }
        .center{
            flex:2;
            display: flex;
            flex-direction: column;
            .map{
                flex:3;     
            }
            .line{
                flex: 1.3;             
            }
        }
        
    }
}
</style>
