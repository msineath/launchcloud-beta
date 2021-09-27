import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {getSongs} from '../../store/songs';
import './SongsPage.css';

export default function SongsPage() {
    const dispatch = useDispatch();
    const songs = useSelector(state => state.songs);
    
    useEffect (() => {
        dispatch(getSongs())
    }, [dispatch]);
    
    const songsArr = Object.values(songs)

    return (
        <>
            <img src='https://m.foolcdn.com/media/dubs/images/stock_chart_up_2.original.jpg' alt='background'/>
            <h1>Songs Page</h1>
            <div className='songsDisplay'>
                <ul className='songs'>
                    {/* TODO: CHANGE LIST ITEMS TO DISPLAY BLOCK DIV FOR SONG THAT IS A CLICKABLE LINK */}
                    {songsArr.map((song, i) => <li key={i}><NavLink to={`/songs/${song.id}`} className='songLink'>{song.title}</NavLink></li>)}
                </ul>
            </div>
        </>
        )
};