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
        <form className='signup-form' onSubmit={onSubmit}>
            <h1 className='signup-message'>
                Please Create An Account
            </h1>
            <ul>
                {errors.map( (error, i) => <li key={i}>{error}</li>)}
            </ul>
            <div className='form-fields'>
                <div className='left-signup-form-fields'>
                    <div className='username-div'>
                        <label>
                            Username
                        </label>
                        <input
                            type='text'
                            placeholder='Username'
                            value={username}
                            onChange={event => setUsername(event.target.value)}
                            required
                        />
                    </div>
                    <div className='email-div'>
                        <label>
                            Email    
                        </label>
                        <input
                            type='email'
                            placeholder='Email'
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className='right-signup-form-fields'>
                    <div className='password-div'>
                        <label>
                            Password
                        </label>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className='confirm-password-div'>
                        <label>
                            Confirm Password                
                        </label>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPw}
                            onChange={event => setConfirmPw(event.target.value)}
                            required
                        />
                    </div>
                </div>
            </div>
            <button
                className='create-btn'
                type='submit'>
                Create an Account
            </button>
        </form>
    );
};