import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getArtists } from '../../store/artists';
import { getSongs } from '../../store/songs';

export default function IndividualArtistPage() {

    const dispatch = useDispatch();
    const { artistId } = useParams();
    
    const artist = useSelector(state => state.artists[artistId]);

    useEffect(() => {
        dispatch(getArtists());
    }, [dispatch]);

    return (
        <>
            <h1>Artist's Page</h1>
            <ul>
                <li>Artist: {artist?.name}</li>
            </ul>
        </>
    )
};