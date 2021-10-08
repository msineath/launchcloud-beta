import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import './SongsPage.css';
import musicNote from '../HomePage/music-notes.png';

export default function SongsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs);
    const songsArr = Object.values(songs)
    
    useEffect (() => {
        dispatch(getSongs())
    }, [dispatch]);

    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return (
        <div className='frame'>
            <h1 className='page-title'>
                Songs Page
            </h1>
            {/* <div className='songsDisplay'> */}
                <div className='songs'>
                    {/* TODO: CHANGE LIST ITEMS TO DISPLAY BLOCK DIV FOR SONG THAT IS A CLICKABLE LINK */}
                    {songsArr.map((song, i) => 
                        <div className='cell'>
                            <a href={`/songs/${song.id}`}>
                                <img className='song-icon' src={musicNote} alt='music-notes' />
                                <label
                                    className='song-choice'>
                                    {song.title}
                                </label>
                            </a>
                        </div>
                    )}
                </div>
            {/* </div> */}
            
        </div>
        )
};