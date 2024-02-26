import request from "@/utils/request";

enum API {
    //获取全部的职位接口
    ALLROLE_URL = '/admin/acl/role/',
    //新增岗位的接口地址
    ADDROLE_URL = '/admin/acl/role/save',
    //更新已有的职位
    UPDATEROLE_URL = '/admin/acl/role/update',
    //获取全部的菜单与按钮的数据
    ALLPERMISSTION = '/admin/acl/permission/toAssign/',
    //给相应的职位分配权限
    SETPERMISTION_URL = '/admin/acl/permission/doAssign/?',
    //删除已有的职位
    REMOVEROLE_URL = '/admin/acl/role/remove/'
}

export const reqAllRoleList = (page: number, limit: number, roleName: string) => request.get(API.ALLROLE_URL + `${page}/${limit}/?roleName=${roleName}`)
export const reqAddOrUpdateRole = (data: any) => {
    if (data.id) {
        return request.put(API.UPDATEROLE_URL, data)
    } else {
        return request.post(API.ADDROLE_URL, data)
    }
}
//获取全部菜单与按钮权限数据
export const reqAllMenuList = (roleId: number) => request.get(API.ALLPERMISSTION + roleId)
//给相应的职位下发权限
export const reqSetPermission = (roleId: number, permissionId: any) => request.post(API.SETPERMISTION_URL + `roleId=${roleId}&permissionId=${permissionId}`)
//删除已有的职位
export const reqRemoveRole = (roleId:number)=>request.delete(API.REMOVEROLE_URL+roleId)




