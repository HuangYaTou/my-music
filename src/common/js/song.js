export default class Song {
    constructor({ is, mid, singer, name, album, duration, image, url, aliaName }) {
        this.id = id;
        // this.mid = mid;
        this.singer = singer;
        this.name = name;
        this.album = album;
        // this.duration = duration;
        this.image = image;
        // this.url = url;
        this.aliaName = aliaName;
    }
}

function singerName(arr) {
    let name = [];
    name = arr.map((item) => {
        return item.name;
    });
    return name.join('/');
}

export function createRecommendSong(music) {
    return new Song({
        id: music.id,
        singer: singerName(music.song.artists),
        name: music.name,
        album: music.song.album.name,
        image: music.song.album.picUrl
    });
}

export function createRecommendListSong(music) {
    return new Song({
        id: music.id,
        singer: singerName(music.artists),
        name: music.name,
        album: music.album.name,
        image: music.album.picUrl
    });
}

export function createSong(music) {
    return new Song({
        id: music.id,
        singer: singerName(music.ar),
        name: music.name,
        album: music.al.album,
        image: music.al.picUrl
    });
}

export function createSearchSong(music) {
    return new Song({
        id: music.id,
        singer: singerName(music.artists),
        name: music.name,
        album: music.album.name
    });
}