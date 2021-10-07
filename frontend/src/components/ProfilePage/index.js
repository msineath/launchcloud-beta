import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { Link, useHistory } from 'react-router-dom';
import { addOneSong, getSongs } from '../../store/songs';
import { getAlbums } from '../../store/albums';
import { getSongLikes } from '../../store/songLikes';
import { getAlbumLikes } from '../../store/albumLikes';
import { getAlbumComments } from '../../store/albumComments';
import { getSongComments } from '../../store/songComments';
import './ProfilePage.css';

export default function ProfilePage() {
    
    const dispatch = useDispatch();
    const {userId} = useParams();
    const history = useHistory();


    const user = useSelector(state => state.session.user);

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
    const [albumId, setAlbumId] = useState('');
    const [uploaderId, setUploaderId] = useState(user.id);
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [audioTrackUrl, setAudioTrackUrl] = useState(null);
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = [];
        let newestSong = await dispatch(addOneSong({title, albumId, uploaderId, genre, releaseDate, audioTrackUrl}))
        if(newestSong["errors"]) {
            setErrors(newestSong["errors"]);
        } else {
            setTitle("");
            setAlbumId("");
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

    return(
        <ul>
            <li>Songs Uploaded By {user.username}</li>
            {userUploaded.map(song => 
                <ul>
                    <li><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
                </ul>
            )}
            <li>Albums {user.username} Likes</li>
            {selectedAlbumLikeNames.map(album => 
                <ul>
                    <li><Link to={`/albums/${album.id}`}>{album.name}</Link></li>
                </ul>   
            )}
            <li>Songs {user.username} Likes</li>
            {selectedSongLikeNames.map(song => 
                <ul>
                    <li><Link to={`/songs/${song.id}`}>{song.title}</Link></li>
                </ul>   
            )}
            {refinedAlbumComments ?
                <li>
                    Albums {user.username} has Commented on: 
                    {refinedAlbumComments.map(albumId => {
                        const selected = albumsArray.find(album => album.id === albumId);
                        return(
                            <ul>
                                <li><Link to={`/albums/${selected.id}`}>{selected.name}</Link></li>
                            </ul>
                        )
                    })}
                </li>
            :null}
            {refinedSongComments ?
                <li>
                    Songs {user.username} has Commented on: 
                    {refinedSongComments.map(songId => {
                        const selected = songsArray.find(song => song.id === songId);
                        return(
                            <ul>
                                <li><Link to={`/albums/${selected.id}`}>{selected.title}</Link></li>
                            </ul>
                        )
                    })}
                </li>
            :null}
            <li>
                Upload A New Song
            </li>
            <ul>
                <li>
                    <form className='newSongForm' onSubmit={handleSubmit}>
                        <label>
                            <input
                                type='text'
                                placeholder="title"
                                value={title}
                                onChange={event => setTitle(event.target.value)} />
                        </label>
                        <label>
                            <input
                                type='text'
                                placeholder="album"
                                value={albumId}
                                onChange={event => setAlbumId(event.target.value)} />
                        </label>
                        <label>
                            <input
                                type='genre'
                                placeholder="genre"
                                value={genre}
                                onChange={event => setGenre(event.target.value)} />
                        </label>
                        <label>
                            <input
                                type='text'
                                placeholder="release date"
                                value={releaseDate}
                                onChange={event => setReleaseDate(event.target.value)} />
                        </label>
                        <label>
                            <input
                                type='file'
                                onChange={updateFile} />
                        </label>
                        <button type='submit'>Add Song</button>
                    </form>
                </li>
            </ul>
        </ul>
    )
};