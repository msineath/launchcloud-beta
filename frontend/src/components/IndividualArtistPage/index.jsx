import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import { getAlbums } from '../../store/albums';
import { getArtists } from '../../store/artists';
import { getSongs } from '../../store/songs';
import { getAlbumCredits } from '../../store/albumCredits';
import { getSongCredits } from '../../store/songCredits';
import recordImage from '../../assets/record-image.png';
import musicNotes from '../../assets/music-notes.png';
import './IndividualArtist.css'

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
        <Navigate to='/login' />
    );

    return (
        <div className='frame'>
            <h1 className='page-title'> {artist?.name}'s Page</h1>
            <div className='artist-parent-div'>
                <div className='artist-albums'>
                    <label className='label-1'>
                        {artist?.name}'s albums:
                    </label>
                        {refinedArtistAlbums.map((album, index) => {
                            return(
                                <div
                                className='album-cell'>
                                    <NavLink to={`/albums/${album.id}`}>
                                        <img className='icons' src={recordImage} alt='record-image' />
                                        <label
                                            className='album-choice'>
                                            {album.name}
                                        </label>
                                    </NavLink>
                                </div>)}             
                            )
                        }
                </div>
                <div className='artist-songs'>
                    <label className='label-2'>
                        songs featuring {artist?.name}
                    </label>
                        {artistSongs.map((song, index) => {                            
                            return(
                                <div
                                className='song-cell'>
                                    <NavLink to={`/songs/${song.id}`}>
                                        <img className='icons' src={musicNotes} alt='music-notes' />
                                        <label
                                            className='song-choice'>
                                            {song.title}
                                        </label>
                                    </NavLink>
                                </div>
                            )
                        })}
                </div>
            </div>
        </div>
    )
};