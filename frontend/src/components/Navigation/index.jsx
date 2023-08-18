import { useSelector, useDispatch } from 'react-redux';
import { logoutThunk } from '../../store/session';
import NavButton from './NavButton';
// import './Navigation.css';
import { navClickableStyle, navContainerStyle } from '../../library/tailwindMulticlasses';

export default function Navigation() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.session.user);

  const logout = (event) => {
    event.preventDefault();
    dispatch(logoutThunk());
  };

  return (
    <>
      <div className={navContainerStyle}>
        {loggedInUser ? (
          <>
            <NavButton linkPath='/' text='Home' />
            <NavButton linkPath='/artists' text='Artists' />
            <NavButton linkPath='/albums' text='Albums' />
            <NavButton linkPath='/songs' text='Songs' />
            <NavButton linkPath={`/profile/${loggedInUser.id}`} text='Profile' />
            <button onClick={logout} className={navClickableStyle('danger')}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavButton linkPath='/login' text='Login' />
            <NavButton linkPath='/signup' text='Create an Account' />
          </>
        )}
      </div>
    </>
  );
}
