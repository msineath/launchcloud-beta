import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {NavLink, useHistory} from 'react-router-dom';
import { addOneSong, getSongs } from '../../store/songs';
import './SongsPage.css';

export default function SongsPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector(state => state.session.user);
    const songs = useSelector(state => state.songs);
    const songsArr = Object.values(songs)

    const [title, setTitle] = useState('');
    const [albumId, setAlbumId] = useState('');
    const [uploaderId, setUploaderId] = useState(sessionUser.id);
    const [genre, setGenre] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [audioTrackUrl, setAudioTrackUrl] = useState(null);
    const [errors, setErrors] = useState([]);
    
    useEffect (() => {
        dispatch(getSongs())
    }, [dispatch]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = [];
        let newestSong = await dispatch(addOneSong({title, albumId, uploaderId, genre, releaseDate, audioTrackUrl}))
        if(newestSong["errors"]) {
            setErrors(newestSong["errors"]);
        } else {
            setTitle("");
            setAlbumId("");
            setUploaderId("");
            setGenre("");
            setReleaseDate("");
            setAudioTrackUrl(null);
            history.push(`/songs/${newestSong['newSong'].id}`)
        }
    };

      const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setAudioTrackUrl(file);
      };

    return (
        <>
            <img src='https://m.foolcdn.com/media/dubs/images/stock_chart_up_2.original.jpg' alt='background'/>
            <h1>Songs Page</h1>
            <div className='songsDisplay'>
                <ul className='songs'>
                    {/* TODO: CHANGE LIST ITEMS TO DISPLAY BLOCK DIV FOR SONG THAT IS A CLICKABLE LINK */}
                    {songsArr.map((song, i) => 
                        <li key={i}>
                            <NavLink to={`/songs/${song.id}`} className='songLink'>
                                {song.title}
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
            <form className='newSongForm' onSubmit={handleSubmit}>
                <label>
                    <input
                        type='text'
                        placeholder="title"
                        value={title}
                        onChange={event => setTitle(event.target.value)} />
                </label>
                <label>
                    <input
                        type='text'
                        placeholder="album"
                        value={albumId}
                        onChange={event => setAlbumId(event.target.value)} />
                </label>
                <label>
                    <input
                        type='genre'
                        placeholder="genre"
                        value={genre}
                        onChange={event => setGenre(event.target.value)} />
                </label>
                <label>
                    <input
                        type='text'
                        placeholder="release date"
                        value={releaseDate}
                        onChange={event => setReleaseDate(event.target.value)} />
                </label>
                <label>
                    <input
                        type='file'
                        onChange={updateFile} />
                </label>
                <button type='submit'>Add Song</button>
            </form>
        </>
        )
};