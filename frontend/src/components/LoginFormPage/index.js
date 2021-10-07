import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {loginThunk, demoUserLogin} from '../../store/session';
import './LoginForm.css';
import backgroundImage from './background-image.jpg'

export default function LoginFormPage() {
    
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    const sessionUser = useSelector(state => state.session.user);
    
    const dispatch = useDispatch();

    if(sessionUser) return (
        <Redirect to='/' />
    )

    const onSubmit = event => {
        event.preventDefault();
        setErrors([]);
        return dispatch(loginThunk({credential, password}))
            .catch(async res => {
                const readableRes = await res.json();
                if(readableRes.errors) setErrors(readableRes.errors);
            });
    };

    const demo = () => {
        dispatch(demoUserLogin())
    }

    return(
        <div>
            <img src={backgroundImage} alt='background'></img>
            <div className='textDiv'>
                <h1>This is what happens</h1> 
                <h1>when you don't login...</h1>
            </div>
            <button onClick={demo}>Demo User</button>
            <div className='loginFormDiv'>
                <form onSubmit={onSubmit}>
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                    <label>Enter Credentials
                        <input
                            type='text'
                            placeholder='Username or Email'
                            value={credential}
                            onChange={event => setCredential(event.target.value)}
                            required
                            />
                    </label>
                    <label>Enter Password
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                            />
                    </label>
                    <button type='submit'>Login</button>
                    {/* ¿signup button?) */}
                </form>
            </div>
        </div>
    );
};