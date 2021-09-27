import {csrfFetch} from './csrf';

const LOAD_SONGS = 'songs/LOAD_SONGS';

const loadSongs = songs => {
    return {type: LOAD_SONGS, songs};
};

export const getSongs = () => async dispatch => {
    const res = await csrfFetch('/api/songs');

    if(res.ok) {
        const list = await res.json();
        dispatch(loadSongs(list));
    };
};


const initialState = {};

const songsReducer = (state=initialState, action) => {
 switch (action.type) {
        case LOAD_SONGS: {
            const fetchRes = {};
            const songsArr = Array.from(action.songs['songs']);
            songsArr.map(song => fetchRes[song.id] = song);
            return fetchRes;
        };
    default:
        return state;
 };
};

export default songsReducer;