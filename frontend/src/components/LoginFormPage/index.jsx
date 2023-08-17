import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginThunk, demoUserLogin } from '../../store/session';
import './LoginForm.css';
import backgroundImage from '../../assets/background-image.jpg';

export default function LoginFormPage() {
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    return dispatch(loginThunk({ credential, password })).catch(async (res) => {
      const readableRes = await res.json();
      if (readableRes.errors) setErrors(readableRes.errors);
    });
  };

  const demo = async () => {
    await dispatch(demoUserLogin());
    navigate('/');
  };

  return (
    <div className='frame'>
      <h1 className='login-message'>You Must Be Logged In To View Content</h1>
      <div className='login-form-div'>
        <form className='login-form' onSubmit={onSubmit}>
          <ul className='login-input-errors'>
            {errors.map((error, i) => (
              <li className='login-error' key={i}>
                {error}
              </li>
            ))}
          </ul>
          <div className='credentials-div'>
            <label>Enter Credentials</label>
            <input
              type='text'
              placeholder='Username or Email'
              value={credential}
              onChange={(event) => setCredential(event.target.value)}
              required
            />
          </div>
          <div className='login-password-div'>
            <label className='password-label'>Enter Password</label>
            <input
              className='password-input'
              type='password'
              placeholder='Password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className='login-btns'>
            <button type='submit'>Login</button>
            <button onClick={demo}>Demo User</button>
            <button>
              <Link className='signup' to='/signup'>
                Signup
              </Link>
            </button>
          </div>
        </form>
      </div>
      {/* <div className='demo-btn'> */}
      {/* </div> */}
    </div>
  );
}
