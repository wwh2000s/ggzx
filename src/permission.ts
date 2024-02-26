import pinia from "./stores";
import router from "./router";
import useUserStore from "./stores/modules/user";
let UserStore = useUserStore(pinia);
router.beforeEach((to,from,next)=>{
    let token = UserStore.token
    if(token){
        if(to.path=='/Login'){
            next('/')
        }else{
            next();
        }
    }else{
      if(to.path=='/Login'){
        next()
      }else{
        next('/Login')
      }
    }
    //console.log(UserStore)
 
})
router.afterEach((to,from)=>{
   
})  