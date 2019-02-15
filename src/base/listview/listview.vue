<template>
    <scroll class="listview" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
        <ul>
            <li class="list-group" ref="listGroup" v-for="group in data" :key="group.id">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items" :key="item.id" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutStart" @touchmove.stop.prevent="onShortcutMove">
            <ul>
                <li class="item" v-for="(item, index) in shortcutList" :data-index="index" :key="item.id" :class="{'current':currentIndex===index}">{{item}}</li>
            </ul>
        </div>
    </scroll>
</template>

<script>
import scroll from '../../base/scroll/scroll'
import getData from '../../common/js/dom'

const ANCHOR_HEIGHT = 20;
export default {
    props: {
        data: {
            type: Array
        }
    },
    components: {
        scroll
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0
        }
    },
    created() {
        this.touch = {};
        this.listenScroll = true;
        this.listHeight = [];
        this.probeType = 3;
    },
    computed: {
        shortcutList() {
            return this.data.map((group)=>{
                return group.title.substr(0,1);
            });
        },
        fixedTitle() {
            if(this.scrollY>0) {
                return '';
            }
            return this.data[this.currentIndex]?this.data[currentIndex].title:'';
        }
    },
    watch: {},
    methods: {}
}
</script>


<style lang="scss" scoped>
@import "../../common/scss/variable";
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    // padding: 10px 0;
    .list-group-title {
      height: 20px;
      line-height: 20px;
      padding-left: 12px;
      margin-bottom: 10px;
      font-size: $font-size-small;
      color: #fff;
      background:rgba(0, 0, 0, 0.1);
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin: 0 5px;
      border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        border: none;
        margin-bottom: 10px;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 3px;
      }
      .name {
        margin-left: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 30;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 200px 0;
    border-radius: 3px;
    text-align: center;
    font-family:Helvetica;
    .item {
      padding: 5px 5px;
      line-height: 1;
      color: $color-text-g;
      font-size: $font-size-small;
      font-weight: bold;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 20px;
      line-height: 20px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>