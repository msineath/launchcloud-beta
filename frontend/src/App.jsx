import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { restoreThunk } from './store/session';
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
import ProfilePage from './components/ProfilePage';

function App() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    dispatch(restoreThunk).then(() => setLoggedIn(true));
  }, [dispatch]);

  return (
    <>
      <Navigation loggedIn={loggedIn} />
      {loggedIn && (
        <>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginFormPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/albums' element={<AlbumsPage />} />
            <Route path='/albums/:albumId' element={<IndividualAlbumPage />} />
            <Route path='/songs' element={<SongsPage />} />
            <Route path='/songs/:songId' element={<IndividualSongPage />} />
            <Route path='/artists' element={<ArtistsPage />} />
            <Route
              path='/artists/:artistId'
              element={<IndividualArtistPage />}
            />
            <Route path='/profile/:userId' element={<ProfilePage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
