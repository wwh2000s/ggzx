import {defineStore} from 'pinia'
import {reqC1, reqC2, reqC3} from '../../api/product/attr'
import type { categoryResponseDate } from '@/api/product/attr/type'
import type {CategoryState} from './types/type'
let useCategoryStore = defineStore('category',{
    state:():CategoryState=>{
        return {
            c1Arr:[],
            c1Id:'',
            c2Arr:[],
            c2Id:'',
            c3Arr:[],
            c3Id:'',
        }
    },
    actions:{
        async getC1(){
           let res:categoryResponseDate = await reqC1()
           if(res.code==200){
            this.c1Arr = res.data      
           }   
        },
        async getC2(){
            let res:categoryResponseDate = await reqC2(this.c1Id)
            if(res.code==200){
                this.c2Arr = res.data      
            }    
        },
        async getC3(){
            let res:categoryResponseDate = await reqC3(this.c2Id)
            if(res.code==200){
                this.c3Arr = res.data
                //console.log(res)      
            }    
        }
    },
    getters:{

    }
})
export default useCategoryStore