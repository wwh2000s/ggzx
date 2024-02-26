<template>
    <div>
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button @click="addSpu" type="primary" icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU</el-button>
                <el-table border style="margin: 10px 0;" :data="records">
                    <el-table-column label="序号" width="80" type="index" align="center"></el-table-column>
                    <el-table-column label="SKU名称" prop="spuName" align="center"></el-table-column>
                    <el-table-column label="SKU描述" show-overflow-tooltip prop="description"
                        align="center"></el-table-column>
                    <el-table-column label="SPU操作">
                        <template #default="scope">
                            <el-button size="small" type="primary" icon="Plus" title="添加SKU"
                                @click="addSku(scope)"></el-button>
                            <el-button size="small" type="warning" icon="Edit" title="修改SPU"
                                @click="updateSpu(scope)"></el-button>
                            <el-button size="small" type="success" icon="View" title="查看SKU列表"
                                @click="findSku(scope)"></el-button>
                            <el-popconfirm title="确定删除吗？" width="200" @confirm="deleteSpu(scope)">
                                <template #reference>
                                    <el-button size="small" type="danger" icon="Delete" title="删除SPU"></el-button>
                                </template>
                            </el-popconfirm>
                           
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                    background layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
                    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
            <div v-show="scene == 1">
                <spuForm ref="spu" @changeScene="changeScene"></spuForm>
            </div>
            <div v-show="scene == 2">
                <skuForm ref="sku" @changeScene2="changeScene2"></skuForm>
            </div>
            <el-dialog v-model="show" title="SKU列表">
                <el-table border :data="skuArr">
                    <el-table-column label="SKU名字" prop="skuName"></el-table-column>
                    <el-table-column label="SKU价格" prop="price"></el-table-column>
                    <el-table-column label="SKU重量" prop="weight"></el-table-column>
                    <el-table-column label="SKU图片">
                        <template #default="scope, index">
                            <img :src="scope.row.skuDefaultImg" style="width: 100px;height: 100px;;" alt="">
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch,onBeforeUnmount } from 'vue';
import skuForm from './skuForm.vue'
import spuForm from './spuForm.vue'
import useCategoryStore from '@/stores/modules/category';
import { reqHasSpu, reqRemoveSpu, reqSkuList } from '@/api/product/spu'
import type { HasSpuResponseDate, Records } from '@/api/product/spu/type';
import { ElMessage } from 'element-plus';
let show = ref(false)
let spu = ref<any>()
let sku = ref<any>()
let skuArr = ref([])
let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let records = ref<Records>([])
let total = ref<number>()
const getHasSpu = async () => {
    let res: HasSpuResponseDate = await reqHasSpu(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (res.code == 200) {
        records.value = res.data.records
        total.value = res.data.total
    }
    console.log(res)
}
watch(() => categoryStore.c3Id, () => {
    if (!categoryStore.c3Id) return
    getHasSpu()
})
const handleSizeChange = (val: number) => {
    getHasSpu()
    console.log(`${val} 每页数量`)
}
const handleCurrentChange = (val: number) => {
    getHasSpu()
    console.log(`当前页: ${val}`)
}
const addSpu = () => {
    scene.value = 1
    spu.value.initAddSpu()
}
const deleteSpu =async (scope:any)=>{
    let res:any = await reqRemoveSpu(scope.row.id)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasSpu()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
    console.log(res)
}
const updateSpu = (scope: any) => {
    scene.value = 1
    spu.value.initHasSpuData(scope.row)
}
const addSku = (scope: any) => {
    scene.value = 2
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, scope)
}
const findSku = async (scope: any) => {
    let res: any = await reqSkuList(scope.row.id)
    if (res.code == 200) {
        skuArr.value = res.data
        show.value = true
    }
}
const changeScene = (v: number) => {
    scene.value = v
    //console.log('子传父')
    getHasSpu()
}
const changeScene2 = (v: number) => {
    scene.value = v

}
onBeforeUnmount(()=>{
    categoryStore.$reset()
})
</script>

<style scoped></style>