import React, {useEffect} from 'react';
import Sidebar from "../Components/Sidebar";
import {Outlet} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {changeStateOnAuth} from "../store/reducers/authSlice";
import Loader from "../Components/Loader/Loader";

const Test = () => {

    /*const dispatch = useAppDispatch()
    const {loading} = useAppSelector(state => state.auth)
    useEffect(() => {
        dispatch(changeStateOnAuth())
    }, [])
    if (loading) {
        return <Loader/>
    }*/
    return (
        <div>
            <Sidebar/>
            <Outlet/>
        </div>
    );
};

export default Test;