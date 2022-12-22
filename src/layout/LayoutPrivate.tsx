import React, {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import './../App.css'
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {changeStateOnAuth, setLoading, setUser} from "../store/reducers/authSlice";
import Loader from "../Components/Loader/Loader";
import {doc, getDoc } from 'firebase/firestore';
import {auth, dataBase} from '../firebaseConf';

const LayoutPrivate = () => {
    const dispatch = useAppDispatch()
    const {loading} = useAppSelector(state => state.auth)
    const location = useLocation()
   // console.log(location)
    /*useEffect(() => {
       // debugger

        dispatch(changeStateOnAuth())

        /!*const dd = async () => {
            // @ts-ignore
            const docSnap = await getDoc(doc(dataBase, 'users', auth.currentUser?.uid))
            console.log(docSnap.data())
            /!*if(!docSnap.data()?.isOnline) {
                dispatch(setUser(null))
            }*!/
            //console.log(!docSnap.data()?.isOnline)
        }

        dd()*!/
    }, [])*/


     if (loading) {
         return <Loader/>
     }


    return (
       /* <div className={`wrapper`}>
            <div className={'main'}>*/
                <div className={'container'}>
                    <div className={'content'} style={location.pathname === '/profile' ? {flexDirection: 'column', height: "auto", width: "auto"} : {}}>
                        <Sidebar />
                        <Outlet/>
                    </div>
                </div>

        //     </div>
        // </div>
    );
};

export default LayoutPrivate;