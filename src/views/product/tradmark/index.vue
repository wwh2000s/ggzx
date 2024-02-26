<template>
    <el-card class="box-card">
        <el-button type="primary" icon="Plus" size="default" @click="addMark">添加品牌</el-button>
        <el-table border style="margin: 10px 0;" :data="trademarkArr">
            <el-table-column label="序号" width="80" align="center" prop="id" />
            <el-table-column label="品牌名称" key="slot" align="center">
                <template #default="scope">
                    {{ scope.row.tmName }}
                </template>
            </el-table-column>
            <el-table-column label="品牌LOGO" key="slot" align="center">
                <template #default="scope">
                    <img style="width: 100px;height: 60px;" :src="scope.row.logoUrl" alt="无图片">
                </template>
            </el-table-column>
            <el-table-column label="品牌操作" key="slot" align="center">
                <template #default="scope">
                    <el-button type="primary" size='small' icon="Edit" @click="editMark(scope.row)">修改</el-button>
                    <el-popconfirm title="是否删除" width="250px" icon="Delete" @confirm="removeMark(scope.row.id)">
                        <template #reference>
                            <el-button type="danger" size='small' icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                    
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[5, 10, 15, 20]"
            background layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'" width="600">
        <el-form style="width: 60%;" label-position="top" :model="trademarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称:" prop="tmName">
                <el-input placeholder="请输入品牌的名称" v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO:" prop="logoUrl">
                <el-upload class="avatar-uploader" action="/api/admin/product/fileUpload" :show-file-list="false"
                    :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="confirm">
                    确定
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, type UploadProps } from 'element-plus'
import { reqHasTrademark, reqAddOrUpdateTrademark,reqDeleteTrademark } from '@/api/product/trademark'
import request from '@/utils/request';
import type { Records, TradeMark, TradeMarkResponseData } from '@/api/product/trademark/type';
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>()
let formRef = ref()
let dialogVisible = ref<boolean>(false)
let trademarkParams = reactive<TradeMark>({
    tmName: '',
    logoUrl: ''
})
let trademarkArr = ref<Records>([])
const validatorTmName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('品牌名称长度大于等于2'))
    }
}
const rules = {
    tmName: [
        { required: true, message: '请填写品牌名称', trigger: 'blur', validator: validatorTmName }
    ],
    logoUrl: [
        { required: true, message: '请填写品牌名称' }
    ]
}
const handleSizeChange = () => {
    getHasTrademark();
    console.log(pageSize.value)
}
const handleCurrentChange = () => {
    getHasTrademark();
    console.log(currentPage.value)
}
// request.get(`/admin/product/baseTrademark/${currentPage.value}/${pageSize.value}`).then(res=>{
//     console.log(res)
// })

const getHasTrademark = async () => {
    let res: TradeMarkResponseData = await reqHasTrademark(currentPage.value, pageSize.value);
    if (res.code == 200) {
        total.value = res.data.total
        trademarkArr.value = res.data.records
    }
    //console.log(res)
}

const addMark = () => {
    trademarkParams.id = 0
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')
    dialogVisible.value = true

}
const editMark = (row: TradeMark) => {
    dialogVisible.value = true
    trademarkParams.id = row.id
    trademarkParams.tmName = row.tmName
    trademarkParams.logoUrl = row.logoUrl
    //console.log(row)
}
const removeMark = async (id:number)=>{
    let res = await reqDeleteTrademark(id)
    console.log(res)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'删除品牌成功'
        })
        getHasTrademark();
    }else{
        ElMessage({
                type:'error',
                message:'删除品牌失败'
        })
    }
       
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    trademarkParams.logoUrl = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type == 'image/jpeg' || rawFile.type == 'image/png' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 < 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '文件大小小于4M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传的文件类型为jpg、png、gif'
        })
        return false
    }
}
const cancel = () => {

    dialogVisible.value = false
}
const confirm = async () => {
    await formRef.value.validate();
    let res = await reqAddOrUpdateTrademark(trademarkParams)
    if (res.code == 200) {
        dialogVisible.value = false
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改成功' : '添加成功'
        })
        getHasTrademark();
    } else {
        dialogVisible.value = false
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改失败' : '添加失败'
        })
    }
    console.log(res)


}
onMounted(() => {
    getHasTrademark();
    //console.log('获取商品')
})

</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>