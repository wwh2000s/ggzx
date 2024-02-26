<template>
    <Category :scene="scene"></Category>
    <el-card style="margin: 10px 0;">
        <div v-show="scene==0">
            <el-button style="width: 100px; margin-bottom: 10px;" :disabled="categoryStore.c3Id ? false : true" type="primary"
                size="default" 
                icon="Plus"
                @click="addAttr"
                >
                添加属性
            </el-button>
            <el-table border style="margin: 5px 0;" :data="attrArr">
                <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
                <el-table-column label="属性名称" prop="attrName" width="120"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #default="scope">
                        <el-tag style="margin: 5px;" v-for="(item, index) in scope.row.attrValueList" :key="item.id">{{
                            item.valueName }}</el-tag>

                    </template>
                </el-table-column>
                <el-table-column label="属性操作" width="120">
                    <template #default="scope">
                        <el-button type="primary" size='small' icon="Edit" @click="editAttr(scope)"></el-button>
                        <el-popconfirm title="是否删除" width="250px" icon="Delete" @confirm="removeAttr(scope.row.id)">
                            <template #reference>
                                <el-button type="danger" size='small' icon="Delete"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="scene==1">
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input v-model="attrParams.attrName" placeholder="请输入属性值"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="addAttrValue" :disabled="attrParams.attrName?false:true" icon="Plus" type="primary" size="default">添加</el-button>
            <el-button type="primary" size="default" @click="cancel">取消</el-button>
            <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
                <el-table-column width="80" label="序号" type="index" align="center"></el-table-column>
                <el-table-column label="属性值名称">
                    <template #default="scope,index">
                        <el-input v-if="scope.row.flag" @blur="toLook(scope,index)"  v-model="scope.row.valueName" placeholder="请输入属性值"></el-input>
                        <div v-else @click="toEdit(scope)">{{ scope.row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="属性值操作">
                    <template #default="scope,index">
                        <el-button size="small" icon="delete" type="danger" @click="attrParams.attrValueList.splice(index,1)"></el-button>
                       
                    </template>
                </el-table-column>
            </el-table>
            <el-button :disabled="attrParams.attrValueList.length>0?false:true" type="primary" size="default" @click="saveAttr">保存</el-button>
            <el-button type="default" size="default" @click="cancel">取消</el-button>
           
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { watch, ref,reactive,onBeforeUnmount } from 'vue'
import useCategoryStore from '@/stores/modules/category'
let categoryStore = useCategoryStore()
let attrArr = ref<Attr[]>([])

let attrParams = reactive<Attr>({
    attrName:'',
    attrValueList:[],
    categoryId:'',
    categoryLevel:3
})
import { reqAttr,reqAddOrUpdate,reqRemoveAttr } from '@/api/product/attr'
import type { AttrResponseDate, Attr } from '@/api/product/attr/type';
import { ElMessage } from 'element-plus';
let scene = ref<number>(0)
watch(() => categoryStore.c3Id, async () => {
    attrArr.value = []
    if (!categoryStore.c3Id) return
    getArr()

})
onBeforeUnmount(()=>{
    categoryStore.$reset()
})
const getArr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    let res: AttrResponseDate = await reqAttr(c1Id, c2Id, c3Id)
    if (res.code == 200) {
        attrArr.value = res.data
    }
    console.log(res)
}
const addAttr = ()=>{
    Object.assign(attrParams,{
        attrName:'',
        attrValueList:[],
        categoryId:categoryStore.c3Id,
        categoryLevel:3
    })
    
    scene.value=1
}
const addAttrValue = () =>{
    attrParams.attrValueList.push({
        valueName:'',
        flag:true
    })
}
const saveAttr= async ()=>{
   let res:any =await reqAddOrUpdate(attrParams)
   if(res.code==200){
    scene.value=0
    ElMessage({
        type:'success',
        message:attrParams.id?'修改成功':'添加成功'
    })
    getArr()
   }else{
    ElMessage({
        type:'error',
        message:attrParams.id?'修改失败':'添加失败'
    })
   }
   //console.log(res)
}
const cancel =() =>{
    scene.value=0
}
const toLook =(scope:any,index:number)=>{
    if(scope.row.valueName.trim()==''){
        attrParams.attrValueList.splice(index,1)
        ElMessage({
            type:'error',
            message:'属性值不能为空'
        })
        return
    }
    let repeat = attrParams.attrValueList.find((item)=>{
        if(item!=scope.row){
            return item.valueName==scope.row.valueName
        }
    })
    if(repeat){
        ElMessage({
            type:'error',
            message:'属性值不能重复'
        })
        return
    }
    scope.row.flag=false
    
}
const toEdit =(scope:any)=>{
    scope.row.flag=true
    
}
const editAttr = (scope:any) => {
    scene.value=1
    Object.assign(attrParams,JSON.parse(JSON.stringify(scope.row)))
}

const removeAttr =  async (scope:any) => {
    let res = await reqRemoveAttr(scope)
    if(res.code==200){
        getArr()
        ElMessage({
            type:'success',
            message:'删除成功'
        })
    }
    
}
</script>

<style scoped></style>