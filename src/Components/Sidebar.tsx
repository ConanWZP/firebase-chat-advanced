import React, {useEffect} from 'react';
import Chats from './Chats';
import Navbar from "./Navbar/Navbar";
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {changeStateOnAuth} from "../store/reducers/authSlice";
import Loader from "./Loader/Loader";
import styles from "./Navbar/styles.module.scss";

const Sidebar = () => {

    const {selectUser} = useAppSelector(state => state.chats)
    const location = useLocation()
   // console.log(location)


    return (
        <div className={`sidebar + ${selectUser ? styles.modNav : null}`} style={location.pathname === '/profile' ? {borderRadius: '10px 10px 0 0'} : {}}>
            <Navbar/>
            <div style={{borderBottom: '1px solid gray'}}></div>
            {
                location.pathname === '/home' || location.pathname === '/' ?
                    <Chats/>
                    :
                    null
            }

        </div>
    );
};

export default Sidebar;