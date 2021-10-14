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
      meta: { title: '仪表盘', icon: 'dashboard' }
    }]
  },
  {
    path: '/server',
    component: Layout,
    redirect: 'noRedirect',
    name: '服务器',
    meta: {
      title: '服务器',
      icon: 'server'
    },
    children: [
      {
        path: 'servers',
        component: () => import('@/views/server'),
        name: '服务器管理',
        meta: { title: '服务器管理', icon: 'server' }
      }
    ]
  },
  {
    path: '/application',
    component: Layout,
    redirect: 'noRedirect',
    name: '应用管理',
    meta: {
      title: '应用管理',
      icon: 'application'
    },
    children: [
      {
        path: 'mysql',
        component: () => import('@/views/application/mysql'),
        name: 'MySQL',
        meta: { title: 'MySQL', icon: 'mysql' }
      },
      {
        path: 'mongodb',
        component: () => import('@/views/application/mongodb'),
        name: 'MongoDB',
        meta: { title: 'MongoDB', icon: 'mongodb' }
      },
      {
        path: 'postgresql',
        component: () => import('@/views/application/postgresql'),
        name: 'PostgreSQL',
        meta: { title: 'PostgreSQL', icon: 'postgresql' }
      },
      {
        path: 'clickhouse',
        component: () => import('@/views/application/clickhouse'),
        name: 'ClickHouse',
        meta: { title: 'ClickHouse', icon: 'clickhouse' }
      },
      {
        path: 'redis',
        component: () => import('@/views/application/redis'),
        name: 'Redis',
        meta: { title: 'Redis', icon: 'redis' }
      },
      {
        path: 'elasticsearch',
        component: () => import('@/views/application/elasticsearch'),
        name: 'ElasticSearch',
        meta: { title: 'ElasticSearch', icon: 'elasticsearch' }
      },
      {
        path: 'zookeeper',
        component: () => import('@/views/application/zookeeper'),
        name: 'Zookeeper',
        meta: { title: 'Zookeeper', icon: 'zookeeper' }
      },
      {
        path: 'kafka',
        component: () => import('@/views/application/kafka'),
        name: 'Kafka',
        meta: { title: 'Kafka', icon: 'kafka' }
      },
      {
        path: 'rocketmq',
        component: () => import('@/views/application/rocketmq'),
        name: 'RocketMQ',
        meta: { title: 'RocketMQ', icon: 'rocketmq' }
      },
      {
        path: 'rabbitmq',
        component: () => import('@/views/application/rabbitmq'),
        name: 'RabbitMQ',
        meta: { title: 'RabbitMQ', icon: 'rabbitmq' }
      },
      {
        path: 'nginx',
        component: () => import('@/views/application/nginx'),
        name: 'Nginx',
        meta: { title: 'Nginx', icon: 'nginx' }
      }
    ]
  },
  {
    path: '/server',
    component: Layout,
    redirect: 'noRedirect',
    name: '任务管理',
    meta: {
      title: '任务管理',
      icon: 'server'
    },
    children: [
      {
        path: 'servers',
        component: () => import('@/views/server'),
        name: '任务管理',
        meta: { title: '任务管理', icon: 'task' }
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
