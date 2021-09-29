import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getSongs, removeSong } from '../../store/songs';
import { getAlbums } from '../../store/albums';
import './IndividualSongPage.css';

export default function IndividualSongPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {songId} = useParams();
    
    const sessionUser = useSelector((state => state.session.user));
    const song = useSelector(state => state.songs[songId]);
    const albums = useSelector(state => state.albums);
    
    useEffect(() => {
        dispatch(getSongs());
        dispatch(getAlbums());
    }, [dispatch])
    
    const date = (function () {
        const i = song?.releaseDate.indexOf('T');
        return song?.releaseDate.slice(0, i);
    })();

    const creatorOptions = (buttonText, onClickFunction, newId) => {
        
        if(sessionUser.id === song?.uploaderId) {

            return(
                <button id={newId} onClick={onClickFunction}>{buttonText}</button>
                )
        };
        return;
    };
    
    const deleteFromDb = event => {
        event.preventDefault();
        dispatch(removeSong(Number(songId)))
        history.push('/songs')
    }

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
                    {<Link to={`/albums/${song?.albumId}`}>
                        {albums[song?.albumId]?.name}    
                    </Link>}
                </li>
                <li>
                    Genre:
                    {song?.genre}    
                </li>
                <li>
                    Release Date:
                    {date}
                </li>
                {creatorOptions('Delete', deleteFromDb, 'delete-btn')}
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