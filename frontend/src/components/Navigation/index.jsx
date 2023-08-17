import { NavLink } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {logoutThunk} from '../../store/session';
import './Navigation.css';

export default function Navigation(loggedIn) {

    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.session.user);

    const logout = event => {
        event.preventDefault();
        dispatch(logoutThunk());
    };
    
    return(
        <>
            <ul className='nav-links'>
                <NavLink to='/' className='nav-link'>Home</NavLink>
                {loggedInUser ?
                    <>
                        <NavLink to='/artists' className='nav-link'>Artists</NavLink>
                        <NavLink to='/albums' className='nav-link'>Albums</NavLink>
                        <NavLink to='/songs' className='nav-link'>Songs</NavLink>
                        <NavLink to={`/profile/${loggedInUser.id}`} className='nav-link'>Profile</NavLink>
                        <button onClick={logout}>Logout</button>
                    </>
                :
                    <>
                        <NavLink to='/login' className='nav-link'>Login</NavLink>
                        <NavLink to='/signup' className='nav-link'>Create an Account</NavLink>
                    </>
                }
            </ul>
        </>
    );
}
