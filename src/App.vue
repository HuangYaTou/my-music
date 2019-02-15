<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import mHeader from './components/m-header/m-header'
import tab from './components/tab/tab'
import player from './components/player/player'

export default {
  data() {
    return {
      stop: false
    }
  },
  components: {
    mHeader,
    tab,
    player
  },
  mounted() {
    let m = document.querySelector('#app');
    m.addEventListener('touchend', this.firstPlay);
  },
  methods: {
    firstPlay() {
      let music = document.querySelector('#music-audio');
      music.play();
      if(music.src !== '') {
        this.stop = true;
      }
    }
  },
  watch: {
    stop() {
      let m = document.querySelector('#app');
      m.removeEventListener('touchend', this.firstPlay);
    }
  }
}
</script>

<style lang="scss">
@import './common/scss/index.scss';
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>

<!--
1、滚动插件：better-scroll
2、懒加载：vue-lazyload
3、数据请求：axios
4、svg
5、transition用法
6、混合机制：mixins
7、拼音插件：pinyin
-->
