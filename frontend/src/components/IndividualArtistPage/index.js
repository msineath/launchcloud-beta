import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getArtists } from '../../store/artists';
import { getSongs } from '../../store/songs';
import { getAlbumCredits } from '../../store/albumCredits';

export default function IndividualArtistPage() {

    const dispatch = useDispatch();
    const { artistId } = useParams();
    
    const artist = useSelector(state => state.artists[artistId]);

    const albumCredits = useSelector(state => state.albumCredits);
    const albumCreditsArray = Object.values(albumCredits);
    const artistAlbumCredits = albumCreditsArray.filter(credit => credit.artistId === Number(artistId))
    
    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);
    
    const artistAlbums = artistAlbumCredits.map(credit => albumsArray.filter(album => credit.albumId === album.id));

    useEffect(() => {
        dispatch(getArtists());
        dispatch(getAlbumCredits())
        dispatch(getAlbums())
        dispatch(getSongs())
    }, [dispatch]);

    return (
        <>
            <h1>Artist's Page</h1>
            <ul>
                <li>
                    Artist: {artist?.name}
                </li>
                <li>
                    Albums {artist?.name} has been on:
                    <ul>
                        {artistAlbums.map((album, index) =>{
                            return(
                                <li key={`album.${index}`}>
                                    {<Link to={`/albums/${album[index]?.id}`}>
                                        {album[index]?.name}    
                                    </Link>}
                                </li>)}             
                            )
                        } 
                    </ul>
                </li>
            </ul>
        </>
    )
};