import React, {FC, useRef} from 'react';
import styles from './styles.module.scss'
import Image from "../Image";

interface IMessagesInputProps {
    handleSubmitMessage: (e: any) => void,
    textValue: any,
    setTextValue: (tex: any) => void,
    setImg: (e: any) => void
}

const MessagesInput: FC<IMessagesInputProps> = ({handleSubmitMessage, setTextValue, textValue, setImg}) => {

    const photo = useRef<HTMLInputElement>(null)
    const attachPhoto = () => {
        photo.current?.click()
    }


    return (
        <form className={styles.input} onSubmit={handleSubmitMessage}>
            <input
                type="text"
                placeholder="Напишите сообщение..."
                value={textValue}
                onChange={(tex: any) => setTextValue(tex.target.value)}

            />
            <div className={styles.send}>
                <div onClick={attachPhoto} className={styles.photo}>
                    <input
                        type="file"
                        style={{display: "none"}}
                        ref={photo}
                        onChange={(e: any) => setImg(e.target.files[0])}
                    />
                    <Image/>
                </div>
                <button>Send</button>
            </div>
        </form>
    );
};

export default MessagesInput;