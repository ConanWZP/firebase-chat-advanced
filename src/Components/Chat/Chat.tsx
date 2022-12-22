import React from 'react';
import {useAppSelector} from "../../hooks/reduxHooks";
import styles from '../../Pages/home.module.scss'

const Chat = () => {

    const {chat} = useAppSelector(state => state.chats)
    return (
        <div className={styles.chat}>
            {
                chat.displayName ?
                    <div className={styles.chatHeader}>
                        {chat.displayName}
                    </div>
                    : <h3>Choose a chat to start the conversation</h3>
            }

            <div style={{flex: '1 1 auto'}}>
                Само окно с чатом
                {chat.displayName}
                <br/>
                Тут будет `Тег Messages`
            </div>
            <div>
                Поле ввода <textarea/>
            </div>
        </div>
    );
};

export default Chat;