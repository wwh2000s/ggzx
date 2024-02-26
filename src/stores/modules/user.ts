import { defineStore } from "pinia";

import { reqLogin, reqLogout, reqUserInfo } from "@/api/user";
import type { loginformData, loginResponseData, userInfoResponseData } from "@/api/user/type";
import type { UserState } from "./types/type";
import { constantRoute, asnycRoute, anyRoute } from '@/router/routes'
import { ElMessage } from "element-plus";
import cloneDeep from 'lodash/cloneDeep'
function filterAsyncRoute(asnycRoute: any, routes: any) {
    return asnycRoute.filter((item: any) => {
      if (routes.includes(item.name)) {
        if (item.children && item.children.length > 0) {
          //硅谷333账号:product\trademark\attr\sku
          item.children = filterAsyncRoute(item.children, routes)
        }
        return true
      }
    })
  }
import router from "@/router";
let useUserStore = defineStore('user', {
    state(): any {
        return {
            token: localStorage.getItem('TOKEN'),
            menuRoutes: constantRoute,
            username: '',
            avatar: '',
             //存储当前用户是否包含某一个按钮
            buttons: [],
        }
    },
    actions: {
        async userLogin(data: loginformData) {
            const res: loginResponseData = await reqLogin(data)
            //console.log(res)
            if (res.code == 200) {
                this.token = (res.data as string)
                localStorage.setItem('TOKEN', (res.data as string))
                router.push('/home')
            } else {
               // console.log(res.message)
                return Promise.reject(new Error(res.data))
            }
           
        },
        async userInfo() {
            let res:userInfoResponseData = await reqUserInfo()
            if (res.code == 200) {
                this.username = res.data.name
                this.avatar = res.data.avatar
                this.buttons = res.data.buttons
                //计算当前用户需要展示的异步路由
                const userAsyncRoute = filterAsyncRoute(
                  cloneDeep(asnycRoute),
                  res.data.routes,
                )
                //菜单需要的数据整理完毕
                this.menuRoutes = [...constantRoute, ...userAsyncRoute, anyRoute]
                //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
                ;[...userAsyncRoute, anyRoute].forEach((route: any) => {
                  router.addRoute(route)
                })
                return 'ok'
            } else{
                 return Promise.reject(new Error(res.message))
            }
            console.log(res)
        },
        
       async userLogout() { 
            let res:any = await reqLogout();   
            if(res.code=200){
                this.token='',
                this.username='',
                this.avatar='',
                localStorage.removeItem('TOKEN')
            }else{
                console.log(res)
            }
         
        }
    },
    getters: {

    }
})
export default useUserStore;