import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export interface IChatsSlice {
    users: any[],
    chat: any,
    messages: any[],
    selectUser: boolean

}

const initialState: IChatsSlice = {
    users: [],
    chat: {},
    messages: [],
    selectUser: false
}


/*export const changeStateOnAuth = createAsyncThunk(
    'auth/changeState',
    async (_, thunkAPI) => {
    }
)*/



const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setUsers(state, action: PayloadAction<any>) {
            state.users = action.payload

        },
        setChat(state, action: PayloadAction<any>) {
            state.chat = action.payload

        },
        setMessages(state, action: PayloadAction<any>) {
            state.messages = action.payload
        },
        setSelectUser(state, action: PayloadAction<boolean>) {
            state.selectUser = action.payload
        }
    },
    extraReducers: {

    }
})

export const {setUsers, setChat, setMessages, setSelectUser} = chatsSlice.actions

export default chatsSlice.reducer