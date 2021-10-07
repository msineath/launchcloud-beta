import { csrfFetch } from "./csrf";

const LOAD_SONG_COMMENTS = 'songcomments/LOAD_SONG_COMMENTS';
const ADD_SONG_COMMENT = 'songComments/ADD_SONG_COMMENTS';
const EDIT_SONG_COMMENT = 'songComments/EDIT_SONG_COMMENT';


const loadSongComments = comments => {
    return {type: LOAD_SONG_COMMENTS,
            payload: comments};
};

const addSongComment = comment => {
    return {type: ADD_SONG_COMMENT,
            payload: comment};
};

const editSongComment = comment => {
    return {type: EDIT_SONG_COMMENT,
            payload: comment};
};

export const getSongComments = () => async dispatch => {
    const res = await csrfFetch('/api/songComments');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadSongComments(list));
    }
};

export const addNewSongComment = (songId, commentText, userId) => async dispatch => {
    const res = await csrfFetch(`/api/songComments/add/${songId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            commentText,
            userId
        })
    });
    if(res.ok) {
        const comment = await res.json();
        dispatch(addSongComment(comment));
    };
};

export const updateComment = (id, commentText) => async dispatch => {
    const res = await csrfFetch(`/api/songComments/edit/${id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            commentText
        })
    });

    if(res.ok) {
        const comment = await res.json();
        dispatch(editSongComment(comment[1][0]));
    };
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
        case ADD_SONG_COMMENT: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        case EDIT_SONG_COMMENT: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
};

export default songCommentsReducer;