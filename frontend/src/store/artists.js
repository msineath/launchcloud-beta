import { csrfFetch } from './csrf';

const LOAD_ARTISTS = 'artists/LOAD_ARTISTS';

const loadArtists = (artists) => {
  return { type: LOAD_ARTISTS, payload: artists };
};

export const getArtists = () => async (dispatch) => {
  const res = await csrfFetch('/api/artists');

  if (res.ok) {
    const list = await res.json();
    dispatch(loadArtists(list));
  }
};

const initialState = { artists: {} };

const artistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTISTS: {
      const newState = {};
      const artistsArr = Array.from(action.payload);
      artistsArr.map((artist) => (newState[artist.id] = artist));
      return newState;
    }
    default:
      return state;
  }
};

export default artistsReducer;
