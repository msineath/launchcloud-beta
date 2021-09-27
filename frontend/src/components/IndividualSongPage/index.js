import {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getSongs} from '../../store/songs';
import { getAlbums } from '../../store/albums';
import './IndividualSongPage.css';

export default function IndividualSongPage() {
    const dispatch = useDispatch();
    const {songId} = useParams();
    
    const song = useSelector(state => state.songs[songId]);
    const albums = useSelector(state => state.albums);
    
    useEffect(() => {
        dispatch(getSongs());
        dispatch(getAlbums());
    }, [dispatch])
    
    let date = (function () {
        const i = song?.releaseDate.indexOf('T');
        return song?.releaseDate.slice(0, i);
    })();

    return (
        <>
        <img src='https://m.foolcdn.com/media/dubs/images/stock_chart_up_2.original.jpg' alt='background'/>
            <h1>Song's Page</h1>
            <div>
            <ul>
                <li>
                    Title: 
                    {song?.title}
                </li>
                <li>
                    Album:
                    {albums[song?.albumId]?.name}    
                </li>
                <li>
                    Genre:
                    {song?.genre}    
                </li>
                <li>
                    Release Date:
                    {date}
                </li>
            </ul>
            </div>
            <div className='song'>
                {song?.audioTrackUrl ?
                    <audio controls>
                        <source src={song.audioTrackUrl}></source>
                    </audio>
                : null}
            </div>            
        </>
    )
};