<template>
    <transition name="slide">
        <div class="user">
            <div class="back" @click="back"><i class="fa fa-angle-left"></i></div>
            <div class="switches-wrapper">
                <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
            </div>
            <div class="sequence-play" @click="sequence">
                <i class="iconfont icon-bofangicon"></i>
                <span class="text">播放全部</span>
                <span class="count">(共{{count}}首)</span>
            </div>
            <div class="list-wrapper" ref="listWrapper">
                <scroll ref="favoriteList" class="list-scroll" :data="favoriteList" v-if="currentIndex===0">
                    <div class="list-inner">
                        <song-list :songs="favoriteList" @select="selectSong"></song-list>
                    </div>
                </scroll>
                <scroll ref="playList" class="list-scroll" :data="playHistory" v-if="currentIndex===1">
                    <div class="list-inner">
                        <song-list :songs="playHistory" @select="selectSong"></song-list>
                    </div>
                </scroll>
            </div>
            <div class="no-result-wrapper" v-show="noResult">
                <no-result :title="noResultDesc"></no-result>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import scroll from '../../base/scroll/scroll'
import switches from '../../base/switches/switches'
import songList from '../../base/song-list/song-list'
import noResult from '../../base/no-result/no-result'
import {loginStatus} from '../../api/login'
import { ERR_OK } from '../../common/js/config'

export default {
    components: {
        scroll,
        switches,
        songList,
        noResult
    },
    data() {
        return {
            currentIndex: 0,
            switches: [
                {name:'我的收藏'},
                {name:'最近播放'}
            ]
        }
    },
    created() {
        // this.checkLoginStatus();
    },
    computed: {
        count() {
            if(this.currentIndex===0) {
                return this.favoriteList.length;
            }
            else {
                return this.playHistory.length;
            }
        },
        noResult() {
            if(this.currentIndex===0) {
                return !this.favoriteList.length;
            }
            else {
                return !this.playHistory.length;
            }
        },
        noResultDesc() {
            if(this.currentIndex===0) {
                return '去寻找属于你自己最爱的MUSIC吧~';
            }
            else {
                return '你还没有听过歌呀~';
            }
        },
        ...mapGetters([
            'favoriteList',
            'playHistory'
        ])
    },
    methods: {
        sequence() {
            let list = this.currentIndex===0?this.favoriteList:this.playHistory;
            if(list.length===0) {
                return;
            }
            this.sequencePlay({
                list: list
            });
        },
        back() {
            this.$router.back();
        },
        switchItem(index) {
            this.currentIndex = index;
        },
        selectSong(song) {
            this.insertSong(song);
        },
        checkLoginStatus() {
            loginStatus().then((res)=>{
                console.log('user.vue checkLoginStatus res='+JSON.stringify(res));
                if(res.status===ERR_OK) {
                    console.log('user.vue checkLoginStatus 已登录');
                }
                else {
                    console.log('user.vue checkLoginStatus 获取登录状态失败！');
                }
            }).catch((res)=>{
                // console.log(JSON.stringify(res));
                if(res.response.status===301) {  //需要登录
                    this.$router.push({
                        path: '/login'
                    });
                }
            })
        },
        ...mapActions([
            'insertSong',
            'sequencePlay'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable";
.user {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: $color-background;
  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }
  &.slide-enter, &.slide-leave-to {
    transform: translate3d(-50%, 0, 0);
    opacity: 0;
  }
  .back {
    position: absolute;
    top: 0;
    left: 4px;
    .fa-angle-left {
      padding: 5px 10px;
      font-size: 30px;
      color: #fff;
    }
  }
  .switches-wrapper {
    display: flex;
    align-items: center;
    background: $color-theme;
    height: 44px;
  }
  .sequence-play {
    position: absolute;
    top: 44px;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    padding-left: 16px;
    border-bottom: 1px solid rgb(228, 228, 228);
    .iconfont {
      font-size: 18px;
      color: $color-text;
      padding-right: 14px;
    }
    .text {
      font-size: $font-size-medium-x;
    }
    .count {
      font-size: $font-size-medium;
      color: $color-text-g;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 84px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      overflow: hidden;
      // width: 100%;
      height: 100%;
    }
  }
  .no-result-wrapper {
    margin-top: 60%;
  }
}
</style>