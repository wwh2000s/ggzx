import request from "@/utils/request";
enum API {
    //获取全部已有用户账号信息
    ALLUSER_URL = "/admin/acl/user/",
    //添加一个新的用户账号
    ADDUSER_URL = "/admin/acl/user/save",
    //更新已有的用户账号
    UPDATEUSER_URL = "/admin/acl/user/update",
    //获取全部职位,当前账号拥有的职位接口
    ALLROLEURL= '/admin/acl/user/toAssign/',
    //给已有的用户分配角色接口
    SETROLE_URL='/admin/acl/user/doAssignRole',
    //删除某一个账号
    DELETEUSER_URL='/admin/acl/user/remove/',
    //批量删除的接口
    DELETEALLUSER_URL='/admin/acl/user/batchRemove'



}
export const reqUserInfo = (page: number, limit: number,username:string) => request.get(API.ALLUSER_URL + `${page}/${limit}/?username=${username}`)

export const reqAddOrUpdateUser=(data:any)=>{
    if(data.id){
        return request.put(API.UPDATEUSER_URL,data)
    }else{
        return request.post(API.ADDUSER_URL,data)
    }
}
//获取全部职位以及包含当前用户的已有的职位
export const reqAllRole = (userId:any)=>request.get(API.ALLROLEURL+userId);
//分配职位
export const reqSetUserRole = (data:any)=>request.post(API.SETROLE_URL,data)
//删除某一个账号的信息
export const reqRemoveUser = (userId:any)=>request.delete(API.DELETEUSER_URL+userId)
export const reqSelectUser=(idList:any)=>request.delete(API.DELETEALLUSER_URL,{data:idList})
    

