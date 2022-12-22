import React, {FC, useEffect, useRef, useState} from 'react';
import Moment from "react-moment";
import styles from './styles.module.scss'
import {useAppSelector} from "../../hooks/reduxHooks";
import {doc, getDoc} from "firebase/firestore";
import {auth, dataBase} from "../../firebaseConf";
import defaultPhoto from './../../assets/defaultPhoto.png'
import {useWhyDidYouUpdate} from "ahooks";

interface IMessageProps {
    message: any,
    user1: string,
    user2: string
}

const Message: FC<IMessageProps> = React.memo(({message, user1, user2}) => {

    //console.log(`${message.createdAt.seconds}${message.createdAt.nanoseconds}`)


    const {userInfo} = useAppSelector(state => state.auth)

    const scrollRef = useRef<any>(null)

    const [userLocal, setUserLocal] = useState<any>()

    useEffect(() => {

        // @ts-ignore
        getDoc(doc(dataBase, 'users', user2)).then((docSnap) => {
            if (docSnap.exists()) {
                setUserLocal(docSnap.data())
            }
        })

    }, [])



    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [message])

    const user1Avatar = userInfo?.avatar ? userInfo.avatar : defaultPhoto
    const user2Avatar = userLocal?.avatar ? userLocal.avatar : defaultPhoto

  //  useWhyDidYouUpdate('Message', {message, user1, user2})

    return (
            <div className={`${styles.messageWrapper} ${message.from === user1 ? styles.messageYour : ''}` }  ref={scrollRef}>
                <div className={styles.messageDataInfo}>
                    <img
                        src={
                            message.from === user1
                                ? user1Avatar
                                : user2Avatar
                        }
                        alt=""/>
                    <small>
                        <Moment fromNow>{message.createdAt.toDate()}</Moment>
                    </small>
                </div>
                <div className={styles.message}>
                    <p>{message.textValue}</p>
                    {message.mediaAttachment ? <img src={message.mediaAttachment}/> : null}
                </div>
            </div>


    );
});

export default Message;