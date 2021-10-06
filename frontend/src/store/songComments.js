import { csrfFetch } from "./csrf";

const LOAD_SONG_COMMENTS = 'songcomments/LOAD_SONG_COMMENTS';

const loadSongComments = comments => {
    return {type: LOAD_SONG_COMMENTS,
            payload: comments};
};

export const getSongComments = () => async dispatch => {
    const res = await csrfFetch('/api/songComments');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadSongComments(list));
    }
};

const initialState = {};

const songCommentsReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_SONG_COMMENTS: {
            const newState = {};
            const songCommentsArr = Array.from(action.payload);
            songCommentsArr.map(comment => newState[comment.id] = comment);
            return newState;
        }
        default:
            return state;
    }
};

export default songCommentsReducer;