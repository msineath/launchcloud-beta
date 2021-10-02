import { csrfFetch } from "./csrf";

const LOAD_SONG_CREDITS = 'songCredits/LOAD_SONG_CREDITS';

const loadSongCredits = credits => {
    return {type: LOAD_SONG_CREDITS,
            payload: credits};
};

export const getSongCredits = () => async dispatch => {
    const res = await csrfFetch('/api/songCredits');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadSongCredits(list));
    }
};

const initialState = {};

const songCreditsReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_SONG_CREDITS: {
            const newState = {};
            const songCreditsArr = Array.from(action.payload);
            songCreditsArr.map((credit, index) => newState[index] = credit);
            return newState;
        }
        default:
            return state;
    }
};

export default songCreditsReducer;