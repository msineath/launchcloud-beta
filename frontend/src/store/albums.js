import {csrfFetch} from './csrf';

const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';

const loadAlbums = albums => {
    return {type: LOAD_ALBUMS, albums};
};

export const getAlbums = () => async dispatch => {
    const res = await csrfFetch('/api/albums');

    if(res.ok) {
        const list = await res.json();

        dispatch(loadAlbums(list))
    }
}

const initialState = {albums: []};

const albumsReducer = (state=initialState, action) => {
 switch (action.type) {
     case LOAD_ALBUMS: {
        const fetchRes = {};
        const albumsArr = Array.from(action.albums['albums']);

        albumsArr.map(album => fetchRes[album.id] = album);
        return fetchRes;
     }
     default:
        return state;
 }   
}

export default albumsReducer;