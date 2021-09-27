import { get } from 'js-cookie';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAlbums } from '../../../store/albums';

export default function AlbumsPage() {
    const dispatch = useDispatch();
    const albums = useSelector(state => state.albums)
    const albumsArray = Object.values(albums)
    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);

    return(
        <div>
            <h1>Albums Page</h1> 
        {albums?
            <ul>
                {albumsArray.map(album =>
                <li>{album.name}</li>)}
            </ul>
        :null}
        </div>
    )
}