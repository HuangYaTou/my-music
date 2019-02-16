import { mapGetters, mapMutations, mapActions } from 'vuex'
import { playMode } from './config'
import { shuffle } from './utl'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist);
    },
    activated() {
        this.handlePlaylist(this.playlist);
    },
    watch: {
        /*playlist(newVal) {
            this.handlePlaylist(newVal);
        }*/
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement handlePlaylist method');
        }
    },
}

export const playerMixin = {
    computed: {
        iconMode() {
            if (this.mode === playMode.sequence) {
                return 'icon-sequence';
            }
            else if (this.mode === playMode.loop) {
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
        changeMode() {
            const mode = (this.mode + 1) % 3;
            console.log('minix--changeMode--mode=' + mode);
            this.setPlayMode(mode);
            let list = null;
            if (mode === playMode.random) {
                list = shuffle(this.sequenceList);
            }
            else {
                list = this.sequenceList;
            }
            this.resetCurrentIndex(list);
            this.setPlayList(list);
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.id === this.currentSong.id;
            });
            console.log('minix--resetCurrentIndex--index=' + index);
            this.setCurrentIndex(index);
        },
        getFavoriteIcon(song) {
            if (this.isFavorite(song)) {
                return 'icon-favorite';
            }
            return 'icon-not-favorite';
        },
        toggleFavorite(song) {
            if (isFavorite(song)) {
                this.deleteFavoriteList(song);
            }
            else {
                this.saveFavoriteList(song);
            }
        },
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.id === song.id;
            });
            return index > -1;
        },
        ...mapMutations({
            setFullScreen: 'SET_FULL_SCREEN',
            setPlayingState: 'SET_PLAYING_STATE',
            setCurrentIndex: 'SET_CURRENT_INDEX',
            setPlayMode: 'SET_PLAY_MODE',
            setPlayList: 'SET_PLAYLIST'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList'
        ])
    },
}

export const searchMixin = {
    data() {
        return {
            query: ''
        }
    },
    computed: {
        ...mapGetters([
            'searchHistory'
        ])
    },
    methods: {
        onQueryChange(query) {
            this.query = query;
        },
        addQuery(query) {
            this.$refs.searchBox.setQuery(query);
        },
        saveSearch() {
            this.saveSearchHistory(this.query);
        },
        ...mapActions([
            'saveSearchHistory',
            'deleteSearchHistory',
            'clearSearchHistory'
        ])
    }
}