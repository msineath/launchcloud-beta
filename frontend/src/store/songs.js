import { csrfFetch } from './csrf';

const LOAD_SONGS = 'songs/LOAD_SONGS';
const ADD_SONG = 'songs/ADD_SONG';
const DELETE_SONG = 'songs/DELETE_SONG';
const UPDATE_SONG = 'songs/UPDATE_SONG';

const loadSongs = (songs) => {
  return { type: LOAD_SONGS, payload: songs };
};

const addSong = (song) => {
  return { type: ADD_SONG, payload: song };
};

const deleteSong = (songId) => {
  return { type: DELETE_SONG, payload: songId };
};

const updateSong = (song) => {
  return { type: UPDATE_SONG, payload: song };
};

export const getSongs = () => async (dispatch) => {
  const res = await csrfFetch('/api/songs');

  if (res.ok) {
    const list = await res.json();
    dispatch(loadSongs(list));
  }
};

export const addOneSong = (songData) => async (dispatch) => {
  const { title, albumName, uploaderId, genre, releaseDate, audioTrackUrl } =
    songData;
  const formData = new FormData();
  formData.append('title', title);
  formData.append('albumName', albumName);
  formData.append('uploaderId', uploaderId);
  formData.append('genre', genre);
  formData.append('releaseDate', releaseDate);
  formData.append('audioTrackUrl', audioTrackUrl);

  const res = await csrfFetch('/api/songs/add', {
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    body: formData,
  });

  if (res.ok) {
    const newSong = await res.json();
    dispatch(addSong(newSong['newSong']));
    return newSong['newSong'];
  } else {
    return { errors: 'something went wrong, please try again...' };
  }
};

export const removeSong = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${id}/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (res.ok) {
    let song = await res.json();
    dispatch(deleteSong(song));
  }
};

export const updateOneSong = (id, updatedData) => async (dispatch) => {
  const res = await csrfFetch(`/api/songs/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });

  if (res.ok) {
    const newData = await res.json();
    dispatch(updateSong(newData));
    return newData;
  }
};

const initialState = { songs: {} };

const songsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SONGS: {
      const newState = {};
      const songsArray = action.payload;
      songsArray.map((song) => (newState[song.id] = song));
      return newState;
    }
    case ADD_SONG: {
      let newState = { ...state, [action.payload.id]: action.payload };
      return newState;
    }
    case DELETE_SONG: {
      const newState = { ...state };
      delete newState[action.payload.id];
      return newState;
    }
    case UPDATE_SONG: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
};

export default songsReducer;
