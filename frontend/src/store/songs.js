import {csrfFetch} from './csrf';

const LOAD_SONGS = 'songs/LOAD_SONGS';
const ADD_SONG = 'songs/ADD_SONG';

const loadSongs = songs => {
    return {type: LOAD_SONGS, songs};
};

const addSong = song => {
    const newSong = song.newSong
    return {type: ADD_SONG,
            payload: newSong};
};

export const getSongs = () => async dispatch => {
    const res = await csrfFetch('/api/songs');

    if(res.ok) {
        const list = await res.json();
        dispatch(loadSongs(list));
    };
};

export const addOneSong = songData => async dispatch => {
    const {title, albumId, uploaderId, genre, releaseDate, audioTrackUrl} = songData;
    const formData = new FormData();
    formData.append('title', title);
    formData.append('albumId', albumId);
    formData.append('uploaderId', uploaderId);
    formData.append('genre', genre);
    formData.append('releaseDate', releaseDate);
    formData.append('audioTrackUrl', audioTrackUrl);
    
    
    const res = await csrfFetch('/api/songs/add', {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        body: formData
    });

    if(res.ok) {
        const newSong = await res.json();
        dispatch(addSong(newSong));
        return newSong;
    } else {
        return {"errors": "something went wrong, please try again..."};
    };
};


const initialState = {songs: []};

const songsReducer = (state=initialState, action) => {
 switch (action.type) {
        case LOAD_SONGS: {
            const fetchRes = {};
            const songsArr = Array.from(action.songs['songs']);
            songsArr.map(song => fetchRes[song.id] = song);
            return fetchRes;
        };
        case ADD_SONG: {
            return {...state, [action.payload.id]: action.payload};
        };
        default:
            return state;
 };
};

export default songsReducer;