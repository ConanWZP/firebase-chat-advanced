import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {onAuthStateChanged} from 'firebase/auth'
import {auth, dataBase} from '../../firebaseConf'
import {doc, getDoc} from "firebase/firestore";


export interface IAuthSlice {
    user: any | null,
    loading: boolean,
    extraLoader: boolean,
    userInfo: any
}

const initialState: IAuthSlice = {
    user: {},
    loading: true,
    extraLoader: false,
    userInfo: {}
}


export const changeStateOnAuth = createAsyncThunk(
    'auth/changeState',
    async (_, thunkAPI) => {

        await onAuthStateChanged(auth, (user) => {
            thunkAPI.dispatch(setUser(user))


            if (user) {
                // @ts-ignore
                getDoc(doc(dataBase, 'users', auth?.currentUser?.uid)).then((docSnap) => {
                    thunkAPI.dispatch(setUserData(docSnap.data()))

                    thunkAPI.dispatch(setLoading(false))
                })
            } else {
                thunkAPI.dispatch(setLoading(false))
            }




        })

        // @ts-ignore
        /*const docSnap = await getDoc(doc(dataBase, 'users', auth.currentUser?.uid))
        await thunkAPI.dispatch(setUserData(docSnap.data()))
        await console.log(docSnap.data())*/

        /*if(!docSnap.data()?.isOnline) {
            console.log('est')
            await thunkAPI.dispatch(setUser(null))
        }*/
        //  thunkAPI.dispatch(setLoading(false))
        return
    }
)

export const initializeApp = createAsyncThunk(
    'auth/initializeApp',
    async (_, thunkAPI) => {
        // thunkAPI.dispatch(setUser(null))

        /*const docSnap = await getDoc(doc(dataBase, 'users', 'dffdOwNp24V07yeyTpQMuAynZXu2'))
        if(!docSnap.data()?.isOnline) {
            console.log('est')
           await thunkAPI.dispatch(setUser(null))
        }*/

        thunkAPI.dispatch(initializedSuccess(false))

        await changeStateOnAuth()
        thunkAPI.dispatch(initializedSuccess(true))
    }
)


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<any>) {


            state.user = action.payload
            /*if (action.payload) {
                state.extraLoader = true
            }*/
        },
        setLoading(state, action: PayloadAction<boolean>) {

            state.loading = action.payload
        },
        initializedSuccess(state, action: PayloadAction<boolean>) {
            state.extraLoader = action.payload
        },
        setUserData(state, action: PayloadAction<any>) {

            state.userInfo = action.payload
        }
    },
    extraReducers: {}
})

export const {setUser, setLoading, initializedSuccess, setUserData} = authSlice.actions

export default authSlice.reducer