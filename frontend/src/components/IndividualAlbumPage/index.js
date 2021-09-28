import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';


export default function IndividualAlbumPage() {
    const dispatch = useDispatch();
    const {albumId} = useParams();

    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);
    const selectedAlbum = albumsArray.filter(album => album.id === Number(albumId));
    
    const songs = useSelector(state => state.songs);
    const songsArray = Object.values(songs);
    
    const songsOnAlbum = songsArray.filter(song => {
        return song.albumId === Number(albumId)
    });

    useEffect(() => {
        dispatch(getAlbums());
        dispatch(getSongs())
    }, [dispatch]);

    return (
        <>
        <h1>{selectedAlbum[0]?.name}</h1>
            <ul>
                {songsOnAlbum ?
                    songsOnAlbum.map((song, index) =>{
                        return(
                            <li key={`song-on-album${index}`}>
                                <Link to={`/songs/${song.id}`}>
                                    {song.title}
                                </Link>
                            </li>
                        )
                    })
                :null}
            </ul>
        </>
    )
};