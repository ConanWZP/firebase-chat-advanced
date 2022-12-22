import {combineReducers, configureStore} from "@reduxjs/toolkit"
import authSlice from "./reducers/authSlice"
import chatsSlice from "./reducers/chatsSlice"




const  rootReduce = combineReducers({

    auth: authSlice,
    chats: chatsSlice,

})

export const store = configureStore({
    reducer: rootReduce,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch