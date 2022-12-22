import React, {FC, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './formstyles.module.scss'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, dataBase} from "../firebaseConf";
import {doc, setDoc, Timestamp} from 'firebase/firestore'

const Register: FC = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        loading: false,
        error: ''
    })

    const [test, setTest] = useState()

    const {displayName, email, password, loading, error} = formData;

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormData({...formData, error: '', loading: true})
        if (!displayName || !email || !password) {
            setFormData({
                ...formData,
                error: 'All fields are required'
            })
        }
        try {
            //create user on Authentication
            const result = await createUserWithEmailAndPassword(auth, email, password);
            //create user on firestore DataBase
            await setDoc(doc(dataBase, 'users', result.user.uid), {
                uid: result.user.uid,
                displayName,
                email: email,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
            })
            // clear inputs
            setFormData({displayName: '', email: '', password: '', loading: false, error: ''})
            // redirect
            navigate('/')


        } catch (e: any) {
            setFormData({
                ...formData, error: e.message, loading: false
            })
        }

    }

    return (
        <div className={styles.formContainer}>
            <div className={styles.formWrapper}>
                <span className={styles.logo}>Go Chat</span>
                <span className={styles.title}>Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="name" name={'displayName'} value={formData.displayName} onChange={(e) => handleChange(e)}/>
                    <input type="email" placeholder="email" name={'email'} value={email} onChange={handleChange}/>
                    <input type="password" placeholder="password" name={'password'} value={password} onChange={handleChange}/>


                    {/*<label htmlFor="file">
                    -
                        <img  alt="" />
                        <span className={styles.sdasd}>Add an avatar</span>
                    </label>*/}
                    <button disabled={loading}>{loading ? 'Creating...' : 'Sign in'}</button>
                    {/*{loading && "Uploading and compressing the image please wait..."}*/}
                    {error && <span style={{color: "red"}}>{error}</span>}
                </form>
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;