<template>
    <el-card>
        <el-form :inline="true" class="form">
            <el-form-item label="职位搜索">
                <el-input v-model="kewords" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click='search'>搜索</el-button>
                <el-button @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card>
        <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
        <el-table border style="margin: 10px 0;" :data="allRole">
            <el-table-column type="index" align="center" width="80" label="序号"></el-table-column>
            <el-table-column label="ID" align="center" prop="id"></el-table-column>
            <el-table-column label="职位名称" align="center" prop="roleName" show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" align="center" width="280">
                <template #default="scope, index">
                    <el-button type="primary" size="small" icon="User" @click="setPermission(scope)">分配权限</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateRole(scope)">编辑</el-button>
                    <el-popconfirm title="是否确认删除?" @confirm="removePermission(scope)" width="200px">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" background :page-sizes="[5, 10, 15]"
            layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
    </el-card>
    <el-dialog v-model="dialogVisible" :title='roleParams.id ? "更新职位" : "添加职位"' width="500">
        <el-form :model="roleParams" :rules="rules" ref="formRef">
            <el-form-item label="职位名称" prop="roleName">
                <el-input v-model="roleParams.roleName" placeholder="请输入职位名称"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">保存</el-button>
        </template>
    </el-dialog>
    <el-drawer v-model="drawer" title="分配权限">
        <template #default>
            <el-tree ref="tree" :data="munuArr" show-checkbox default-expand-all :default-checked-keys="selectArr"
                :props="defaultProps" node-key="id" highlight-current />
        </template>
        <template #footer>
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="handler">保存</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { reqAddOrUpdateRole, reqAllMenuList, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role';
import { ElMessage } from 'element-plus';
import { reactive } from 'vue';
import { ref, onMounted } from 'vue';
let drawer = ref(false)
let allRole = ref([])
let total = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let kewords = ref('')
let formRef = ref()
let tree = ref()
const defaultProps = {
    children: 'children',
    label: 'name',
}
const validatorRoleName = (role: any, value: any, callback: any) => {
    if (value.trim().length >= 2) {
        callback()
    } else {
        callback(new Error('职位名称至少两位'))
    }
}
let rules = reactive({
    roleName: [
        { required: true, trigger: 'blur', validator: validatorRoleName }
    ]
})
let munuArr = ref([])
let selectArr = ref<any>([])
let roleParams = reactive<any>({
    roleName: ''
})
let dialogVisible = ref(false)
const handleSizeChange = (val: number) => {
    getHasRole()
    console.log(`每页数量：${val} `)
}
const handleCurrentChange = (val: number) => {
    getHasRole()
    console.log(`当前页: ${val}`)
}
const getHasRole = async () => {
    let res: any = await reqAllRoleList(pageNo.value, pageSize.value, kewords.value)
    if (res.code == 200) {
        allRole.value = res.data.records
        total.value = res.data.total
        //console.log(res)
    }
}
const search = () => {
    getHasRole()
    kewords.value = ''
}
const reset = () => {
    getHasRole()
}
const addRole = () => {
    roleParams.roleName = ''
    dialogVisible.value = true
}
const updateRole = (scope: any) => {
    dialogVisible.value = true
    Object.assign(roleParams, scope.row)
}
const save = async () => {
    await formRef.value.validate()
    let res: any = await reqAddOrUpdateRole(roleParams)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: roleParams.id ? '更新成功' : '添加成功'
        })
        dialogVisible.value = false
        getHasRole()

    } else {
        ElMessage({
            type: 'error',
            message: roleParams.id ? '更新失败' : '添加失败'
        })
    }
    //console.log(res)
}
const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.select && item.level == 4) {
            initArr.push(item.id)
            //console.log(item)         
        }
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr);
        }

    })

    return initArr
}
const setPermission = async (scope: any) => {
    drawer.value = true
    Object.assign(roleParams, scope.row)
    let res: any = await reqAllMenuList(roleParams.id)
    if (res.code == 200) {
        munuArr.value = res.data
        selectArr.value = filterSelectArr(munuArr.value, [])
    }

}
const handler = async () => {
    const roleId = roleParams.id
    let arr = tree.value.getCheckedKeys()
    let arr1 = tree.value.getHalfCheckedKeys()
    let permissionId = arr.concat(arr1)
    let res: any = await reqSetPermission(roleId, permissionId)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '分配职位成功'
        })
        drawer.value = false
        window.location.reload()
    } else {
        ElMessage({
            type: 'error',
            message: '分配职位失败'
        })
    }
    //console.log(res)
}
const removePermission = async (scope: any) => {
    let res: any = await reqRemoveRole(scope.row.id)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasRole()
    } else {
        ElMessage({
            type: 'error',
            message: '删除失败'
        })
    }
    console.log(res)
}
import { ElTree } from 'element-plus'




onMounted(() => {
    getHasRole()
})
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
}
</style>