<template>
    <el-form label-width="100">
        <el-form-item label="SKU名称">
            <el-input v-model="spuParams.spuName" placeholder="请输入SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="SKU品牌">
            <el-select v-model="spuParams.tmId" style="width: 240px" placeholder="请选择品牌">
                <el-option v-for="(item, index) in allTradeMark" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>

            </el-select>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input type="textarea" v-model="spuParams.description" placeholder="请输入SKU描述"></el-input>
        </el-form-item>
        <el-form-item label="SKU图片">
            <el-upload v-model:file-list="imageList" action="/api/admin/product/fileUpload" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="handlerUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>

            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-select v-model="saleAttrIdAndValueName" style="width: 240px" placeholder="请选择属性">
                <el-option :value="`${item.id}:${item.name}`" v-for="(item, index) in unSelectSaleAttr" :key="item.id"
                    :label="item.name"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" :disabled="saleAttrIdAndValueName ? false : true" style="margin: 0 10px ;"
                type="primary" icon="Plus">添加属性值</el-button>
            <el-table border :data="saleArr" style="margin: 10px 0;">
                <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
                <el-table-column label="属性名" prop="saleAttrName" width="120"></el-table-column>
                <el-table-column label="属性值">
                    <template #default="scope, index">
                        <el-tag style="margin:0px 5px" @close="scope.row.spuSaleAttrValueList.splice(index, 1)"
                            v-for="(item, index) in scope.row.spuSaleAttrValueList" :key="scope.row.id" class="mx-1"
                            closable>
                            {{ item.saleAttrValueName }}
                        </el-tag>
                        <el-input @blur="toLook(scope)" v-model="scope.row.saleAttrValue" v-if="scope.row.flag == true"
                            placeholder="请输入属性值" size="small" style="width: 100px;"></el-input>
                        <el-button @click="toEdit(scope)" v-else type="primary" size="small" icon="Plus"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="120">
                    <template #default="scope, index">
                        <el-button type="primary" size="small" icon="Delete" @click="saleArr.splice(index, 1)"></el-button>
                    </template>

                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="SKU名称">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { reqAddOrUpdateSpu, reqAllSaleAttr, reqAllTrademark, reqSpuHasSaleAttr, reqSpuImageList } from '@/api/product/spu';
import type { AllTradeMark, SaleAttrResponseData, SpuHasImg } from '@/api/product/spu/type';
import { reqHasTrademark } from '@/api/product/trademark';
import { ElMessage, type UploadProps, type UploadUserFile } from 'element-plus'
import { ref, computed } from 'vue';

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
//存储已有的spu
let saleAttrIdAndValueName = ref<string>('')
let allTradeMark = ref<any>([])
let imageList = ref<any>([])
let saleArr = ref<any>([])
let allSaleArr = ref<any>([])
let spuParams = ref<any>({
    category3Id: "",//收集三级分类的
    IDspuName: "",//SPu的名字
    description: "",//SPU的描述
    tmId: '',//品牌的ID
    spuImageList: [],
    spusaleAttrList: []
})
// 接收defineEmits
let emit = defineEmits(['changeScene'])
//import { defineEmits } from 'vue';
//const emit = defineEmits()
const cancel = () => {
    emit('changeScene', 0)
    //console.log('点击了取消')
}
const initHasSpuData = async (spu: any) => {
    spuParams.value = spu

    let res: AllTradeMark = await reqAllTrademark()
    let res1: SpuHasImg = await reqSpuImageList(spu.id)
    let res2: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id)
    let res3 = await reqAllSaleAttr()

    allTradeMark.value = res.data
    imageList.value = res1.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    saleArr.value = res2.data
    allSaleArr.value = res3.data

}
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}
const handlerUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        return true;
    } else {
        return false
    }
}
const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
}
let unSelectSaleAttr = computed(() => {
    let unSelectArr = allSaleArr.value.filter((item: any) => {
        return saleArr.value.every((item1: any) => {
            return item.name != item1.saleAttrName
        })
    })
    return unSelectArr
})
const addSaleAttr = () => {
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':');
    //准备一个新的销售属性对象:将来带给服务器即可
    let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    //追加到数组当中
    saleArr.value.push(newSaleAttr);
    //清空收集的数据
    saleAttrIdAndValueName.value = '';
}
const toEdit = (scope: any) => {
    scope.row.flag = true
    scope.row.saleAttrValue = ''
}
const toLook = (scope: any) => {
    const { baseSaleAttrId, saleAttrValue } = scope.row
    let newSaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }

    if (saleAttrValue.trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
    let repeat = scope.row.spuSaleAttrValueList.find((item: any) => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return
    }
    scope.row.spuSaleAttrValueList.push(newSaleAttrValue)
    scope.row.flag = false

}
const save = async () => {
    spuParams.value.spuImageList = imageList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data || item.url)
        }
    })
    spuParams.value.spusaleAttrList = saleArr.value
    console.log(spuParams.value)
    let res = await reqAddOrUpdateSpu(spuParams.value);
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '保存成功'
        })
    }
    emit('changeScene', 0)
    //console.log(res)
}
const initAddSpu = async (c3Id: number | string) => {
    Object.assign(spuParams.value, {
        category3Id: "",//收集三级分类的
        spuName:"",
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spusaleAttrList: []
    })
    imageList.value=[]
    saleArr.value=[]
    saleAttrIdAndValueName.value=''
    spuParams.value.category3Id = c3Id
    let res: AllTradeMark = await reqAllTrademark()
    let res3 = await reqAllSaleAttr()
    allTradeMark.value = res.data
    allSaleArr.value = res3.data
}
//对外暴漏
defineExpose({ initHasSpuData, initAddSpu })
</script>

<style scoped></style>