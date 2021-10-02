import { csrfFetch } from "./csrf";

const LOAD_ALBUM_LIKES = 'albumCredits/LOAD_ALBUM_LIKES';

const loadAlbumLikes = likes => {
    return {type: LOAD_ALBUM_LIKES,
            payload: likes};
};

export const getAlbumLikes = () => async dispatch => {
    const res = await csrfFetch('/api/albumLikes');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadAlbumLikes(list));
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
        default:
            return state;
    }
};

export default albumLikesReducer;