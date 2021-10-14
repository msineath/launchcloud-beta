import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { addOneSong, getSongs } from '../../store/songs';
import { getAlbums } from '../../store/albums';
import { getSongLikes } from '../../store/songLikes';
import { getAlbumLikes } from '../../store/albumLikes';
import { getAlbumComments } from '../../store/albumComments';
import { getSongComments } from '../../store/songComments';
import musicNotes from '../HomePage/music-notes.png'
import record from '../HomePage/record-image.png'
import './ProfilePage.css';

export default function ProfilePage() {
    
    const dispatch = useDispatch();
    const {userId} = useParams();
    const history = useHistory();


    const sessionUser = useSelector(state => state.session.user);

    const songs = useSelector(state => state.songs);
    const songsArray = Object.values(songs);
    const userUploaded = songsArray.filter(song => song.uploaderId === Number(userId));

    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);

    const albumLikes = useSelector(state => state.albumLikes);
    const albumLikesArray = Object.values(albumLikes);
    const selectedAlbumLikes = albumLikesArray.filter(like => like.userId === Number(userId));
    const selectedAlbumLikeNames = selectedAlbumLikes.map (like => albumsArray.filter(album => like.albumId === album.id)).flat();
    
    const songLikes = useSelector(state => state.songLikes);
    const songLikesArray = Object.values(songLikes);

    const selectedSongLikes = songLikesArray.filter(like => like.userId === Number(userId));
    const selectedSongLikeNames = selectedSongLikes.map (like => songsArray.filter(song => like.songId === song.id)).flat();

    const albumComments = useSelector(state => state.albumComments);
    const albumCommentsArray = Object.values(albumComments);
    const userAlbumComments = albumCommentsArray.filter(comment => comment.userId === Number(userId));
    
    const refinedAlbumComments = [];
    for (let i = 0; i < userAlbumComments.length; i++) {
        if (!refinedAlbumComments.includes(userAlbumComments[i].albumId)) {
            refinedAlbumComments.push(userAlbumComments[i].albumId);
        };
    };

    const songComments = useSelector(state => state.songComments);
    const songCommentsArray = Object.values(songComments);
    const userSongComments = songCommentsArray.filter(comment => comment.userId === Number(userId));
    
    const refinedSongComments = [];
    for (let i = 0; i < userSongComments.length; i++) {
        if (!refinedSongComments.includes(userSongComments[i].songId)) {
            refinedSongComments.push(userSongComments[i].songId);
        };
    };

    const [title, setTitle] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [uploaderId, setUploaderId] = useState(sessionUser?.id);
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [audioTrackUrl, setAudioTrackUrl] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = [];
        let newestSong = await dispatch(addOneSong({title, albumName, uploaderId, genre, releaseDate, audioTrackUrl}))
        if(newestSong["errors"]) {
            setErrors(newestSong["errors"]);
        } else {
            setTitle("");
            setAlbumName("");
            setUploaderId("");
            setGenre("");
            setReleaseDate("");
            setAudioTrackUrl(null);
            history.push(`/songs/${newestSong.id}`)
        }
    };

    useEffect(() => {
        dispatch(getSongs())
        dispatch(getAlbums())
        dispatch(getSongLikes())
        dispatch(getAlbumLikes())
        dispatch(getAlbumComments())
        dispatch(getSongComments())
    }, [dispatch]);

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setAudioTrackUrl(file);
    };

    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return(
        <div className='frame'>
            <h1 className='page-title'>{sessionUser.username}'s Profile</h1>
            <div className='new-song-upload'>
                <h1 className='page-title'>
                    Upload A New Song
                </h1>
                    <form className='new-song-form' onSubmit={handleSubmit}>
                            <input
                                className='new-info'
                                type='text'
                                placeholder="title"
                                value={title}
                                onChange={event => setTitle(event.target.value)} />
                            <input
                                className='new-info'
                                type='text'
                                placeholder="album"
                                value={albumName}
                                onChange={event => setAlbumName(event.target.value)} />
                            <input
                                className='new-info'
                                type='genre'
                                placeholder="genre"
                                value={genre}
                                onChange={event => setGenre(event.target.value)} />
                            <input
                                className='new-info'
                                type='text'
                                placeholder="release date (Please Use Format mm/dd/yyyy)"
                                value={releaseDate}
                                onChange={event => setReleaseDate(event.target.value)} />
                            <input
                                className='file-upload new-info'
                                type='file'
                                onChange={updateFile} />
                        <button 
                            type='submit'
                            className='new-info'>
                            Add Song
                        </button>
                    </form>
            </div>
            <div className='info-parent'>  
                <div className='songs-uploaded'>
                    <label className='profile-label'>Songs Uploaded By {sessionUser.username}</label>
                        {userUploaded.map(song => 
                            <div className='profile-cell'>
                                <a href={`/songs/${song.id}`}>
                                    <img className='profile-icons music-note-icon' src={musicNotes} alt='music-notes' />
                                    <label
                                        className='song-choice'>
                                        {song.title}
                                    </label>
                                </a>
                            </div>
                        )}
                </div>
                <div className='albums-liked'>
                    <label className='profile-label'>Albums {sessionUser.username} Likes</label>
                        {selectedAlbumLikeNames.map(album => 
                            <div className='profile-cell'>
                                <a href={`/albums/${album.id}`}>
                                    <img className='profile-icons' src={record} alt='record-image' />
                                    <label
                                        className='album-choice'>
                                        {album.name}
                                    </label>
                                </a>
                            </div>   
                        )}
                </div>
                <div className='songs-liked'>
                    <label className='profile-label'>Songs {sessionUser.username} Likes</label>
                        {selectedSongLikeNames.map(song => 
                            <div className='profile-cell'>
                                <a href={`/songs/${song.id}`}>
                                    <img className='profile-icons' src={musicNotes} alt='music-notes' />
                                    <label
                                        className='song-choice'>
                                        {song.title}
                                    </label>
                                </a>
                            </div>   
                        )}
                </div>
                <div className='commented-albums'>    
                    {refinedAlbumComments ?
                        <>
                            <label className='profile-label'>
                                Albums {sessionUser.username} has Commented on: 
                            </label>
                            {refinedAlbumComments.map(albumId => {
                                const selected = albumsArray.find(album => album.id === albumId);
                                return(
                                    <div className='profile-cell'>
                                        <a href={`/albums/${selected.id}`}>
                                            <img className='profile-icons' src={record} alt='record-image' />
                                            <label
                                                className='album-choice'>
                                                {selected.name}
                                            </label>
                                        </a>
                                    </div>
                                )
                            })}
                        </>
                    :null}
                </div>
                <div className='commented-songs'>
                    {refinedSongComments ?
                        <>
                            <label className='profile-label'>
                                Songs {sessionUser.username} has Commented on: 
                            </label>
                                {refinedSongComments.map(songId => {
                                    const selected = songsArray.find(song => song.id === songId);
                                    return(
                                        <div className='profile-cell'>
                                            <a href={`/songs/${selected.id}`}>
                                                <img className='profile-icons' src={musicNotes} alt='music-notes' />
                                                <label
                                                    className='song-choice'>
                                                    {selected.title}
                                                </label>
                                            </a>
                                        </div>
                                    )
                                })}
                        </>
                    :null}
                </div>
            </div>
        </div>
    )
};