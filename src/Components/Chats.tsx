import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import User from "./User/User";
import {setChat, setMessages, setSelectUser} from "../store/reducers/chatsSlice";
import {auth, dataBase} from "../firebaseConf";
import {collection, doc, getDoc, onSnapshot, orderBy, query, updateDoc} from "firebase/firestore";

const Chats = () => {

    const dispatch = useAppDispatch()
    const {users, chat, messages} = useAppSelector(state => state.chats)
    const user1 = auth.currentUser?.uid as any
    //  const user2 = chat.uid


    /* useEffect(() => {
         //if (если открыт диалог с юзером и отнего преходит сообщение, то unread сразу же false ставим)
     }, [])
 */

    const [chatic, setChatic] = useState<any>()

    const handleSelectUser = async (user: any) => {
        // await dispatch(setMessages([]))
      //  debugger
          await dispatch(setChat(user))
         await   setChatic(user)

        await dispatch(setSelectUser(true))

        const user2 = user.uid

        const id = (user1 > user2) ? `${user1 + user2}` : `${user2 + user1}`

        const messageRef = await collection(dataBase, 'messages', id, 'chat')

        const quer = await query(messageRef, orderBy('createdAt', 'asc'))


        const lastMessageDoc = await getDoc(doc(dataBase, 'lastMessage', id)) // !!!!!!!!!!!!!

      //  console.log('chat uid', chat?.uid)
       // console.log('lastMessageDoc', lastMessageDoc.data()?.from)

        //  if ((user?.uid === lastMessageDoc.data()?.from) || (user?.uid === lastMessageDoc.data()?.to)) {
        // debugger

      /*  await onSnapshot(quer, async (querSnap) => {
            console.log(querSnap)
            // console.log(querSnap)
            let messageLoc: any[] = [];

            await querSnap.forEach(doc => {
             //   console.log(doc.data())
                messageLoc.push(doc.data())

            })
          //  console.log(messageLoc)
            let messageLocLength = messageLoc.length - 1
           // console.log(messageLocLength)
           /!* console.log(chat.uid)
            console.log(chatic?.uid)
            console.log(user.uid)
            console.log(messageLoc[messageLocLength].from === chat.uid)
            console.log(user2)
            console.log(messageLoc[messageLocLength].from === user1)*!/
         //   console.log(messageLoc[messageLocLength])
         //   console.log(user)
          //  console.log(messageLoc[messageLocLength].from === user?.uid)

            if ((messageLoc[messageLocLength].from === user?.uid) || (messageLoc[messageLocLength].from === user1)) {
                await dispatch(setMessages(messageLoc))
            }

        })*/


        //  }


        //  const lastMessageDoc =  await getDoc(doc(dataBase, 'lastMessage', id))

        if (lastMessageDoc.data()?.from !== user1) {
            await updateDoc(doc(dataBase, 'lastMessage', id), {
                unread: false
            })
        }


    }
    //console.log(messages)


    return (
        <div className={'chats'}>
            {users.map(user =>
                <User key={user.uid} user={user} handleSelectUser={handleSelectUser} user1={user1} chat={chat}/>
            )}
        </div>
    );
};

export default Chats;