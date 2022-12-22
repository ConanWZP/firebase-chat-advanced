import React, {useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import styles from './formstyles.module.scss'
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, dataBase} from "../firebaseConf";
import {doc, updateDoc} from "firebase/firestore";
import {setLoading, setUser} from "../store/reducers/authSlice";
import Loader from "../Components/Loader/Loader";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";

const Login = () => {

    const location = useLocation()
   // console.log(location)

    const {extraLoader} = useAppSelector(state => state.auth)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        loading: false,
        error: ''
    })

    const [test, setTest] = useState()

    const {email, password, loading, error} = formData;
    console.log(error)

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const dispatch = useAppDispatch()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormData({...formData, error: '', loading: true})
        if (!email || !password) {
            setFormData({
                ...formData,
                error: 'All fields are required'
            })
        }
        try {
            //auth user
            const result = await signInWithEmailAndPassword(auth, email, password)



            //update online status on firestore DataBase
            await updateDoc(doc(dataBase, 'users', result.user.uid), {
                isOnline: true
            })
            console.log(doc(dataBase, 'users', result.user.uid))
            // clear inputs
            setFormData({email: '', password: '', loading: false, error: ''})
            // redirect

          // await dispatch(setUser({}))
            navigate('/')


        } catch (e: any) {
            setFormData({
                ...formData, error: e.message, loading: false
            })
        }

    }
   /* const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setLoading(false))
    }, [])

    if (loading) {
        return <Loader/>
    }*/
    /*if (!extraLoader) {
        return <Loader />
    }*/



    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <span className={styles.logo}>Go Chat</span>
                <span className={styles.title}>Login</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" name='email' onChange={handleChange} />
                    <input type="password" placeholder="password" name='password' onChange={handleChange} />
                    <button disabled={loading}>{loading ? 'Logging into your account...' : 'Sign in'}</button>
                    {error && <span style={{color: 'red'}}>{error}</span>}
                    {/*{err && <span>Something went wrong</span>}*/}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;