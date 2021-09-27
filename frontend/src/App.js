import {Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {restoreThunk} from './store/session';
import Navigation from './components/Navigation/';
import HomePage from './components/HomePage';
import LoginFormPage from './components/LoginFormPage';
import SignupPage from './components/SignupFormPage';
import AlbumsPage from './components/HomePage/AlbumsPage';
import IndividualAlbumPage from './components/IndividualAlbumPage';

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
        <Route path='/albums/:albumId' exact>
          <IndividualAlbumPage />
        </Route>
      </Switch>
    )}
    </>
  ) 
}

export default App;
