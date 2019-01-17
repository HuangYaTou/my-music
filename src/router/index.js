import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

const recommend = (resolve) => {
  import('../components/recommend/recommend').then((module) => {
    resolve(module)
  })
}

const musicList = (resolve) => {
  import('../components/music-list/music-list').then((module) => {
    resolve(module)
  })
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: recommend,
      children: [{
        path: ':id',
        component: musicList
      }]
    }
  ]
})
