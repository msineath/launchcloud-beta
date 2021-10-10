import { NavLink } from "react-router-dom";
import {useSelector} from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

export default function Navigation(loggedIn) {
    const loggedInUser = useSelector(state => state.session.user);

    let linkLocations;

    if(loggedInUser) linkLocations = <ProfileButton user={loggedInUser} />;
    else linkLocations = 
        <>
        <NavLink to='/login'>Login</NavLink>
        <NavLink to='/signup'>Create an Account</NavLink>
        </>
    
    return(
        <>
            <ul>
                <NavLink to='/' exact>Home</NavLink>
                <NavLink to='/artists' exact>Artists</NavLink>
                <NavLink to='/albums' exact>Albums</NavLink>
                <NavLink to='/songs' exact>Songs</NavLink>
            </ul>
                {loggedIn && linkLocations}
        </>
    );
};