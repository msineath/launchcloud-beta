import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';
import albumsReducer from './albums';
import songsReducer from './songs';
import artistsReducer from './artists';
import albumCreditsReducer from './albumCredits';
import songCreditsReducer from './songCredits';
import albumLikesReducer from './albumLikes';
import songLikesReducer from './songLikes';

const rootReducer = combineReducers({
    session: sessionReducer,
    albums: albumsReducer,
    songs: songsReducer,
    artists: artistsReducer,
    albumCredits: albumCreditsReducer,
    songCredits: songCreditsReducer,
    albumLikes: albumLikesReducer,
    songLikes: songLikesReducer
});

let enhancer;

if(process.env.NODE_ENV === 'production') enhancer = applyMiddleware(thunk);
else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
};

const configureStore = preloadedState => createStore(rootReducer, preloadedState, enhancer);

export default configureStore;