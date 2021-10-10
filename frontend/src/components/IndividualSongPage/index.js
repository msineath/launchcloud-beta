import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, useHistory, Redirect } from 'react-router-dom';
import { getSongs, removeSong, updateOneSong } from '../../store/songs';
import { getArtists } from '../../store/artists';
import { getAlbums } from '../../store/albums';
import { getSongCredits } from '../../store/songCredits';
import { getSongLikes, SongLikeCreateUpdate } from '../../store/songLikes';
import './IndividualSongPage.css';
import { getSongComments, addNewSongComment, updateComment, removeComment } from '../../store/songComments';

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

    if(!sessionUser) return (
        <Redirect to='/login' />
    );
    
    const date = (function () {
        const i = song?.releaseDate.indexOf('T');
        return song?.releaseDate.slice(0, i);
    })();

    const creatorOptions = (buttonText, onClickFunction, newId) => {
        
        if(sessionUser?.id === song?.uploaderId) {

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

    const editComment = event => {
        event.preventDefault();
        if(commentText.length === 0) {
            return;
        }
        dispatch(updateComment(event.target.value, commentText));
        setCommentText('');
    };

    const commentDelete = event => {
        event.preventDefault();
        dispatch(removeComment(event.target.value));
    };

    return (
        <div className='frame'>
            <div className='individual-song-header'>
                <h1 className='song-title'>{song?.title}</h1>
                <div className='like-buttons'>
                    <button onClick={likeToggle}>like</button>
                    <button onClick={likeToggle}>dislike</button>
                </div>
            </div>
            <div className='song-data-parent'>
                <div className='individual-song-info'>
                    <label className='data-tag'>
                        Title:
                    </label>
                    <label>
                        {song?.title}
                        {creatorOptions('Edit', (e) => {
                        setVisible(true)
                        setTargetKey(e.target.id)
                        setButtonText('Edit Song Title')
                        }, 'title')}
                    </label>
                    <div className='list-of-artists'>
                        <label className='data-tag'>
                            Artist(s):
                        </label>
                        <label>
                        {allCreditNames.map((credit, index) => {
                            return(
                                // <label key={`song-credit.${index}`}>
                                <Link to={`/artists/${credit?.id}`} className='artists-name'>
                                    {credit?.name}
                                </Link>
                                // </label>
                            )
                        })}
                        </label>
                    </div>
                    <div className='name-of-album'>
                        <label className='data-tag'>
                            Album:
                        </label>
                        <label>
                            {
                                <Link to={`/albums/${song?.albumId}`} id='album-link'>
                                    {albums[song?.albumId]?.name}    
                                </Link>
                            }
                            {creatorOptions('Edit', (e) => {
                                setVisible(true)
                                setTargetKey(e.target.id)
                                setButtonText('Edit Album Name')
                            }, 'albumId')}
                        </label>
                    </div>
                    <div className='genre-info'>
                        <label className='data-tag'>
                            Genre:
                        </label>
                        <label>
                            {song?.genre}
                            {creatorOptions('Edit', (e) => {
                                setVisible(true)
                                setTargetKey(e.target.id)
                                setButtonText('Edit Song Genre')
                            }, 'genre')}   
                        </label>
                    </div>
                    <div className='release-date-info'>
                        <label className='data-tag'>
                            Release Date:
                        </label>
                        <label>
                            {date}
                            {creatorOptions('Edit', (e) => {
                                setVisible(true)
                                setTargetKey(e.target.id)
                                setButtonText('Edit Release Date')
                            }, 'releaseDate')}
                        </label>
                    </div>
                    <div className='edit-song-data'>
                        <textarea hidden={!visible} placeholder='Update Info Here' onChange={(e) => setAreaText(e.target.value)}></textarea>
                        <button id={targetKey} hidden={!visible} onClick={updateSongData}>{buttonText}</button>
                    </div>
                </div>
                <div className='song'>
                    {song?.audioTrackUrl ?
                        <audio controls>
                            <source src={song.audioTrackUrl}></source>
                        </audio>
                    : null}
                    {creatorOptions('Delete', deleteFromDb, 'delete-btn')}
                </div>
                
            </div>
            <div className='song-comments'>    
                    <form
                        onSubmit={addComment}
                        className='song-comment-box'>
                            <textarea
                                className='song-comment-textarea'
                                placeholder='Add Your Comment Here, Then Click Add or Edit'
                                value={commentText}
                                onChange={event => setCommentText(event.target.value)}>
                            </textarea>
                            <button type='submit'>
                                Add A Comment
                            </button>
                    </form>
                    {commentsOnSong ?
                        <div className='all-song-comments'>
                            {commentsOnSong.map((comment, index) => {
                                return(
                                    <div className='comment-for-song'>
                                        <li
                                            key={`comment.${index}`}
                                            className='comment'>
                                            {comment.comment}
                                            {sessionUser?.id === comment.userId ? 
                                            <div
                                            className='song-comment-btns'>
                                                <button
                                                    value={comment.id}
                                                    onClick={editComment}>
                                                    Edit Comment
                                                </button>
                                                <button
                                                    value={comment.id}
                                                    onClick={commentDelete}>
                                                    Delete Comment
                                                </button>
                                            </div>
                                                :null}
                                        </li>
                                    </div>
                                )
                            })}
                        </div>
                    :null}
                </div>          
        </div>
    )
};