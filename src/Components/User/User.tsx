import React, {FC, useEffect, useState} from 'react';
import defaultPhoto from './../../assets/defaultPhoto.png'
import styles from './styles.module.scss'
import {onSnapshot, doc, getDoc, updateDoc} from 'firebase/firestore'
import {dataBase} from "../../firebaseConf";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {setChat} from "../../store/reducers/chatsSlice";

interface UserProps {
    user: {
        displayName: string,
        avatar: string,
        isOnline: boolean,
        uid: string
    },
    handleSelectUser: (user: any) => void,
    user1: any,
    chat: any
}

const User: FC<UserProps> = ({user, handleSelectUser, user1, chat}) => {
    const dispatch = useAppDispatch()
    const {selectUser} = useAppSelector(state => state.chats)
    const [lastMessage, setLastMessage] = useState<any>()
    const user2 = user?.uid
    const id = (user1 > user2) ? `${user1 + user2}` : `${user2 + user1}`
    useEffect(() => {
        let unsub = onSnapshot(doc(dataBase, 'lastMessage', id), (snapshot) => {
            setLastMessage(snapshot.data())
           // console.log(chat)

                // removeUnread нужен для того чтобы, если сообщение пришло от пользователя с которым сейчас открыт диалог
                // иконка new в sidebar'e не появлялась
            const removeUnread = async () => {
                const lastMessageDoc =  await getDoc(doc(dataBase, 'lastMessage', id))
              //  console.log(lastMessageDoc.data()?.from)
               // console.log('user2', chat.uid)
                if (lastMessageDoc.data()?.from === chat?.uid) {
                    await updateDoc(doc(dataBase, 'lastMessage', id), {
                        unread: false
                    })
                }
            }
            removeUnread()
        })
        return () => unsub()
    }, [chat?.uid])
  //  console.log(lastMessage)

    /*const handleClick =  (user: any) => {
        console.log(user)
        dispatch(setChat(user))
        handleSelectUser(user)
    }*/


    return (
        <div className={`${styles.userChat} + ${((chat?.uid === user.uid) && selectUser) ? styles.selectedChat : null}`}
             onClick={() => handleSelectUser(user)}>
            <div className={styles.userAvatar}>
                <img src={user?.avatar || defaultPhoto} alt=""/>
                <div className={`${styles.userStatus} + ' ' ${user.isOnline ? styles.online : styles.offline}`}></div>
            </div>


            <div className={styles.userChatInfo}>
                <span>{user.displayName}</span>

                {lastMessage ?
                    <p>
                        <strong>{lastMessage.from === user1 ? 'Вы: ' : null}</strong>
                        {lastMessage?.textValue.length > 15 ? `${lastMessage?.textValue.slice(0, 15)}...`: lastMessage?.textValue}
                    </p>
                    : null
                }
            </div>

            {lastMessage?.from !== user1 && lastMessage?.unread && <small
                className={`${styles.newMessage} + ${!(lastMessage?.from !== user1 && lastMessage?.unread) ? styles.none : null}`}>New</small>}


            <div></div>
        </div>
    );
};

export default User;