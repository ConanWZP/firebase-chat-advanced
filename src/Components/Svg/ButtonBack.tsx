import React from 'react';
import {useAppDispatch} from "../../hooks/reduxHooks";
import { setSelectUser } from '../../store/reducers/chatsSlice';
import styles from './buttonBack.module.scss'

interface ButtonBackProps {

}

const ButtonBack = () => {

    const dispatch = useAppDispatch()

    return (
        <svg className={styles.button} onClick={() => dispatch(setSelectUser(false))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"/>
        </svg>

    );
};

export default ButtonBack;