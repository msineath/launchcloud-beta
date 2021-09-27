import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signupThunk} from '../../store/session';
import './SignupForm.css';

export default function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
    const [errors, setErrors] = useState([]);

    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    if(sessionUser) return <Redirect to='/' />;

    const onSubmit = event => {
        event.preventDefault();
        if(password !== confirmPw) return setErrors(['Password and Confirm Password fields must match!']);
        setErrors([]);
        return dispatch(signupThunk({username, email, password}))
            .catch(async res => {
                const readableRes = await res.json();
                if(readableRes.errors) setErrors(readableRes.errors);
            });
    };

    return(
        <form onSubmit={onSubmit}>
            <ul>
                {errors.map( (error, i) => <li key={i}>{error}</li>)}
            </ul>
            <label>Username
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                    required />
            </label>
            <label>Email    
                <input
                    type='email'
                    placeholder='Email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required />
            </label>
            <label>Password
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required />
            </label>
            <label>Confirm Password                
                <input
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPw}
                    onChange={event => setConfirmPw(event.target.value)}
                    required />
            </label>
            <button type='submit'>Create an Account</button>
        </form>
    );
};