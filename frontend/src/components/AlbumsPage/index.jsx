import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, NavLink } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import recordImage from '../../assets/record-image.png';
import './AlbumsPage.css';

export default function AlbumsPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);
    
    useEffect(() => {
        dispatch(getAlbums());
    }, [dispatch]);


    if(!sessionUser) return (
        <Navigate to='/login' />
    );

    return(
        <div className='frame'>
            <h1 className='page-title'>
                Albums Page
            </h1>
            <div className='albums'>
                {albums?
                    <>
                        {albumsArray.map((album, index) =>
                        <div key={album.id}
                            className='cell'>
                            <NavLink to={`/albums/${album.id}`}>
                                <img className='album-icon' src={recordImage} alt='record-image' />
                                <label
                                    className='album-choice'>
                                    {album.name}
                                </label>
                            </NavLink>
                        </div>)}
                    </>
                :null}
            </div> 
        </div>
    )
};