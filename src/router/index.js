import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Recommend from '../components/recommend/recommend'
import MusicList from '../components/music-list/music-list'
import Rank from '../components/rank/rank'
import RankDetail from '../components/rank-detail/rank-detail'
import Singer from '../components/singer/singer'
import SingerDetail from '../components/singer-detail/singer-detail'
import User from '../components/user/user'

Vue.use(Router);

// const Recommend = (resolve) => {
//   import('../components/recommend/recommend').then((module) => {
//     resolve(module)
//   })
// }

// const MusicList = (resolve) => {
//   import('../components/music-list/music-list').then((module) => {
//     resolve(module)
//   })
// }

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    }, {
      path: '/recommend',
      component: Recommend,
      children: [{
        path: ':id',
        component: MusicList
        // component: HelloWorld
      }]
    }, {
      path: '/rank',
      component: Rank,
      children: [{
        path: ':id',
        component: RankDetail
      }]
    }, {
      path: '/singer',
      component: Singer,
      children: [{
        path: ':id',
        component: SingerDetail
      }]
    }, {
      path: '/user',
      component: User
    }
  ]
})
