import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getAlbums } from '../../store/albums';

export default function AlbumsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);
    
    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);


    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return(
        <div>
            <h1>Albums Page</h1> 
        {albums?
            <ul>
                {albumsArray.map((album, index) =>
                <li key={`album.${index}`}><Link to={`/albums/${album.id}`}>{album.name}</Link></li>)}
            </ul>
        :null}
        </div>
    )
};