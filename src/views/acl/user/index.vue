<template>
    <el-card style="height: 80px;">
        <el-form :inline="true" class="form">
            <el-form-item>
                <el-input v-model="keywords" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"  :disabled="keywords?false:true" @click="search">搜索</el-button>
                <el-button type="primary" @click='reset'>重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <el-card style="margin: 10px 0;">
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button @click="deleteSelectUser" :disabled="selectIdArr.length?false:true" type="primary">批量删除</el-button>
        <el-table @selection-change="selectChange" border style="margin: 10px 0;" :data="userArr">
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column label="序号" align="center" width="60" type="index"></el-table-column>
            <el-table-column label="ID" prop="id" align="center" width="120"></el-table-column>
            <el-table-column label="用户名字" prop="name" width="120" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="用户名称" prop="username" width="120" align="center"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="用户角色" prop="roleName" width="120" align="center"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="创建时间" prop="createTime" width="120" align="center"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="更新时间" prop="updateTime" width="120" align="center"
                show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="280" fixed="right">
                <template #default="scope, index">
                    <el-button type="primary" size="small" icon="User" @click="setRole(scope)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="Edit" @click="updateUser(scope)">编辑</el-button>
                    <el-popconfirm title="是否确认删除?" width="200px" @confirm="deleteUser(scope)">
                        <template #reference>
                            <el-button type="primary" size="small" icon="Delete">删除</el-button>
                        </template>
                    </el-popconfirm>
                    
                </template>
            </el-table-column>
        </el-table>
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" background :page-sizes="[5, 7, 9, 11]"
            layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        <el-drawer v-model="drawer">
            <template #header>
                <h3>{{ userParams.id ? '更新用户' : '添加用户' }}</h3>
            </template>
            <template #default>
                <el-form :model="userParams" :rules="rules" ref="formRef">
                    <el-form-item label="用户姓名" prop="name">
                        <el-input v-model="userParams.name" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户昵称" prop="username">
                        <el-input v-model="userParams.username" placeholder="请输入用户昵称"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password">
                        <el-input type="password" show-password v-model="userParams.password"
                            placeholder="请输入密码"></el-input>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">确定</el-button>
            </template>
        </el-drawer>
        <el-drawer v-model="drawer1">
            <template #header>
                <h3>分配角色</h3>
            </template>
            <template #default>
                <el-form>
                    <el-form-item label="用户姓名">
                        <el-input v-model="userParams.username" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="职位列表">
                        <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange"
                            v-model="checkAll">全选</el-checkbox>
                        <el-checkbox-group @change="handleCheckedCitiesChange" v-model="userRole">
                            <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">
                                {{ role.roleName }}
                            </el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-form>
            </template>
            <template #footer>
                <div style="flex:auto">
                    <el-button @click="drawer1 = false">取消</el-button>
                    <el-button type="primary" @click="confirmClick">确定</el-button>
                </div>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { reqAddOrUpdateUser, reqAllRole, reqRemoveUser, reqSelectUser, reqSetUserRole, reqUserInfo } from '@/api/acl/user'
import { ElMessage } from 'element-plus';
import { ref, onMounted, reactive, nextTick } from 'vue';
let drawer = ref<boolean>(false)
let drawer1 = ref<boolean>(false)
const isIndeterminate = ref(true)
let userArr = ref([])
let total = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let userParams = reactive({
    id: null,
    username: '',
    name: '',
    password: ''
})
let formRef = ref<any>()
let checkAll = ref(false)
const validatorUsername = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户昵称长度最少五位'))
    }
}
const validatorName = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('用户名字长度最少五位'))
    }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
    if (value.trim().length >= 5) {
        callback()
    } else {
        callback(new Error('密码长度最少五位'))
    }
}
const rules = {
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { trigger: blur, validator: validatorUsername }
    ],
    name: [
        { required: true, message: '名字不能为空', trigger: 'blur' },
        { trigger: blur, validator: validatorName }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { trigger: blur, validator: validatorPassword }
    ]
}
const handleSizeChange = (val: number) => {
    getHasUser()
    console.log(`每页数量：${val} `)
}
const handleCurrentChange = (val: number) => {
    getHasUser()
    console.log(`当前页: ${val}`)
}
const getHasUser = async () => {

    let res: any = await reqUserInfo(pageNo.value, pageSize.value,keywords.value)
    if (res.code == 200) {
        total.value = res.data.total
        userArr.value = res.data.records
    }
    //console.log(res)
}
const addUser = () => {
    Object.assign(userParams, {
        username: '',
        name: '',
        password: ''
    })
    drawer.value = true
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
const cancel = () => {
    drawer.value = true
}
const updateUser = (scope: any) => {
    Object.assign(userParams, scope.row)
    drawer.value = true
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
const save = async () => {
    await formRef.value.validate()
    let res: any = await reqAddOrUpdateUser(userParams)
    if (res.code == 200) {
        drawer.value = false,
            ElMessage({
                type: 'success',
                message: userParams.id ? '更新成功' : '添加成功'
            })
        // getHasUser()
        window.location.reload()
    } else {
        ElMessage({
            type: 'error',
            message: userParams.id ? '更新失败' : '添加失败'
        })
    }
    console.log(res)
}
let allRole = ref<any>([]);
let userRole = ref([])
let selectIdArr=ref([])
let keywords=ref('')
const setRole = async (scope: any) => {

    Object.assign(userParams, scope.row)
    let res: any = await reqAllRole(userParams.id)
    if (res.code == 200) {
        allRole.value = res.data.allRolesList
        userRole.value = res.data.assignRoles
        drawer1.value = true
    }
    //console.log(res)
}


const handleCheckAllChange = (val: boolean) => {
    userRole.value = val ? allRole.value : []
    isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === allRole.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length

}
const confirmClick = async () => {
    let data = {
        userId: userParams.id,
        roleIdList: userRole.value.map((item: any) => {
            return item.id
        })
    }
    let res: any = await reqSetUserRole(data)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: '分配职务成功'
        })
        drawer1.value = false
        getHasUser()
    } else {
        ElMessage({
            type: 'error',
            message: '分配职务失败'
        })
    }
    //console.log(res)
}
const deleteUser=async (scope:any)=>{
    let res:any = await reqRemoveUser(scope.row.id)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasUser()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
  
   
}
const selectChange=(value:any)=>{
    selectIdArr.value=value
}
const deleteSelectUser =async () =>{
    let idList:any=selectIdArr.value.map((item:any)=>{
        return item.id
    })
    let res:any = await reqSelectUser(idList)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'批量删除成功'
        })
        getHasUser()
    }else{
        ElMessage({
            type:'error',
            message:'批量删除失败'
        })
    }
    //console.log(res)
}
const search=()=>{
    getHasUser()
    keywords.value=''
}


const reset =()=>{
   keywords.value='',
   getHasUser()
}
onMounted(() => {
    getHasUser()
})


</script>

<style scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>