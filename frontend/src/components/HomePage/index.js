import {useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './HomePage.css';
import backgroundImage from './background-image.jpg';

export default function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    
    if(!sessionUser) return (
        <Redirect to='/login' />
    );

    return (
        <div>
            <img src={backgroundImage} alt='background'/>
            <h1>Welcome, {sessionUser.username}!</h1>
        </div> 
    )
};