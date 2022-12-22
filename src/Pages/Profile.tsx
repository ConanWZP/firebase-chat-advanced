import React, {useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import defaultPhoto from './../assets/defaultPhoto.png'
import styles from './profile.module.scss'
import Camera from "../Components/Svg/Camera";
import {ref, getDownloadURL, uploadBytes, deleteObject} from 'firebase/storage'
import {auth, dataBase, storage} from "../firebaseConf";
import {doc, getDoc, updateDoc} from "firebase/firestore";
import Trashbin from "../Components/Svg/Trashbin";
import {setUserData} from "../store/reducers/authSlice";

const Profile = () => {

    const {userInfo} = useAppSelector(state => state.auth)
    const photoRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()


    const [img, setImg] = useState<any>()
   // console.log(img)
    const chooseFile = () => {
        photoRef.current?.click()
    }

    //const [userLocal, setUserLocal] = useState<any>()
    //console.log(userLocal)
    //console.log(userInfo)

    useEffect(() => {

        // @ts-ignore
        getDoc(doc(dataBase, 'users', auth.currentUser?.uid)).then((docSnap) => {
            if (docSnap.exists()) {
                dispatch(setUserData(docSnap.data()))
                // setUserLocal(docSnap.data())
            }
        })

        if (img) {
            const uploadImg = async () => {

                const imgRef = ref(storage, `mainPhoto/${new Date().getTime()} - ${img?.name}`)
                try {
                    if (userInfo.avatarPath) {
                        await deleteObject(ref(storage, userInfo.avatarPath))
                    }
                    const uploadAvatarToServer = await uploadBytes(imgRef, img)
                    console.log(uploadAvatarToServer.ref.fullPath)

                    const photoUrl = await getDownloadURL(ref(storage, uploadAvatarToServer.ref.fullPath))

                    // @ts-ignore
                    await updateDoc(doc(dataBase, 'users', auth.currentUser?.uid), {
                        avatar: photoUrl,
                        avatarPath: uploadAvatarToServer.ref.fullPath
                    })
                    setImg('')

                    //  console.log(uploadAvatarToServer.ref.fullPath)
                    //  console.log(photoUrl)
                } catch (e: any) {
                    console.log(e.message)
                }


            }
            uploadImg()
        }
    }, [img, /*userLocal?.avatarPath*/ userInfo?.avatarPath])

    const deleteImage = async () => {
        try {
            const confirmDeleteImage = window.confirm('Do you really want to delete avatar?')
            if (confirmDeleteImage) {
                await deleteObject(ref(storage, userInfo.avatarPath));

                // @ts-ignore
                await updateDoc(doc(dataBase, 'users', auth.currentUser?.uid), {
                    avatar: '',
                    avatarPath: ''
                })
            }
        } catch (e: any) {
            console.log(e.message)
        }
    }

    return (
        <section className={styles.profileContainer}>
            <div className={styles.profileContent}>
                <div className={styles.photoData}>
                    <div className={styles.profileImage}>
                        <img src={userInfo?.avatar || defaultPhoto} alt={'avatar'}/>
                        <div className={styles.overlay} onClick={chooseFile}>
                            <div>
                                <Camera/>
                                {userInfo.avatar ? <Trashbin deleteImage={deleteImage}/> : null}
                                <input type={'file'} style={{display: 'none'}}
                                       accept='image/*' ref={photoRef}
                                       onChange={(e: any) => setImg(e.target.files[0])}/>
                            </div>
                        </div>
                    </div>

                    <div className={styles.mobileVersion} onClick={chooseFile} >Сменить фото</div>
                    <div className={styles.mobileVersion} onClick={deleteImage}>Удалить фото</div>
                </div>


                <div className={styles.profileData}>
                    <h2>{userInfo.displayName}</h2>
                    <div className={styles.email}>{userInfo.email}</div>
                    <div>Зарегистрирован: {userInfo.createdAt.toDate().toDateString()}</div>
                </div>
            </div>
        </section>
    );
};

export default Profile;