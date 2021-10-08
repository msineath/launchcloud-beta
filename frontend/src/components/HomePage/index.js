import{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink, Redirect} from 'react-router-dom';
import {getAlbums} from '../../store/albums';
import { getSongs } from '../../store/songs';
import { getArtists } from '../../store/artists';
import { getAlbumCredits } from '../../store/albumCredits';
import { getSongCredits } from '../../store/songCredits';
import { getAlbumLikes } from '../../store/albumLikes';
import { getSongLikes } from '../../store/songLikes';
import { getAlbumComments } from '../../store/albumComments';
import { getSongComments } from '../../store/songComments';

import './HomePage.css';
import recordImage from './record-image.png';
import musicNote from './music-notes.png';
import musician from './musicians.png';

export default function HomePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAlbums())
        dispatch(getSongs())
        dispatch(getArtists())
        dispatch(getAlbumCredits())
        dispatch(getSongCredits())
        dispatch(getAlbumLikes())
        dispatch(getSongLikes())
        dispatch(getAlbumComments())
        dispatch(getSongComments())
    }, [dispatch]);
    
    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return (
        <div>
            <h1 className='home-welcome'>
                Welcome, {sessionUser.username}!
            </h1>
            <h2 className='instruction'>
                Browse Our Selection By Category
            </h2>
            <div className='options'>
                <div className='cell'>
                    <label className='choice'>
                        Musicians
                    </label>
                    <a href='/artists'>
                        <img className='icon' src={musician} alt='musicians' />
                    </a>
                </div>
                <div className='cell'>
                    <label className='choice'>
                        Songs
                    </label>
                    <a href='/songs'>
                    <img className='icon' src={musicNote} alt='music-notes' />
                    </a>
                </div>
                <div className='cell'>
                    <label className='choice'>
                        Albums
                    </label>
                    <a href='/albums'>
                        <img className='icon' src={recordImage} alt='record' />
                    </a>
                </div>
            </div>
        </div> 
    )
};