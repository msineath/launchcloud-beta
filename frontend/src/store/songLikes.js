import { csrfFetch } from './csrf';

const LOAD_SONG_LIKES = 'songCredits/LOAD_SONG_LIKES';
const UPDATE_SONG_LIKES = 'songCredits/UPDATE_SONG_CREDITS';

const loadSongLikes = (likes) => ({
  type: LOAD_SONG_LIKES,
  payload: likes,
});

const updateSongLikes = (like) => ({
  type: UPDATE_SONG_LIKES,
  payload: like,
});

export const getSongLikes = () => async (dispatch) => {
  const res = await csrfFetch('/api/songLikes');
  if (res.ok) {
    const list = await res.json();
    dispatch(loadSongLikes(list));
  }
};

export const SongLikeCreateUpdate =
  (songId, userId, targetKey) => async (dispatch) => {
    const res = await csrfFetch(`/api/songLikes/${songId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        targetKey,
      }),
    });

    if (res.ok) {
      const like = await res.json();
      dispatch(updateSongLikes(like));
    }
  };

const initialState = {};

const songLikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONG_LIKES: {
      const newState = {};
      const songLikesArr = Array.from(action.payload);
      songLikesArr.map((like) => (newState[like.id] = like));
      return newState;
    }
    case UPDATE_SONG_LIKES: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default songLikesReducer;
