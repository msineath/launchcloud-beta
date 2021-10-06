import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory } from 'react-router-dom';
import { getSongs, removeSong, updateOneSong } from '../../store/songs';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import { getSongCredits } from '../../store/songCredits';
import { getSongLikes, SongLikeCreateUpdate } from '../../store/songLikes';
import './IndividualSongPage.css';
import { getSongComments, addNewSongComment } from '../../store/songComments';

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

    const comments = useSelector(state => state.songComments);
    const commentsArray = Object.values(comments);
    const commentsOnSong = commentsArray.filter(comment => comment.songId === Number(songId));
    const [commentText, setCommentText] = useState('');


    const [visible, setVisible] = useState(false);
    const [targetKey, setTargetKey] = useState(null);
    const [buttonText, setButtonText] = useState(null);
    const [areaText, setAreaText] = useState(null);

    useEffect(() => {
        dispatch(getSongs());
        dispatch(getAlbums());
        dispatch(getArtists());
        dispatch(getSongCredits());
        dispatch(getSongLikes());
        dispatch(getSongComments());
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

    const likeToggle = event => {
        const targetKey = event.target.innerText;
        dispatch(SongLikeCreateUpdate(Number(songId), sessionUser.id, targetKey));
    };

    const addComment = event => {
        event.preventDefault();
        dispatch(addNewSongComment(Number(songId), commentText, sessionUser.id));
        setCommentText('');
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
                <li>
                    Like {song?.title}?
                    <button onClick={likeToggle}>like</button>
                    <button onClick={likeToggle}>dislike</button>
                </li>
                {creatorOptions('Delete', deleteFromDb, 'delete-btn')}
                <li>
                    Comments Section for {song.title}:
                </li>
                {commentsOnSong ?
                    <ul>
                        {commentsOnSong.map((comment, index) => {
                            return(
                                <li key={`comment.${index}`}>
                                    {comment.comment}
                                </li>
                            )
                        })}
                    </ul>
                :null}
                <form onSubmit={addComment}>
                    <textarea
                        placeholder='Add Your Comment Here'
                        value={commentText}
                        onChange={event => setCommentText(event.target.value)}>
                    </textarea>
                    <button type='submit'>
                        Add A Comment
                    </button>
                </form>
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