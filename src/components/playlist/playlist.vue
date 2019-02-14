<template>
    <transition name="list-fade">
        <div class="playlist" v-show="showFlag" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="iconfont" :class="iconMode" @click="changeMode"></i>
                        <span class="text">{{modeText}}(<span class="count">{{playlist.length}}</span>)</span>
                        <span class="clear" @click="showConfirm"><i class="icon-clear"></i></span>
                    </h1>
                </div>
                <scroll ref="listContent" class="list-content" :data="sequenceList" :refreshDelay="refreshDelay">
                    <transition-group name="list" tag="ul">
                        <li class="item" ref="listItem" v-for="(item, index) in sequenceList" :key="item.id" @click="selectItem(item, index)">
                            <i class="current fa" :class="getCurrentIcon(item)"></i>
                            <span class="text">{{item.name}}</span>
                            <span class="delete" @click.stop="deleteOne(item)"><i class="icon-delete"></i></span>
                        </li>
                    </transition-group>
                </scroll>
                <div class="list-close" @click="hide"><span>关闭</span></div>
            </div>
            <confirm ref="confirm" @confirm="confirmClear" text="是否清空播放列表" confirmBtnText="清空"></confirm>
        </div>
    </transition>
</template>

<script>
import scroll from '../../base/scroll/scroll'
import confirm from '../../base/confirm/confirm'
import {mapActions, mapGetters, mapMutations} from 'vuex'
import {playMode} from '../../common/js/config'
import {shuffle} from '../../common/js/utl'
export default {
    components: {
        scroll,
        confirm
    },
    data() {
        return {
            showFlag: false,
            refreshDelay: 100
        }
    },
    computed: {
        modeText() {
            return this.mode === playMode.sequence?'顺序播放':this.mode===playMode.random?'随机播放':'单曲循环';
        },
        iconMode() {
            if(this.mode===playMode.sequence) {
                return 'icon-next';
            }
            else if(this.mode===playMode.loop) {
                return 'icon-loop';
            }
            else {
                return 'icon-random';
            }
        },
        ...mapGetters([
            'fullScreen',
            'playlist',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList',
            'favoriteList'
        ])
    },
    methods: {
        hide(){
            this.showFlag = false;
        },
        show() {
            this.showFlag = true;
            setTimeout(()=>{
                this.$refs.listContent.refresh();
                this.scrollToCurrent(this.currentSong);
            }, 20);
        },
        showConfirm() {
            this.$refs.confirm.show();
        },
        confirmClear() {
            this.deleteSongList();
            this.hide();
            this.$emit('stopMusic');
        },
        getCurrentIcon(item) {
            if(this.currentSong.id===item.id) {
                return 'fa-volume-up';
            }
            return '';
        },
        selectItem(item, index) {
            if(this.mode===playMode.random) {
                index = this.playlist.findIndex((song)=>{
                    return song.id===item.id;
                });
            }
            this.setCurrentIndex(index);
        },
        changeMode() {
            const mode = (this.mode+1)%3;
            this.setPlatMode(mode);
            let list = null;
            if(mode==playMode.random) {
                list = shuffle(this.sequenceList);
            }
            else {
                list = this.sequenceList;
            }
            this.resetCurrentIndex(list);
            this.setPlayList(list);
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item)=>{
                return this.currentSong.id===item.id;
            });
            console.log('playlist.vue--resetCurrentIndex--index='+index);
            this.setCurrentIndex(index);
        },
        deletOne(item) {
            this.deleteSong(item);
            if(!this.playlist.length) {
                this.hide();
                this.$emit('stopMusic');
            }
        },
        scrollToCurrent(current) {
            const index = this.sequenceList.findIndex((song)=>{
                return current.id===song.id;
            });
            this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        }),
        ...mapActions([
            'deleteSong',
            'deleteSongList'
        ])
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/variable";
@import "../../common/scss/mixin";
.playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.3);
    &.list-fade-enter-active, &.list-fade-leave-active {
      transition: opacity 0.3s;
      .list-wrapper {
        transition: all 0.3s;
      }
    }
    &.list-fade-enter, &.list-fade-leave-to {
      opacity: 0;
      .list-wrapper {
        transform: translate3d(0, 100%, 0);
      }
    }
    .list-wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      border-radius: 8px;
      background-color: $color-background;
      .list-header {
        position: relative;
        padding: 20px 30px 10px 20px;
        .title {
          display: flex;
          align-items: center;
          .iconfont {
            margin-right: 10px;
            font-size: 20px;
            color: $color-text-g;
          }
          .text {
            flex: 1;
            font-size: $font-size-medium;
            color: $color-text;
            .count {
              position: relative;
              top: 1px;
            }
          }
          .clear {
            @include extend-click();
            .icon-clear {
              font-size: $font-size-medium;
              color: $color-text-g;
            }
          }
        }
      }
      .list-content {
        max-height: 240px;
        overflow: hidden;
        .item {
          display: flex;
          align-items: center;
          height: 40px;
          padding: 0 30px 0 20px;
          overflow: hidden;
          &.list-enter-active, &.list-leave-active {
            transition: all 0.1s;
          }
          &.list-enter, &.list-leave-to {
            height: 0;
          }
          .fa-volume-up {
            color: $color-theme;
            margin-right: 5px;
          }
          .text {
            flex: 1;
            @include no-wrap();
            line-height: 20px;
            font-size: $font-size-medium;
            color: $color-text;
          }
          .delete {
            @include extend-click();
            font-size: $font-size-small;
            color: $color-theme;
          }
        }
      }
      .list-close {
        text-align: center;
        line-height: 50px;
        background: $color-background;
        font-size: $font-size-medium-x;
        color: $color-text;
      }
    }
}
</style>