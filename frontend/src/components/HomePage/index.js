import{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import {getAlbums} from '../../store/albums';
import { getSongs } from '../../store/songs';
import './HomePage.css';
import backgroundImage from './background-image.jpg';

export default function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getSongs())
    }, [dispatch]);
    
    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return (
        <div>
            <img src={backgroundImage} alt='background'/>
                <h1>Welcome, {sessionUser.username}!</h1>
                <ul className='pages'>
                    <li><NavLink to='/albums' className='pages'>Albums</NavLink></li>
                    <li><NavLink to='/songs' className='pages'>Songs</NavLink></li>
                </ul>
        </div> 
    )
};