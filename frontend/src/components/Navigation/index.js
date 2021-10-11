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
                <NavLink to='/' exact className='nav-link'>Home</NavLink>
                {loggedInUser ?
                    <>
                        <NavLink to='/artists' exact className='nav-link'>Artists</NavLink>
                        <NavLink to='/albums' exact className='nav-link'>Albums</NavLink>
                        <NavLink to='/songs' exact className='nav-link'>Songs</NavLink>
                        <NavLink to={`/profile/${loggedInUser.id}`} exact className='nav-link'>Profile</NavLink>
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
};