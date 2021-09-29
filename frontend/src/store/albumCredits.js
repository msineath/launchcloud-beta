import albumsReducer from "./albums";
import { csrfFetch } from "./csrf";

const LOAD_ALBUM_CREDITS = 'albumcredits/LOAD_ALBUM_CREDITS';

const loadAlbumCredits = credits => {
    return {type: LOAD_ALBUM_CREDITS,
            payload: credits};
};

const getAlbumCredits = () => async dispatch => {
    const res = await fetch('/api/albumCredits');
    if(res.ok) {
        const list = await res.json();
        dispatch(loadAlbumCredits(list));
    }
};

const initialState = {};

const albumCreditsReducer = (state=initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUM_CREDITS: {
            const newState = {};
            const albumCreditsArr = Array.from(action.payload);
            albumCreditsArr.map(credit => newState[credit.id] = credit);
            return newState;
        }
        default:
            return state;
    }
};

export default albumCreditsReducer;