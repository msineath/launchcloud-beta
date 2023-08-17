import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Navigate } from 'react-router-dom';
import { getSongs } from '../../store/songs';
import './SongsPage.css';
import musicNote from '../../assets/music-notes.png';

export default function SongsPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const songs = useSelector((state) => state.songs);
  const songsArr = Object.values(songs);

  useEffect(() => {
    dispatch(getSongs());
  }, [dispatch]);

  if (!sessionUser) return <Navigate to='/login' />;

  return (
    <div className='frame'>
      <h1 className='page-title'>Songs Page</h1>
      <div className='songs'>
        {songsArr.map((song) => (
          <div className='cell' key={song.id}>
            <NavLink to={`/songs/${song.id}`}>
              <img className='song-icon' src={musicNote} alt='music-notes' />
              <label className='song-choice'>{song.title}</label>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
