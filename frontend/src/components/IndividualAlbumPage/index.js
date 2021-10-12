import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';
import { getArtists } from '../../store/artists';
import { getAlbumCredits } from '../../store/albumCredits';
import { getAlbumLikes, AlbumLikeCreateUpdate } from '../../store/albumLikes';
import { getAlbumComments, addNewAlbumComment, updateComment, removeComment } from '../../store/albumComments';
import musicNotes from '../HomePage/music-notes.png';
import musicians from '../HomePage/musicians.png';
import './IndividualAlbumPage.css';

export default function IndividualAlbumPage() {
    const dispatch = useDispatch();
    const {albumId} = useParams();
    
    const sessionUser = useSelector(state => state.session.user);
    
    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);
    const selectedAlbum = albumsArray.filter(album => album.id === Number(albumId));
    
    const songs = useSelector(state => state.songs);
    const songsArray = Object.values(songs);
    const songsOnAlbum = songsArray.filter(song => {
        return song.albumId === Number(albumId)
    });
    
    const artists = useSelector(state => state.artists);
    const artistsArray = Object.values(artists);
    
    const albumCredits = useSelector(state => state.albumCredits);
    const albumCreditsArray = Object.values(albumCredits);
    const selectedAlbumCredits = albumCreditsArray.filter(credit => credit.albumId === Number(albumId));
    const allCreditNames = selectedAlbumCredits.map(credit => Object.values(artistsArray).find(artist =>  credit.artistId === artist.id));
    
    const refinedCreditNames = [];
    for (let i = 0; i < allCreditNames.length; i++) {
        if(!refinedCreditNames.includes(allCreditNames[i])) {
            refinedCreditNames.push(allCreditNames[i])
        }
    }

    const albumLikes = useSelector(state => state.albumLikes);
    const albumLikesArray = Object.values(albumLikes);
    const selectedAlbumLikes = albumLikesArray.filter(like => like.albumId === Number(albumId));
    const sessionUserLiked = selectedAlbumLikes.find(like => like.userId === sessionUser?.id);

    const comments = useSelector(state => state.albumComments);
    const commentsArray = Object.values(comments);
    const commentsOnAlbum = commentsArray.filter(comment => comment.albumId === Number(albumId));

    const [commentText, setCommentText] = useState('');

    const likeToggle = event => {
        const targetKey = event.target.innerText;
        dispatch(AlbumLikeCreateUpdate(Number(albumId), sessionUser.id, targetKey));
    };

    const addComment = event => {
        event.preventDefault();
        if(commentText.length > 0) {
            dispatch(addNewAlbumComment(Number(albumId), commentText, sessionUser.id));
        }
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
    
    useEffect(() => {
        dispatch(getAlbums());
        dispatch(getSongs());
        dispatch(getArtists());
        dispatch(getAlbumCredits());
        dispatch(getAlbumLikes());
        dispatch(getAlbumComments());
    }, [dispatch]);

    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return (
        <div className='frame' id='album-section'>
            <div className='title-heading'>
                <h1 className='album-name'>
                    {selectedAlbum[0]?.name}
                </h1>
                <div>
                    <button onClick={likeToggle}>like</button>
                    <button onClick={likeToggle}>dislike</button>
                </div>
            </div>
            <div className='class-list'>
                {songsOnAlbum ?
                    <div className='tracklist'>
                        <label className='album-info-label'>
                            Tracklist:
                        </label>
                        <div className='song-display'>
                            {songsOnAlbum.map((song, index) => {
                                return(
                                    <div
                                        className='song-cell'>
                                        <a href={`/songs/${song.id}`}>
                                            <img className='song-icons' src={musicNotes} alt='song-image' />
                                            <label
                                                className='song-choice'>
                                                {song.title}
                                            </label>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                :null}
                <div className='comments-div'>
                    <label className='comments-label'>
                        Comments Section for {selectedAlbum[0]?.name}
                    </label>
                    <form className='album-comment' onSubmit={addComment}>
                        <textarea
                            className='album-comment-text'
                            placeholder='Add Your Comment Here, Then Click Add or Edit'
                            value={commentText}
                            onChange={event => setCommentText(event.target.value)}>
                        </textarea>
                        <button type='submit'>
                            Add A Comment
                        </button>
                    </form>
                {commentsOnAlbum ?
                    <ul className='comments-list'>
                        {commentsOnAlbum.map((comment, index) => {
                            return(
                                <li className='comment' key={`comment.${index}`}>
                                    {comment.comment}
                                    {sessionUser.id === comment.userId ? 
                                        <div className='edit-delete'>
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
                            )
                        })}
                    </ul>
                :null}
                </div>
                {refinedCreditNames ?
                    <div className='album-artists'>
                        <label
                            className='artists-info-label'>
                            Artists On Album:
                        </label>
                        <div className='artists-display'>
                            {refinedCreditNames?.map((artist, index) => {
                                return(
                                    <div
                                        className='artist-cell'>
                                        <a href={`/artists/${artist?.id}`}>
                                            <img className='musician-icons'
                                            src={musicians}
                                            alt='musicians' />
                                            <label
                                                className='musician-choice'>
                                                {artist?.name}        
                                            </label>    
                                        </a>
                                        
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                :null}
            </div>
            
        </div>
    )
};