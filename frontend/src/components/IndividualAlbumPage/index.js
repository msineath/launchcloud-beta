import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useParams} from 'react-router-dom';
import { getAlbums } from '../../store/albums';

export default function IndividualAlbumPage() {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);
    const {albumId} = useParams();
    const selectedAlbum = albumsArray.filter(album => album.id === Number(albumId));
    
    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    return (
        <h1>{selectedAlbum[0]?.name}</h1>
    )
};