import {Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {restoreThunk} from './store/session';
import HomePage from './components/HomePage';
import LoginFormPage from './components/LoginFormPage';
import SignupPage from './components/SignupFormPage';
import AlbumsPage from './components/HomePage/AlbumsPage';
import Navigation from './components/Navigation/';

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
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
        <Route path='/albums'>
          <AlbumsPage />
        </Route>
      </Switch>
    )}
    </>
  ) 
}

export default App;
