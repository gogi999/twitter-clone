import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import app from '../../firebase';
import {
  changeProfile,
  signout,
} from '../../redux/userSlice';

const EditProfile = ({ setOpen }) => {
    const [img, setImg] = useState(null);
    const [imgUploadProgress, setImgUploadProgress] = useState(0);
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const uploadImg = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress =(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImgUploadProgress(Math.round(progress));
                    switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused!');
                        break;
                    case 'running':
                        console.log('Upload is running!');
                        break;
                    default:
                        break;
                    }
            },
            (error) => {},
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    try {
                        const updateProfile = await axios.put(`/users/${currentUser._id}`, {
                            profilePicture: downloadURL,
                        });
            
                        console.log(updateProfile);
                    } catch (error) {
                        console.log(error);
                    }
            
                    console.log('downloaded ' + downloadURL);
                    dispatch(changeProfile(downloadURL));
                });
            }
        );
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`/users/${currentUser._id}`);
            dispatch(signout());
            navigate('/signin');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        img && uploadImg(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [img]);

    return (
        <div className="absolute w-full h-full top-0 left-0 bg-transparent flex items-center justify-center">
            <div className="w-[600px] h-[600px] bg-slate-200 rounded-ld p-8 flex flex-col gap-4 relative">
                <button 
                    className="absolute top-3 right-3 cursor-pointer"
                    onClick={() => setOpen(false)}    
                >
                    X
                </button>
                <h2 className="font-bold text-xl">Edit Profile</h2>
                <p>Choose a new profile picture</p>
                {imgUploadProgress > 0 ? (
                    "Uploading " + imgUploadProgress + "%"
                ) : (
                    <input
                        type="file"
                        className="bg-transparent border border-slate-500 rounded p-2"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                )}
                <p>Delete Account</p>
                <button
                    className="bg-red-500 text-white py-2 rounded-full"
                    onClick={handleDelete}
                >
                    DeleteAccount
                </button>
            </div>
        </div>
    );
}

export default EditProfile;
