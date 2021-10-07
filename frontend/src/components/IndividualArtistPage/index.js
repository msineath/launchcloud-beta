import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getArtists } from '../../store/artists';
import { getSongs } from '../../store/songs';
import { getAlbumCredits } from '../../store/albumCredits';
import { getSongCredits } from '../../store/songCredits';

export default function IndividualArtistPage() {

    const dispatch = useDispatch();
    const { artistId } = useParams();
    
    const sessionUser = useSelector(state => state.session.user);
    const artist = useSelector(state => state.artists[artistId]);

    const albumCredits = useSelector(state => state.albumCredits);
    const albumCreditsArray = Object.values(albumCredits);
    const artistAlbumCredits = albumCreditsArray.filter(credit => credit.artistId === Number(artistId));
    
    const albums = useSelector(state => state.albums);
    const albumsArray = Object.values(albums);
    const artistAlbums = artistAlbumCredits.map(credit => albumsArray.filter(album => credit.albumId === album.id)).flat();

    const refinedArtistAlbums = [];
    for (let i = 0; i < artistAlbums.length; i++) {
        if(!refinedArtistAlbums.includes(artistAlbums[i])) {
            refinedArtistAlbums.push(artistAlbums[i])
        }
    }

    const songCredits = useSelector(state => state.songCredits);
    const songCreditsArray = Object.values(songCredits);
    const artistSongCredits = songCreditsArray.filter(credit => credit.artistId === Number(artistId));

    const songs = useSelector(state => state.songs);
    const songsArray = Object.values(songs);

    const artistSongs = artistSongCredits.map(credit => songsArray.filter(song => credit.songId === song.id)).flat();

    useEffect(() => {
        dispatch(getArtists());
        dispatch(getAlbums());
        dispatch(getSongs());
        dispatch(getAlbumCredits());
        dispatch(getSongCredits());
    }, [dispatch]);

    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return (
        <>
            <h1>Artist's Page</h1>
            <ul>
                <li>
                    Artist: {artist?.name}
                </li>
                <li>
                    {artist?.name}'s albums:
                    <ul>
                        {refinedArtistAlbums.map((album, index) => {
                            return(
                                <li key={`album.${index}`}>
                                    {<Link to={`/albums/${album.id}`}>
                                        {album.name}    
                                    </Link>}
                                </li>)}             
                            )
                        }

                    </ul>
                </li>
                <li>
                    songs featuring {artist?.name}
                    <ul>
                        {artistSongs.map((song, index) => {                            
                            return(
                                <li key={`song.${index}`}>
                                    {<Link to={`/songs/${song.id}`}>
                                        {song.title}    
                                    </Link>}
                                </li>
                            )
                        })}
                    </ul>
                </li>
            </ul>
        </>
    )
};