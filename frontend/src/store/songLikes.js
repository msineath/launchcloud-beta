import { csrfFetch } from "./csrf";

const LOAD_SONG_LIKES = 'songCredits/LOAD_SONG_LIKES';

const loadSongLikes = likes => {
    return {type: LOAD_SONG_LIKES,
            payload: likes};
};

export const getSongLikes = () => async dispatch => {
    const res = await csrfFetch('/api/songLikes');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadSongLikes(list));
    }
};

const initialState = {};

const songLikesReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_SONG_LIKES: {
            const newState = {};
            const songLikesArr = Array.from(action.payload);
            songLikesArr.map(like => newState[like.id] = like);
            return newState;
        }
        default:
            return state;
    }
};

export default songLikesReducer;