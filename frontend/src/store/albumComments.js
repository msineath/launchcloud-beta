import { csrfFetch } from "./csrf";

const LOAD_ALBUM_COMMENTS = 'albumcomments/LOAD_ALBUM_COMMENTS';

const loadAlbumComments = comments => {
    return {type: LOAD_ALBUM_COMMENTS,
            payload: comments};
};

export const getAlbumComments = () => async dispatch => {
    const res = await csrfFetch('/api/albumComments');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadAlbumComments(list));
    }
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
        default:
            return state;
    }
};

export default albumCommentsReducer;