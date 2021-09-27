import {Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {restoreThunk} from './store/session';
import LoginFormPage from './components/loginFormPage';
import SignupPage from './components/SignupFormPage';
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
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupPage />
        </Route>
      </Switch>
    )}
    </>
  ) 
}

export default App;
