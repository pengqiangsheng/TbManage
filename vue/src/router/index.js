import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/registry',
    component: () => import('@/views/registry/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  }
  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'el-icon-s-help' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/manage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'manage',
        component: () => import('@/views/manage/index'),
        meta: {
          title: '账号管理',
          icon: 'form',
          roles: ['admin']
        }
      }
    ]
  },
  {
    path: '/about',
    name: '',
    component: Layout,
    children: [{
      path: 'index',
      name: 'about',
      component: () => import('@/views/about/index'),
      meta: { title: '充值入口', icon: 'dashboard', roles: ['shoper', 'admin'] }
    }]
  },
  {
    path: '/accountManage',
    name: '',
    component: Layout,
    children: [{
      path: 'index',
      name: 'accountManage',
      component: () => import('@/views/buyer/accountManage//index'),
      meta: { title: '账号信息', icon: 'dashboard', roles: ['buyer'] }
    }]
  },
  {
    path: '/recharge',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'recharge',
        component: () => import('@/views/recharge/index'),
        meta: { title: '充值中心', icon: 'form', roles: ['shoper'] }
      }
    ]
  },
  {
    path: '/recode',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'recode',
        component: () => import('@/views/seller/recode/index'),
        meta: { title: '操作记录', icon: 'form', roles: ['shoper'] }
      }
    ]
  },
  {
    path: '/taskCenter',
    name: 'taskCenter',
    component: Layout,
    redirect: '/taskCenter/manage',
    meta: { title: '任务中心', icon: 'form', roles: ['shoper'] },
    children: [
      {
        path: 'manage',
        name: 'manage',
        component: () => import('@/views/seller/task/index'),
        meta: { title: '任务管理', icon: 'form' }
      },
      {
        path: 'load',
        name: 'load',
        component: () => import('@/views/seller/load/index'),
        meta: { title: '进行中', icon: 'form' }
      },
      {
        path: 'end',
        name: 'end',
        component: () => import('@/views/seller/end/index'),
        meta: { title: '已完成', icon: 'form' }
      }
    ]
  },
  {
    path: '/orderManage',
    component: Layout,
    name: 'orderManage',
    redirect: '/orderManage/orderCenter',
    meta: { title: '订单管理', icon: 'form', roles: ['buyer'] },
    children: [
      {
        path: 'orderCenter',
        name: 'orderCenter',
        component: () => import('@/views/buyer/orderManage/orderCenter/index'),
        meta: { title: '订单中心', icon: 'form' }
      },
      {
        path: 'toBeCompleted',
        name: 'toBeCompleted',
        component: () => import('@/views/buyer/orderManage/toBeCompleted/index'),
        meta: { title: '进行中', icon: 'form' }
      },
      {
        path: 'completed',
        name: 'completed',
        component: () => import('@/views/buyer/orderManage/completed/index'),
        meta: { title: '已完成', icon: 'form' }
      }
    ]
  },
  {
    path: '/rechargeManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'rechargeManage',
        component: () => import('@/views/manage/rechargeManage/index'),
        meta: { title: '充值管理', icon: 'form', roles: ['admin'] }
      }
    ]
  },
  {
    path: '/rateManage',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'rateManage',
        component: () => import('@/views/manage/rateManage'),
        meta: { title: '汇率管理', icon: 'form', roles: ['admin'] }
      }
    ]
  },

  // {
  //   path: '/fundManage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'fundManage',
  //       component: () => import('@/views/manage/fundManage'),
  //       meta: { title: '资金管理', icon: 'form', roles: ['admin'] }
  //     }
  //   ]
  // },

  {
    path: '/taskManage',
    component: Layout,
    name: 'taskManage',
    meta: { title: '任务管理', icon: 'form', roles: ['admin'] },
    children: [
      {
        path: 'task',
        name: 'task',
        component: () => import('@/views/manage/taskManage/task/index'),
        meta: { title: '进行中', icon: 'table' }
      },
      {
        path: 'completed',
        name: 'completed',
        component: () => import('@/views/manage/taskManage/completed/index'),
        meta: { title: '已完成', icon: 'tree' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
