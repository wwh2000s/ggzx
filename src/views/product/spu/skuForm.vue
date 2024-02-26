<template>
  <el-form label-width="80px">
    <el-form-item label="SKU名称">
        <el-input v-model="skuParams.skuName" style="width: 350px;" placehoder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)">
        <el-input v-model="skuParams.price" style="width: 350px;" placehoder="价格(元)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
        <el-input v-model="skuParams.weight" style="width: 350px;" placehoder="重量(g)" type="number"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
        <el-input v-model="skuParams.skuDesc" style="width: 350px;" placehoder="SKU描述"></el-input>
    </el-form-item>
    <el-form-item label="平台属性:">
        <el-form  :inline="true" label-position="right"
        label-width="80px">
            <el-form-item :label="item.attrName" v-for="(item,index) in attrArr" :key="item.id">
                <el-select v-model="item.attrIdAndValueId" style="width:130px;margin: 5px 0;">
                    <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue,index) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"> </el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-form-item>
    <el-form-item label="销售属性:">
        <el-form  :inline="true" label-position="right"
        label-width="80px">
            <el-form-item :label="item.saleAttrName" v-for="(item,index) in saleArr" :key="item.id">
                <el-select v-model="item.saleIdAndValueId"   style="width:130px;margin: 5px 0;">
                    <el-option :value="`${item.id}:${saleAttrValue.id}`" v-for="(saleAttrValue,index) in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"> </el-option>
                </el-select>
            </el-form-item>

        </el-form>
    </el-form-item>
    <el-form-item label="图片名称:">
        <el-table :data="imgArr" ref="table">
            <el-table-column type="selection" width="80" align="center"></el-table-column>
            <el-table-column label="图片">
                <template #default="scope,index">
                    <img class="imgs" :src="scope.row.imgUrl" alt="">
                </template> 
            </el-table-column>
            <el-table-column label="名称"  prop="imgName"></el-table-column>
            <el-table-column label="操作">
                <template #default="scope,index">
                    <el-button size="small" type="primary" @click="handler(scope)">设置默认</el-button>
                </template> 
            </el-table-column>
        </el-table>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reqAttr } from '@/api/product/attr';
import { ref,reactive, handleError } from 'vue';
import { reqSpuImageList,reqSpuHasSaleAttr, reqAddSku } from '@/api/product/spu';
import { ElMessage } from 'element-plus';

let skuParams=reactive({
    //父组件传递过来的数据
    "category3Id": "",//三级分类的ID
    "spuId":"",//已有的SPU的ID
    "tmId":"",//SPU品牌的ID
    "skuName": "",
    "price": "",
    "weight":"",
    "skuDesc": "",
    "skuAttrValueList": [],
    "skuSaleAttrValueList":[],
    "skuDefaultImg":"",
})
let emit = defineEmits(['changeScene2'])
//平台属性
let attrArr = ref<any>([])
//销售属性
let saleArr = ref<any>([])
//照片数据
let imgArr = ref<any>([])

let table =ref<any>()

const initSkuData = async (c1Id:number|string,c2Id:number|string,scope:any)=>{
    skuParams.category3Id=scope.row.category3Id
    skuParams.spuId=scope.row.id
    skuParams.tmId=scope.row.tmId
    let res = await reqAttr(c1Id,c2Id,scope.row.category3Id)
    let res1 = await reqSpuHasSaleAttr(scope.row.id)
    let res2 =await reqSpuImageList(scope.row.id)
    attrArr.value=res.data
    saleArr.value=res1.data
    imgArr.value=res2.data
    
}
const handler = (scope:any)=>{
    imgArr.value.forEach((item:any) => {
          //复选框选中
         table.value.toggleRowSelection(item,false)
    });
    table.value.toggleRowSelection(scope.row,true)

    skuParams.skuDefaultImg=scope.row.imgUrl
}
const save = async ()=>{
    let attrArrs =attrArr.value.reduce((prev:any,next:any)=>{
        if(next.attrIdAndValueId){
            let [attrId,valueId] = next.attrIdAndValueId.split(':')
            prev.push({
                attrId,
                valueId
            })
        }
        return prev
    },[]);
    skuParams.skuAttrValueList=attrArrs
    let saleArrs =saleArr.value.reduce((prev:any,next:any)=>{
        if(next.saleIdAndValueId){ 
            let [saleAttrId,saleAttrValueId] = next.saleIdAndValueId.split(':')
            prev.push({
                saleAttrId,
                saleAttrValueId
            })
        }
        return prev
    },[])
    skuParams.skuSaleAttrValueList=saleArrs
    let res = await reqAddSku(skuParams)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'添加成功'
        })
        emit('changeScene2',0)
    }else{
        ElMessage({
            type:'error',
            message:'添加失败'
        })
    }
    //console.log(res)
}
const cancel =()=>{
    emit('changeScene2',0)
}
defineExpose({
    initSkuData
})
</script>

<style scoped>
.imgs{
    width: 100px;
    height: 100px;
}
</style>