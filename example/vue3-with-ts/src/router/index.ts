// tslint:disable
import { createRouter, createWebHashHistory } from 'vue-router'
// import Home from '../views/Home.vue'

// const routes: Array<RouteConfig> = [
const routes: Array<any> = [
  {
    path: '/',
    // redirect: '/helloWorld'
  },
  // {
  //   path: '/helloWorld',
  //   name: 'helloWorld',
  //   component: () => import('../components/HelloWorld.vue')
  // }
  //   {
  //     path: '/detail/:id',
  //     name: 'Home',
  //     component: () => import('@/views/Detail.vue')
  //   },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
