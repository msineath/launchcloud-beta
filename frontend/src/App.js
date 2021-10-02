import {Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {restoreThunk} from './store/session';
import Navigation from './components/Navigation/';
import HomePage from './components/HomePage';
import LoginFormPage from './components/LoginFormPage';
import SignupPage from './components/SignupFormPage';
import AlbumsPage from './components/AlbumsPage';
import SongsPage from './components/SongsPage';
import ArtistsPage from './components/ArtistsPage';
import IndividualAlbumPage from './components/IndividualAlbumPage';
import IndividualSongPage from './components/IndividualSongPage';
import IndividualArtistPage from './components/IndividualArtistPage';
function App() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    dispatch(restoreThunk)
      .then(() => setLoggedIn(true));
  }, [dispatch]);

  return(
    <>
    <Navigation loggedIn={loggedIn} />
    {loggedIn && (
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/login' exact>
          <LoginFormPage />
        </Route>
        <Route path='/signup' exact>
          <SignupPage />
        </Route>
        <Route path='/albums' exact>
          <AlbumsPage />
        </Route>
        <Route path='/songs' exact>
          <SongsPage />
        </Route>
        <Route path='/artists' exact>
          <ArtistsPage />
        </Route>
        <Route path='/albums/:albumId' exact>
          <IndividualAlbumPage />
        </Route>
        <Route path='/songs/:songId' exact>
          <IndividualSongPage />
        </Route>
        <Route path='/artists/:artistId' exact>
          <IndividualArtistPage />
        </Route>
      </Switch>
    )}
    </>
  ) 
}

export default App;
