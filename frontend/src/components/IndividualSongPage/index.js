import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getSongs, removeSong, updateOneSong } from '../../store/songs';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import { getSongCredits } from '../../store/songCredits';
import './IndividualSongPage.css';

export default function IndividualSongPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {songId} = useParams();
    
    const sessionUser = useSelector((state => state.session.user));
    
    const song = useSelector(state => state.songs[songId]);
    const albums = useSelector(state => state.albums);
    
    const artists = useSelector(state => state.artists);
    const artistsArray = Object.values(artists);

    const songCredits = useSelector(state => state.songCredits);
    const songCreditsArray = Object.values(songCredits);

    const selectedSongCredits = songCreditsArray.filter(credit => credit.songId === song.id);
    const allCreditNames = selectedSongCredits.map(credit => Object.values(artistsArray).find(artist =>  credit.artistId === artist.id));

    const [visible, setVisible] = useState(false);
    const [targetKey, setTargetKey] = useState(null);
    const [buttonText, setButtonText] = useState(null);
    const [areaText, setAreaText] = useState(null);
    
    useEffect(() => {
        dispatch(getSongs());
        dispatch(getAlbums());
        dispatch(getArtists());
        dispatch(getSongCredits());
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
        dispatch(removeSong(Number(songId)));
        history.push('/songs');
    };

    const updateSongData = () => {
        dispatch(updateOneSong(songId, {targetKey, areaText}));
    };

    return (
        <>
        <img src='https://m.foolcdn.com/media/dubs/images/stock_chart_up_2.original.jpg' alt='background'/>
            <h1>Song's Page</h1>
            <div>
            <ul>
                <li key='title'>
                    Title: 
                    {song?.title}
                    {creatorOptions('Edit', (e) => {
                    setVisible(true)
                    setTargetKey(e.target.id)
                    setButtonText('Edit Song Title')
                    }, 'title')}
                </li>
                <li key='artist(s)'>
                    Artist(s):
                    <ul>
                        {allCreditNames.map((credit, index) => {
                            return(
                                <li key={`song-credit.${index}`}>
                                    <Link to={`/artists/${credit?.id}`}>
                                        {credit.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </li>
                <li key='album'>
                    Album:
                    {<Link to={`/albums/${song?.albumId}`}>
                        {albums[song?.albumId]?.name}    
                    </Link>}
                    {creatorOptions('Edit', (e) => {
                        setVisible(true)
                        setTargetKey(e.target.id)
                        setButtonText('Edit Album Name')
                    }, 'albumId')}
                </li>
                <li key='genre'>
                    Genre:
                    {song?.genre}
                    {creatorOptions('Edit', (e) => {
                        setVisible(true)
                        setTargetKey(e.target.id)
                        setButtonText('Edit Song Genre')
                    }, 'genre')}   
                </li>
                <li key='release-date'>
                    Release Date:
                    {date}
                    {creatorOptions('Edit', (e) => {
                        setVisible(true)
                        setTargetKey(e.target.id)
                        setButtonText('Edit Release Date')
                    }, 'releaseDate')}
                </li>
                {creatorOptions('Delete', deleteFromDb, 'delete-btn')}
            </ul>
            <div>
                <textarea hidden={!visible} placeholder='test' onChange={(e) => setAreaText(e.target.value)}></textarea>
                <button id={targetKey} hidden={!visible} onClick={updateSongData}>{buttonText}</button>
            </div>
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