import React, {useEffect} from 'react';
import {Link, useLocation} from "react-router-dom";
import styles from './styles.module.scss'
import {auth, dataBase} from '../../firebaseConf'
import {signOut} from 'firebase/auth'
import {doc, updateDoc, getDoc} from "firebase/firestore";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {changeStateOnAuth, setUser} from "../../store/reducers/authSlice";
import defaultPhoto from './../../assets/defaultPhoto.png'
import {setMessages, setSelectUser} from "../../store/reducers/chatsSlice";


const Navbar = () => {
    const dispatch = useAppDispatch()
    const {user, loading, userInfo} = useAppSelector(state => state.auth)
  //  console.log(userInfo)
    const {selectUser} = useAppSelector(state => state.chats)


    const onClickDiv = async () => {
        // @ts-ignore
        const res = await getDoc(doc(dataBase, 'users', auth.currentUser?.uid))
        //console.log(res)
    }

    //const [auth, setAuth] = useState(true)
    const location = useLocation()
   // console.log(auth)

    const handleSignOut = async () => {

        // @ts-ignore
        await updateDoc(doc(dataBase, 'users', auth.currentUser?.uid), {
            isOnline: false
        })
        await signOut(auth)
        await dispatch(setUser(null))
        await dispatch(setSelectUser(false))
        await dispatch(setMessages([]))

    }


    return (
        <nav className={location.pathname === '/profile' ? styles.extraBorder : ''}>
            <div onClick={onClickDiv}>
                <Link className={`${styles.logo} + ${location.pathname === '/profile' ? styles.addLogo : ''}`} to={'/home'}>
                    {/*<Link className={`${styles.logo}`} to={'/home'}>*/}
                    <span>Go chat</span>
                </Link>
            </div>
            <div>
                {user ?
                    <>
                        <div className={styles.mainData}>
                            <Link to={'/profile'} >
                                <img style={{width: 35, height: 35, borderRadius: '50%'}} src={userInfo?.avatar || defaultPhoto}/>
                            </Link>
                            <Link className={styles.userName} to={'/profile'}>{userInfo.displayName}</Link>
                        </div>

                        <button className={styles.logoutButton}>
                            <Link to={'/login'} onClick={handleSignOut}>Logout</Link>
                        </button>

                    </>
                    :
                    <>
                        <Link to={'/register'}>Sign in</Link>
                        <Link to={'/login'}>Login</Link>
                    </>

                }
            </div>


        </nav>
    );
};

export default Navbar;