import Home from '../views/Home/index.vue'
import User from '../views/acl/user/index.vue'
import Login from '../views/Login/index.vue'
import Layout from '@/layout/index.vue'
import Trademark from '../views/product/tradmark/index.vue'
import Sku from '../views/product/sku/index.vue'
import Spu from '../views/product/spu/index.vue'
import Attr from '../views/product/attr/index.vue'

   

export const constantRoute:any = [
  {
    //登录
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/home',
    meta: {
      hidden: true,
    },
    children: [
      {
        path: '/home',
        component: Home,
        name: 'home',
        meta: {
          title: '首页',
          icon: 'HomeFilled'
        },
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true,
      icon: 'DocumentDelete'
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Any',
    redirect: '/404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404',
      hidden: true,
      icon: 'DocumentDelete'
    },
  },
  {
    path: '/screen',
    name: 'Screen',
    component: () => import('@/views/screen/index.vue'),
    meta: {
      title: '数据大屏',
      icon: 'Platform'
    },
  },
]

//异步路由
export const asnycRoute = [
  {
    path: '/acl',
    component: () => import('@/layout/index.vue'),
    name: 'Acl',
    meta: {
      title: '权限管理',
      icon: 'Lock'
    },
    redirect:'/acl/user',
    children: [
      {
        path: '/acl/user',
        component: User,
        name: 'Acl',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User'
        },
      },
      {
        path: '/acl/role',
        component: () => import('@/views/acl/role/index.vue'),
        name: 'Role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'UserFilled'
        },
      },
      {
        path: '/acl/permission',
        component: () => import('@/views/acl/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Tools'
        },
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    name: 'Product',
    meta: {
      title: '商品管理',
      icon: 'Goods',
    },
    redirect:'/product/trademark',
    children: [
      {
        path: '/product/trademark',
        component: Trademark,
        name: 'Trademark',
        meta: {
          title: '品牌管理',
          icon: 'ShoppingCartFull'
        }
      },
      {
        path: '/product/attr',
        component: Attr,
        name: 'Attr',
        meta: {
          title: '属性管理',
          icon: 'ChromeFilled'
        }
      },
      {
        path: '/product/spu',
        component: Spu,
        name: 'Spu',
        meta: {
          title: 'SPU管理',
          icon: 'Calendar'
        }
      },
      {
        path: '/product/sku',
        component: Sku,
        name: 'Sku',
        meta: {
          title: 'SKU管理',
          icon: 'Orange'
        }
      },

    ]
  }
]
  


//任意路由
export const anyRoute = {
  //任意路由
  path: '/:pathMatch(.*)*',
  redirect: '/404',
  name: 'Any',
  meta: {
    title: '任意路由',
    hidden: true,
    icon: 'DataLine',
  },
}
