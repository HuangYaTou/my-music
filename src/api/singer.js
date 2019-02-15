import axios from 'axios'
import { HOST } from '../common/js/config'
//调用此接口 , 可获取热门歌手数据
export function getSingers() {
    const url = HOST + '/top/artists?limit=100';
    return axios.get(url);
}
//调用此接口 , 传入歌手 id, 可获得歌手部分信息和热门歌曲
export function getSingerDetail(singerId) {
    const url = HOST + `/artists?id=${singerId}`;
    return axios.get(url);
}
export function getMusic(musicId) {
    // const url = HOST + `/music/url?id=${musicId}`;
    const url = HOST + `/song/url?id=${musicId}`;
    return axios.get(url);
}