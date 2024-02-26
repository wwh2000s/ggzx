<template>
    <el-table border :data="permissionArr" style="width: 100%; margin-bottom: 20px;" row-key="id">
        <el-table-column label="名称" align="center" prop="name" />
        <el-table-column label="权限" align="center" prop="code" />
        <el-table-column label="修改时间" align="center" prop="updateTime" />
        <el-table-column label="操作" align="center" width="280" prop="">
            <template #default="scope, index">
                <el-button size="small" icon="Plus" type="primary" @click="addPermission(scope)"
                    :disabled="scope.row.level == 4 ? true : false">添加菜单</el-button>
                <el-button size="small" icon="Edit" type="primary" @click="updatePermisision(scope)"
                    :disabled="scope.row.level == 1 ? true : false">修改</el-button>
               
                <el-popconfirm title="是否确认删除?" @confirm="removeMenu(scope)">
                    <template #reference>
                        <el-button size="small" icon="Delete" type="primary"
                        :disabled="scope.row.level == 1 ? true : false"
                    >删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" :title="menuDate.id ? '更新菜单' : '添加菜单'" width="400">
        <el-form>
            <el-form-item label="名称">
                <el-input v-model="menuDate.name" placeholder="请输入菜单名称"></el-input>

            </el-form-item>
            <el-form-item label="权限">
                <el-input v-model="menuDate.code" placeholder="请输入权限名称"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="save">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { reqAddOrUpdateMenu, reqAllPermisstion, reqRemoveMenu } from '@/api/acl/menu';
import { ElMessage } from 'element-plus';
let permissionArr = ref([])
let dialogVisible = ref(false)
let menuDate: any = reactive({
    code: '',
    level: 0,
    name: '',
    pid: 0
})
const getHasPermission = async () => {
    let res: any = await reqAllPermisstion()
    if (res.code == 200) {
        permissionArr.value = res.data
    }
    //console.log(res)
}
const addPermission = (scope: any) => {
    Object.assign(menuDate, {
        code: '',
        level: 0,
        name: '',
        pid: 0
    })
    dialogVisible.value = true
    menuDate.level = scope.row.level + 1
    menuDate.pid = scope.row.id
}
const updatePermisision = (scope: any) => {
    dialogVisible.value = true
    Object.assign(menuDate, scope.row)

}
const save = async () => {
    let res: any = await reqAddOrUpdateMenu(menuDate)
    if (res.code == 200) {
        ElMessage({
            type: 'success',
            message: menuDate.id ? '修改成功' : '添加成功'
        })
        dialogVisible.value = false
        getHasPermission()
    } else {
        ElMessage({
            type: 'error',
            message: menuDate.id ? '修改失败' : '添加失败'
        })
    }
    //console.log(res)
}
const removeMenu=async (scope:any)=>{
    let res:any = await reqRemoveMenu(scope.row.id)
    if(res.code==200){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
        getHasPermission()
    }else{
        ElMessage({
            type:'error',
            message:'删除失败'
        })
    }
    //console.log(res)
   
}
onMounted(() => {
    getHasPermission()
})
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
            {
                name: 'Jerry',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Spike',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
            {
                name: 'Tyke',
                state: 'California',
                city: 'San Francisco',
                address: '3650 21st St, San Francisco',
                zip: 'CA 94114',
            },
        ],
    },
]
</script>

<style scoped></style>