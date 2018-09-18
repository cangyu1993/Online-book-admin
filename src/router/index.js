import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


const components = {
  index:()=>import('@/views/index'),
  home:()=>import('@/views/home'),
  onePage:()=>import('@/views/cotent/onePage'),
  twoPage:()=>import('@/views/cotent/twoPage'),
  users:()=>import('@/views/cotent/users/index'),
  usersDetails:()=>import('@/views/cotent/users/usersDetails'),
  sortList:()=>import('@/views/sortList'),
  listdetail:()=>import('@/views/classificationDetails'),
  addclassify:()=>import('@/views/addclassify'),
  booktable:()=>import('@/views/booktable'),

}



export default new Router({
  routes: [
    {
      path: '/',
      component: components.index,
    },
    {
      path: '/home',
      component: components.home,
      redirect:'/home/onePage',
      meta:{
        title:'首页'
      },
      children:[
        {
          path: 'onePage',
          component: components.onePage,
        },
        {
          path: 'twoPage',
          component: components.twoPage,
        },
        {
          path: 'users',
          meta:{
            title:'用户管理'
          },
          component: components.users,
        },
        {
          path: 'usersDetails',
          component: components.usersDetails,
        },
        {
          path: 'sortList',
          component: components.sortList,
        },
        {
          path: 'listdetail',
          component: components.listdetail,
        },
        {
          path: 'addclassify',
          component: components.addclassify,
        },
        {
          path: 'booktable',
          name:'booktable',
          component: components.booktable,
        },
      ]
    },



  ]
})
