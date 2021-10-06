import { csrfFetch } from "./csrf";

const LOAD_ALBUM_COMMENTS = 'albumcomments/LOAD_ALBUM_COMMENTS';
const ADD_ALBUM_COMMENT = 'albumComments/ADD_ALBUM_COMMENTS';

const loadAlbumComments = comments => {
    return {type: LOAD_ALBUM_COMMENTS,
            payload: comments};
};

const addAlbumComment = comment => {
    return {type: ADD_ALBUM_COMMENT,
            payload: comment};
};

export const getAlbumComments = () => async dispatch => {
    const res = await csrfFetch('/api/albumComments');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadAlbumComments(list));
    }
};

export const addNewAlbumComment = (albumId, commentText, userId) => async dispatch => {
    const res = await csrfFetch(`/api/albumComments/add/${albumId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            commentText,
            userId
        })
    });
    if(res.ok) {
        const comment = await res.json();
        dispatch(addAlbumComment(comment));
    };
};

const initialState = {};

const albumCommentsReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUM_COMMENTS: {
            const newState = {};
            const albumCommentsArr = Array.from(action.payload);
            albumCommentsArr.map(comment => newState[comment.id] = comment);
            return newState;
        }
        case ADD_ALBUM_COMMENT: {
            const newState = {...state};
            newState[action.payload.id] = action.payload;
            return newState;
        }
        default:
            return state;
    }
};

export default albumCommentsReducer;