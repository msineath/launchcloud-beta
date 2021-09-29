import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getArtists } from '../../store/artists';

export default function ArtistsPage() {
    const dispatch = useDispatch();
    
    const artists = useSelector(state => {return state.artists});

    useEffect (() => {
        dispatch(getArtists())
    }, [dispatch]);

    const artistsArr=Object.values(artists)

    return (
        <>
            <h1>Artists Page</h1>
            <div className='artistsDisplay'>
                <ul className='artists'>
                    {/* TODO: CHANGE LIST ITEMS TO DISPLAY BLOCK DIV FOR ALBUM THAT IS A CLICKABLE LINK */}
                    {
                        artistsArr.map((artist, i) => 
                            <li key={`album.${i}`}>
                                <Link to={`/artists/${artist.id}`}>
                                    {artist.name}
                                </Link>
                            </li>
                        )
                    }
                </ul>
                
            </div>
        </>
    )
};