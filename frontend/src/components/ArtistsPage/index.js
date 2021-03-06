import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getArtists } from '../../store/artists';
import musicians from '../HomePage/musicians.png';
import './ArtistsPage.css';

export default function ArtistsPage() {
    const dispatch = useDispatch();
    
    const sessionUser = useSelector(state => state.session.user);

    const artists = useSelector(state => {return state.artists});
    const artistsArr = Object.values(artists)

    useEffect (() => {
        dispatch(getArtists())
    }, [dispatch]);

    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return (
        <div className='frame'>
            <h1 className='page-title'>
                Artists Page
            </h1>
            <div className='artists'>
                    {
                        artistsArr?.map((artist, i) => 
                            <div
                                className='cell'>
                                <a href={`/artists/${artist.id}`}>
                                    <img className='artist-icon' src={musicians} alt='musicians-image' />
                                    <label
                                        className='musician-choice'>
                                        {artist.name}
                                    </label>
                                </a>
                            </div>
                        )
                    }
                
                
            </div>
        </div>
    )
};