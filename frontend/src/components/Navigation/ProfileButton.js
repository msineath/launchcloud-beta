import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logoutThunk} from '../../store/session';

export default function ProfileButton({user}) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if(showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if(!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = event => {
        event.preventDefault();
        dispatch(logoutThunk());
    };

    return (
        <>
            <button onClick={openMenu}>
                <i className='fas fa-user-circle' />
            </button>
            {showMenu && (
                <ul className='dropdown'>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                </ul>
            )}
        </>
    );
};