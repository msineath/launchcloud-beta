import { csrfFetch } from "./csrf";

const LOAD_ALBUM_LIKES = 'albumCredits/LOAD_ALBUM_LIKES';
const UPDATE_ALBUM_LIKES = 'albumCredits/UPDATE_ALBUM_CREDITS';

const loadAlbumLikes = likes => {
    return {type: LOAD_ALBUM_LIKES,
            payload: likes};
};

const updateAlbumLikes = like => {
    return {type: UPDATE_ALBUM_LIKES,
            payload: like}
};

export const getAlbumLikes = () => async dispatch => {
    const res = await csrfFetch('/api/albumLikes');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadAlbumLikes(list));
    }
};

export const createUpdate = (albumId, userId, targetKey) => async dispatch => {
    const res = await csrfFetch(`/api/albumLikes/${albumId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            userId,
            targetKey
        })
    });

    if(res.ok) {
        const like = await res.json();
        dispatch(updateAlbumLikes(like));
    }
};

const initialState = {};

const albumLikesReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUM_LIKES: {
            const newState = {};
            const albumLikesArr = Array.from(action.payload);
            albumLikesArr.map(like => newState[like.id] = like);
            return newState;
        }
        case UPDATE_ALBUM_LIKES: {
            const newState = {...state};
            newState[action.payload.id] = action.payload
            return newState;
        }
        default:
            return state;
    }
};

export default albumLikesReducer;