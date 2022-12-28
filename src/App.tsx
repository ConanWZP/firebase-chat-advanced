import React, {FC, useEffect} from 'react';
import {BrowserRouter, HashRouter, Navigate, Route, Routes, useLocation, useParams} from "react-router-dom";
import './App.css'
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import LayoutPrivate from "./layout/LayoutPrivate";
import Profile from "./Pages/Profile";
import Register from "./Pages/Register";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {privateRoutes, publicRoutes} from './routes';
import {HOME_ROUTE, LOGIN_ROUTE} from "./utils/variables";
import Loader from "./Components/Loader/Loader";
import {changeStateOnAuth, initializeApp, setLoading, setUser} from "./store/reducers/authSlice";
import Sidebar from "./Components/Sidebar";
import {auth, dataBase} from "./firebaseConf";
import {doc, getDoc} from "firebase/firestore";

const App = () => {
    const dispatch = useAppDispatch()

    const {user, loading, extraLoader} = useAppSelector(state => state.auth)
    let a = JSON.stringify(user) === '{}' || JSON.stringify(user) === 'null'
    /*useEffect(() => {

        console.log(!a)
    }, [a])*/


    useEffect(() => {
        //dispatch(setUser(null))
        // @ts-ignore

        /*const dd = async () => {
            const docSnap = await getDoc(doc(dataBase, 'users', 'dffdOwNp24V07yeyTpQMuAynZXu2'))
            if(!docSnap.data()?.isOnline) {
                dispatch(setUser(null))
            }
            //console.log(!docSnap.data()?.isOnline)
        }

        dd()*/


        // из firebase' узнать онлайн или оффлайн, если оффлайн, то setUser(null)


        // dispatch(setUser(null))
        //  dispatch(changeStateOnAuth())
        dispatch(changeStateOnAuth())
        //  dispatch(initializeApp())


    }, [])
    /*
        const checkus = () => {
            let abc = {}
            if (abc) {
               // console.log('12353')
            }
        }
        checkus()

        const ProtectedRoute: FC<any> = ({children}) => {
            if (!user) {
                return <Navigate to="/login"/>;
            }

            return children
        };*/

    if (loading) {
        return <Loader/>
    }


    return (
        <BrowserRouter>
            {/*<Routes>
                <Route path={'/'} element={<Home />}/>
                <Route path={'/register'} element={<Register/>}/>
                <Route path={'/login'} element={<Login />}/>
                <Route path={'/home'} element={<Home />}/>
                <Route path={'/profile'} element={<Profile/>}/>
            </Routes>*/}
            {
                user ?
                    <Routes>
                        {privateRoutes.map(route =>
                            <Route key={route.path} path={'/'} element={<LayoutPrivate/>}>
                                <Route path={route.path} element={<route.element/>}/>
                                <Route path={''} element={<Home/>}/>
                            </Route>
                        )}
                        <Route path={'/'} element={<LayoutPrivate/>}>
                            <Route path={'*'} element={<Navigate to={HOME_ROUTE}/>}/>
                        </Route>
                        <Route path={''} element={<LayoutPrivate/>}>
                            <Route path={'*'} element={<Navigate to={HOME_ROUTE}/>}/>
                        </Route>
                    </Routes>

                    :
                    <Routes>
                        {publicRoutes.map(route =>
                            <Route key={route.path} path={route.path} element={<route.element/>}/>
                        )}
                        <Route path={'/*'} element={<Navigate to={LOGIN_ROUTE}/>}/>
                        <Route path={'*'} element={<Navigate to={LOGIN_ROUTE}/>}/>
                    </Routes>
            }
        </BrowserRouter>
    );
};

export default App;