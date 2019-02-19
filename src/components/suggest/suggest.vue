<template>
  <div class="suggest">
    <div class="search-suggest" v-show="!searchShow&&query&&songs.length>0">
      <p class="title" v-show="showSinger&&showList">最佳匹配</p>
      <div class="search-suggest-item" v-if="showSinger&&suggest.artists" @click="selectItem(suggest.artists[0])">
        <img :src="suggest.artists[0].img1v1Url" width="50" height="50">
        <span>歌手：{{suggest.artists[0].name}}</span>
      </div>
      <div class="search-suggest-item" v-if="showList&&suggest.playlists" @click="selectList(suggest.playlists[0])">
        <img :src="suggest.playlists[0].coverImgUrl" width="50" height="50">
        <!-- <div class="text">
          <p>歌单：{{suggest.playlists[0].name}}</p>
          <div class="singer">{{suggest.albums[0].artists.name}}</div>
        </div> -->
        <span>歌单：{{suggest.playlists[0].name}}</span>
      </div>
    </div>
    <ul class="suggest-list" ref="suggestList" v-show="!searchShow">
      <li class="suggest-item" v-for="(item, index) in songs" :key="index" @click="selectSong(item)">
        <div class="icon"><i></i></div>
        <div class="name">
          <p class="song">{{item.name}}</p>
          <p class="singer">{{item.singer}}</p>
        </div>
      </li>
      <loading v-show="haveMore&&query"></loading>
    </ul>
    <div class="no-result-wrapper" v-show="!haveMore&&query&&!songs.length">抱歉，暂无搜索结果</div>
  </div>
</template>

<script>
import loading from '../../base/loading/loading'
import Singer from '../../common/js/singer'
import {getSearchSongs, getSearchSuggest, getSongDetail} from '../../api/search'
import {createSearchSong} from '../../common/js/song'
import {mapMutations, mapActions} from 'vuex'
export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    },
    showList: {
      type: Boolean,
      default: true
    }
  },
  components: {
    loading
  },
  data() {
    return {
      singer: {},
      songs: [],
      suggest: {},
      searchShow: true,
      page: 0,
      update: true,
      haveMore: true
    }
  },
  watch: {
    query(val) {
      if(val==='') {
        this.suggest = {};
        this.songs = [];
        this.haveMore = false;
        return;
      }
      this.suggest = {};
      this.songs = [];
      this.searchShow = true;
      this.page = 0;
      this.haveMore = true;
      this.search();
    },
    songs(songs) {}
  },
  methods: {
    search() {
      this.searchShow = false;
      this.haveMore = true;
      getSearchSongs(this.query, this.page).then((res)=>{
        if(!res.data.result.songs) {
          this.haveMore = false;
          return;
        }
        let list = res.data.result.songs;
        let ret = [];
        list.forEach((item)=>{
          ret.push(createSearchSong(item));
        });
        this.songs = ret;
        this.$emit('refresh');
      });
      this.page+=30;
      getSearchSuggest(this.query).then((res)=>{
        this.suggest = res.data.result;
      });
    },
    selectItem(item) {
      const singer = new Singer({
        id: item.id,
        name: item.name,
        avatar: item.img1v1Url
      });
      this.$router.push({
        path: `/search/singer/${singer.id}`
      });
      this.setSinger(singer);
      this.$emit('select');
    },
    selectList(item) {
      const list = [];
      list.id = item.id;
      list.name = item.name;
      list.picUrl = item.coverImgUrl;
      list.playCount = item.playCount;
      this.$router.push({
        path: `/search/list/${list.id}`
      });
      this.setMusicList(list);
      this.$emit('select');
    },
    selectSong(item) {
      getSongDetail(item.id).then((res)=>{
        item.image = res.data.songs[0].al.picUrl;
        this.insertSong(item);
      });
      this.$emit('select');
    },
    searchMore() {
      // console.log('suggest.vue searchMore haveMore='+this.haveMore);
      if(!this.haveMore) {
        return;
      }
      if(!this.songs.length) {
        return;
      }
      getSearchSongs(this.query, this.page).then((res)=>{
        let list = res.data.result.songs;
        if(!res.data.result.songs) {
          this.haveMore = false;
          return;
        }
        let ret = [];
        list.forEach((item)=>{
          ret.push(createSearchSong(item));
        });
        this.songs = this.songs.concat(ret);
        this.$emit('select');
        this.page += 30;
      });
    },
    ...mapActions([
      'insertSong'
    ]),
    ...mapMutations({
      setSinger: 'SET_SINGER',
      setMusicList: 'SET_MUSIC_LIST'
    })
  },
}
</script>

<style scoped lang="scss" >
@import "../../common/scss/variable";
@import "../../common/scss/mixin";

.suggest {
  height: 100%;
  overflow: hidden;
  .search-go {
    font-size: $font-size-medium;
    margin-left: 20px;
    color: $color-theme;
  }
  .search-suggest {
    .title {
      padding-left: 20px;
      padding-bottom: 10px;
      color: $color-theme;
      font-size: 11px;
    }
    .search-suggest-item {
      display: flex;
      align-items: center;
      padding: 8px 20px;
      border-bottom: 1px solid rgb(228, 228, 228);
      font-size: $font-size-medium;
      img {
        flex: 0 0 50px;
        padding-right: 15px;
      }
      .text {
        width: 100%;
        p {
          padding: 3px 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .singer {
          font-size: 12px;
          color: $color-text;
        }
      }
    }
  }
  .suggest-list {
    padding-bottom: 30px;
    .suggest-item {
      display: flex;
      padding: 3px 20px;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid rgb(228, 228, 228);
      p {
        padding: 3px 0;
      }
      .song {
        font-size: $font-size-medium-x;
        color: $color-text;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      // padding-bottom: 20px
      }
      .singer {
        font-size: 12px;
        color: $color-text-g;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .icon {
      // flex: 0 0 30px
      // width: 30px
      [class^="icon-"] {
        font-size: 14px;
        color: $color-text;
      }
    }
    .name {
      flex: 1;
      font-size: $font-size-medium;
      color: $color-text;
      overflow: hidden;
      .text {
       @include no-wrap();
      }
    }
  }
}
.no-result-wrapper {
  position: fixed;
  overflow: hidden;
  left: 50%;
  top: 40vh;
  transform: translatex(-50%);
  color: $color-text;
}
</style>