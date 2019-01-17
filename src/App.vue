<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import mHeader from 'cpnts/m-header/m-header'
import tab from 'cpnts/tab/tab'

export default {
  data() {
    return {
      stop: false
    }
  },
  components: {
    mHeader,
    tab
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
@import 'common/scss/index.scss';
#app {
  position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
