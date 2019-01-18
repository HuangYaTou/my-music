import * as types from './mutation-types'
import { playMode } from '../common/js/config'
import { shuffle } from '../common/js/utl'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from '../common/js/cache'

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id;
    })
}

export const selectPlay = function ({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCE_LIST, list);

    //如果播放模式为随机
    if (state.mode === playMode.random) {
        let randomList = shuffle(list);
        commit(types.SET_PLAYLIST, randomList);
        index = findIndex(randomList, list[index]);
    }
    else {
        commit(types.SET_PLAYLIST, list);
    }
}


