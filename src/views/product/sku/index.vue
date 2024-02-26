<template>
    <el-card>
        <el-table style="margin: 10px 0;" :data="skuArr">
            <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
            <el-table-column label="名称" prop="skuName" show-overflow-tooltip width="150px"></el-table-column>
            <el-table-column label="描述" prop="skuDesc" show-overflow-tooltip width="150px"></el-table-column>
            <el-table-column label="默认图片" width="150px">
                <template #default="scope, index">
                    <img :src="scope.row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
                </template>
            </el-table-column>
            <el-table-column label="质量(g)" prop="weight" width="150px"></el-table-column>
            <el-table-column label="价格(元)" prop="price" width="150px"></el-table-column>
            <el-table-column label="操作" width="220px" fixed="right">
                <template #default="scope, index">
                    <el-button size="small" type="primary" :icon="scope.row.isSale == 1 ? 'Bottom' : 'Top'"
                        @click="updateSale(scope)"></el-button>
                    <el-button size="small" type="warning" icon="Refresh" @click="updateSku"></el-button>
                    <el-button size="small" type="primary" icon="InfoFilled" @click="findSku(scope)"></el-button>
                    <el-popconfirm title="是否确认删除？" width="200px" @confirm="removeSku(scope)">
                        <template #reference>
                            <el-button size="small" type="danger" icon="Delete"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]" background
            layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        <el-drawer ref="drawerRef" v-model="drawer" title="商品详情" 
         class="demo-drawer">
          <template #default>
            <el-row style="margin: 10px 0;">
                <el-col :span="6">名称</el-col>
                <el-col :span="18">{{ skuInfo.skuName }}</el-col>
            </el-row>
            <el-row style="margin: 10px 0;">
                <el-col :span="6">描述</el-col>
                <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
            </el-row>
            <el-row style="margin: 10px 0;">
                <el-col :span="6">价格</el-col>
                <el-col :span="18">{{ skuInfo.price }}</el-col>
            </el-row>
            <el-row style="margin: 10px 0;">
                <el-col :span="6">平台属性</el-col>
                <el-col :span="18">
                    <el-tag style="margin: 5px;" v-for="item1 in skuInfo.skuAttrValueList" :key="item1.id">{{ item1.attrName }}</el-tag>
                </el-col>
            </el-row>
            <el-row style="margin: 10px 0;">
                <el-col :span="6">销售属性</el-col>
                <el-col :span="18">
                    <el-tag style="margin: 5px;" v-for="item2 in skuInfo.skuSaleAttrValueList" :key="item2.id">{{ item2.saleAttrName}}</el-tag>
                </el-col>
            </el-row>
            <el-row style="margin: 10px 0;">
                <el-col :span="6">商品图片</el-col>
                <el-col :span="18">
                    <el-carousel :interval="4000" type="card" height="200px">
                        <el-carousel-item v-for="item3 in skuInfo.skuImageList" :key="item3.id">
                        <img style="width: 100%;height: 100%;" :src="item3.imgUrl" alt="">
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
          </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { reqSkuList, reqCancelSku, reqSaleSku, reqSkuInfo, reqRemoveSku } from '@/api/product/sku';
import { ElMessage } from 'element-plus';
import { ref, onMounted } from 'vue'
let skuArr = ref([])
let total = ref<number>(0)
let drawer =ref<boolean>(false)
const pageNo = ref(1)
const pageSize = ref(5)
const getHasSku = async (pager = 1) => {
    pageNo.value = pager
    let res: any = await reqSkuList(pageNo.value, pageSize.value)
    if (res.code == 200) {
        total.value = res.data.total
        skuArr.value = res.data.records
    }
    //console.log(res)
}
onMounted(() => {
    getHasSku()
})
const updateSale = async (scope: any) => {
    if (scope.row.isSale == 1) {
        let res: any = await reqCancelSku(scope.row.id)
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '下架成功'
            })
            getHasSku()
        } else {
            ElMessage({
                type: 'error',
                message: '下架失败'
            })
        }
    }
    else if (scope.row.isSale == 0) {
        let res: any = await reqSaleSku(scope.row.id)
        if (res.code == 200) {
            ElMessage({
                type: 'success',
                message: '上架成功'
            })
            getHasSku()
        } else {
            ElMessage({
                type: 'error',
                message: '上架失败'
            })
        }
    }
    else {
        ElMessage({
            type: 'error',
            message: '操作失败'
        })
    }
}
const updateSku = () => {
    getHasSku()
    ElMessage({
        type: "success",
        message: "更新完毕"
    })
}
const handleSizeChange = (val: number) => {
    getHasSku()
    console.log(`${val} 每页个数`)
}
const handleCurrentChange = (val: number) => {
    pageNo.value = val
    getHasSku(pageNo.value)
    console.log(`当前页数: ${val}`)
}
const skuInfo=ref<any>()
const findSku =async (scope:any)=>{
    let res:any = await reqSkuInfo(scope.row.id)
    if(res.code==200){
        skuInfo.value=res.data
    }
    //console.log(res)
    drawer.value=true
}
const removeSku = async (scope:any)=>{
    let res:any = reqRemoveSku(scope.row.id)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasSku()
    }else{
        ElMessage({
            type:'error',
            message:'系统数据不能删除'
        })
    }
   
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>