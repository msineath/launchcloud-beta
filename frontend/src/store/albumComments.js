import { csrfFetch } from './csrf';

const LOAD_ALBUM_COMMENTS = 'albumcomments/LOAD_ALBUM_COMMENTS';
const ADD_ALBUM_COMMENT = 'albumComments/ADD_ALBUM_COMMENTS';
const EDIT_ALBUM_COMMENT = 'albumComments/EDIT_ALBUM_COMMENT';
const DELETE_ALBUM_COMMENT = 'albumComments/DELETE_ALBUM_COMMENT';

const loadAlbumComments = (comments) => ({
  type: LOAD_ALBUM_COMMENTS,
  payload: comments,
});

const addAlbumComment = (comment) => ({
  type: ADD_ALBUM_COMMENT,
  payload: comment,
});

const editAlbumComment = (comment) => ({
  type: EDIT_ALBUM_COMMENT,
  payload: comment,
});

const deleteAlbumComment = (comment) => ({
  type: DELETE_ALBUM_COMMENT,
  payload: comment,
});

export const getAlbumComments = () => async (dispatch) => {
  const res = await csrfFetch('/api/albumComments');
  if (res.ok) {
    const list = await res.json();
    dispatch(loadAlbumComments(list));
  }
};

export const addNewAlbumComment =
  (albumId, commentText, userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/albumComments/add/${albumId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commentText,
        userId,
      }),
    });
    if (res.ok) {
      const comment = await res.json();
      dispatch(addAlbumComment(comment));
    }
  };

export const updateComment = (id, commentText) => async (dispatch) => {
  const res = await csrfFetch(`/api/albumComments/edit/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      commentText,
    }),
  });
  if (res.ok) {
    const comment = await res.json();
    dispatch(editAlbumComment(comment[1][0]));
  }
};

export const removeComment = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/albumComments/delete/${id}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    const comment = await res.json();
    dispatch(deleteAlbumComment(comment));
  }
};

const initialState = {};

const albumCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALBUM_COMMENTS: {
      const newState = {};
      const albumCommentsArr = Array.from(action.payload);
      albumCommentsArr.map((comment) => (newState[comment.id] = comment));
      return newState;
    }
    case ADD_ALBUM_COMMENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_ALBUM_COMMENT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_ALBUM_COMMENT: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    default:
      return state;
  }
};

export default albumCommentsReducer;
