import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import Loader from "../Components/Loader/Loader";
import {auth, dataBase, storage} from "../firebaseConf";
import {collection, query, where, onSnapshot, addDoc, Timestamp, setDoc, doc, orderBy} from 'firebase/firestore'
import {ref, getDownloadURL, uploadBytes} from 'firebase/storage'
import {setMessages, setUsers} from '../store/reducers/chatsSlice';
import styles from "./home.module.scss";
import MessagesInput from "../Components/MessagesInput/MessagesInput";
import Message from '../Components/Message/Message';
import {v4} from 'uuid'
import ButtonBack from "../Components/Svg/ButtonBack";

const Home = () => {

    const {loading, userInfo} = useAppSelector(state => state.auth)
    const {chat, messages} = useAppSelector(state => state.chats)
    const [textValue, setTextValue] = useState<any>('')

    const [img, setImg] = useState<any>()


    const user1 = auth.currentUser?.uid as any
    const user2 = chat.uid
    const dispatch = useAppDispatch()



    const {users, selectUser} = useAppSelector(state => state.chats)
    //const [localUser, setLocalUsers] = useState([])
    useEffect(() => {
        const usersRef = collection(dataBase, 'users')
        // создадим query object
        const quer = query(usersRef, where('uid', 'not-in', [user1]))
        // делаем запрос
        const unsub = onSnapshot(quer, (queySnap) => {
            let usersLoc: any = []
            queySnap.forEach((doc) => {
                usersLoc.push(doc.data())
            });
            //setLocalUsers(users)
            dispatch(setUsers(usersLoc))
        })
        // при размонтировании
        return () => unsub()

    }, [])



   /* const unSubic = React.useCallback((quer: any) => {
        onSnapshot(quer, async (querSnap: any) => {
            // console.log(querSnap)
            let messageLoc: any[] = [];

            await querSnap.forEach((doc: any) => {
                //   console.log(doc.data())
                messageLoc.push(doc.data())

            })

            let messageLocLength = messageLoc.length - 1
            // console.log(chat?.uid)
            if ((messageLoc[messageLocLength]?.from === chat?.uid) || (messageLoc[messageLocLength]?.from === user1)) {
                await dispatch(setMessages(messageLoc))
            }

        })
    }, [])*/


    useEffect(() => {
        dispatch(setMessages([]))
        const id = (user1 > user2) ? `${user1 + user2}` : `${user2 + user1}`

        const messageRef =  collection(dataBase, 'messages', id, 'chat')

        const quer =  query(messageRef, orderBy('createdAt', 'asc'))


        const unSub = onSnapshot(quer, async (querSnap) => {
            // console.log(querSnap)
            let messageLoc: any[] = [];

            await querSnap.forEach(doc => {
                //   console.log(doc.data())
                messageLoc.push(doc.data())

            })

            let messageLocLength = messageLoc.length - 1
           // console.log(chat?.uid)
            if ((messageLoc[messageLocLength]?.from === chat?.uid) || (messageLoc[messageLocLength]?.from === user1)) {
                await dispatch(setMessages(messageLoc))
            }

        })

       // return () => unSubic(quer)
        return () => unSub()

    }, [chat?.uid])




    const handleSubmitMessage = async (e: any) => {

        e.preventDefault()

        let url;

        if (img) {
            const imgRef = ref(storage, `attachImage/${new Date().getTime()} - ${img?.name}`)

            const uploadImageToServer = await uploadBytes(imgRef, img)

            //const getImageUrlFromServer = await getDownloadURL(ref(storage, uploadImageToServer.ref.fullPath))

            //url = getImageUrlFromServer;
            url = await getDownloadURL(ref(storage, uploadImageToServer.ref.fullPath))
        }

        // такое условие позволяет иметь один и тот же id для диалога вне зависимости от того кто кому пишет(кто является user1, а кто user2)
        // каждый для себя является user1, а собеседник user2. К примеру для Богдана он user1 > user2, а для Николая он сам является user1, но < user2
        // user1 Богдана !== user1 Николая, поэтому всегда имеем одинаковый id их диалога
        const id = (user1 > user2) ? `${user1 + user2}` : `${user2 + user1}`

        await addDoc(collection(dataBase, "messages", id, "chat"), {
            textValue: textValue,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            mediaAttachment: url || ''
        });

        await setDoc(doc(dataBase, 'lastMessage', id), {
            textValue: textValue,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            mediaAttachment: url || '',
            unread: true
        })

        setTextValue('')
        setImg('')

    }
   // console.log(messages)

    if (loading) {
        return <Loader/>
    }

    return (
        <div className={`${styles.chat} + ${selectUser ? styles.modChat : null}`}>
            {
                /*chat.displayName*/ selectUser ?
                    <>
                        <div className={styles.chatHeader}>
                            <ButtonBack />
                            <div>{chat.displayName}</div>
                            {/*<button onClick={() => dispatch(setSelectUser(false))}>Назад</button>*/}
                        </div>

                        <div className={styles.messages}>
                            {messages.length > 0 ?
                                messages.map(message =>
                                    <Message /*key={v4()}*/ key={`${message.createdAt.seconds}${message.createdAt.nanoseconds}`} message={message} user1={user1} user2={user2}/>
                                )
                                : null
                            }
                        </div>
                        <MessagesInput handleSubmitMessage={handleSubmitMessage} textValue={textValue}
                                       setTextValue={setTextValue} setImg={setImg}/>
                    </>
                    : <h3>Choose a chat to start the conversation</h3>
            }
        </div>


    );
};

export default Home;