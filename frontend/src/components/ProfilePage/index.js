import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import { getAlbums } from '../../store/albums';
import { getSongLikes } from '../../store/songLikes';
import { getAlbumLikes } from '../../store/albumLikes';
import './ProfilePage.css';

export default function ProfilePage() {
    
    const dispatch = useDispatch();
    const {userId} = useParams();

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

    useEffect(() => {
        dispatch(getSongs())
        dispatch(getAlbums())
        dispatch(getSongLikes())
        dispatch(getAlbumLikes())
    }, [dispatch]);

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
        </ul>
    )
};