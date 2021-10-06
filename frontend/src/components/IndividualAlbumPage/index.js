import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';
import { getArtists } from '../../store/artists';
import { getAlbumCredits } from '../../store/albumCredits';
import { getAlbumLikes, AlbumLikeCreateUpdate } from '../../store/albumLikes';
import { getAlbumComments, addNewAlbumComment, updateComment, removeComment } from '../../store/albumComments';

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
    const sessionUserLiked = selectedAlbumLikes.find(like => like.userId === sessionUser.id);

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
        dispatch(addNewAlbumComment(Number(albumId), commentText, sessionUser.id));
        setCommentText('');
    };

    const editComment = event => {
        event.preventDefault();
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

    return (
        <>
        <h1>
            {selectedAlbum[0]?.name}
        </h1>
            <ul>
                {songsOnAlbum ?
                        <li>
                            Tracklist:
                            <ul>
                                {songsOnAlbum.map((song, index) => {
                                    return(
                                        <li key={`song-on-album${index}`}>
                                            <Link to={`/songs/${song.id}`}>
                                                {song.title}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                :null}
                {refinedCreditNames ?
                    <li>
                        Artists On Album:
                        <ul>
                            {refinedCreditNames?.map((artist, index) => {
                                return(
                                    <li key={`artist-on-album.${index}`}>
                                        <Link to={`/artists/${artist?.id}`}>
                                            {artist?.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                :null}
                <li>
                    Like {selectedAlbum[0]?.name}?
                        <button onClick={likeToggle}>like</button>
                        <button onClick={likeToggle}>dislike</button>
                </li>
                <li>
                    Comments Section for {selectedAlbum[0]?.name}
                </li>
                {commentsOnAlbum ?
                    <ul>
                        {commentsOnAlbum.map((comment, index) => {
                            return(
                                <li key={`comment.${index}`}>
                                    {comment.comment}
                                    {sessionUser.id === comment.userId ? 
                                        <>
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
                                        </>
                                    :null}
                                </li>
                            )
                        })}
                    </ul>
                :null}
                <form onSubmit={addComment}>
                    <textarea
                        placeholder='Add YourComment Here'
                        value={commentText}
                        onChange={event => setCommentText(event.target.value)}>
                    </textarea>
                    <button type='submit'>
                        Add A Comment
                    </button>
                </form>
            </ul>
        </>
    )
};