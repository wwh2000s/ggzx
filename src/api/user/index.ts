import request from "@/utils/request";
import type { loginResponseData, loginformData,userInfoResponseData } from "./type";
enum API {
    LOGIN_URL="/admin/acl/index/login",
    USERINFO_URL="/admin/acl/index/info",
    LOGOUT_URL="/admin/acl/index/logout"
}
//登录接口
export const reqLogin = (data:loginformData)=>request.post<any,loginResponseData>(API.LOGIN_URL,data)

//用户信息
export const reqUserInfo = ()=>request.get<any,userInfoResponseData>(API.USERINFO_URL)

//退出登录
export const reqLogout= ()=>request.post<any,any>(API.LOGOUT_URL)