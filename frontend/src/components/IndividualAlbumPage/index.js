import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getSongs } from '../../store/songs';
import { getArtists } from '../../store/artists';
import { getAlbumCredits } from '../../store/albumCredits';

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

    const artists = useSelector(state => state.artists);
    const artistsArray = Object.values(artists);
    
    const albumCredits = useSelector(state => state.albumCredits);
    const albumCreditsArray = Object.values(albumCredits);
    const selectedAlbumCredits = albumCreditsArray.filter(credit => credit.albumId === Number(albumId));
    const allCreditNames = selectedAlbumCredits.map(credit => Object.values(artistsArray).find(artist =>  credit.artistId === artist.id));

    useEffect(() => {
        dispatch(getAlbums());
        dispatch(getSongs());
        dispatch(getArtists());
        dispatch(getAlbumCredits());
    }, [dispatch]);

    return (
        <>
        <h1>
            {selectedAlbum[0]?.name}
        </h1>
            <ul>
                {songsOnAlbum ?
                        <li>
                            Tracklist:
                            <ul>
                                {songsOnAlbum.map((song, index) => {
                                    return(
                                        <li key={`song-on-album${index}`}>
                                            <Link to={`/songs/${song.id}`}>
                                                {song.title}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                :null}
                {allCreditNames ?
                    <li>
                        Artists On Album:
                        <ul>
                            {allCreditNames.map((artist, index) => {
                                return(
                                    <li key={`artist-on-album.${index}`}>
                                        <Link to={`/artists/${artist.id}`}>
                                            {artist.name}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </li>
                :null}
            </ul>
        </>
    )
};