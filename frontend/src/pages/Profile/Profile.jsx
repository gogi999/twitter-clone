import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useParams } from 'react-router-dom';

import EditProfile from '../../components/EditProfile/EditProfile';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import Tweet from '../../components/Tweet/Tweet';
import { following } from '../../redux/userSlice';

const Profile = () => {
    const [userTweets, setUserTweets] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [open, setOpen] = useState(false);
    const { currentUser } = useSelector((state) => state.user);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userTweets = await axios.get(`/tweets/user/all/${id}`);
                const userProfile = await axios.get(`/users/find/${id}`);

                setUserTweets(userTweets.data);
                setUserProfile(userProfile.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [currentUser, id]);

    const handleFollow = async () => {
        if (currentUser.following.includes(id)) {        
            try {
                const follow = await axios.put(`/users/follow/${id}`, {
                    id: currentUser._id,
                });
                dispatch(following(id));
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const unfollow = await axios.put(`/users/unfollow/${id}`, {
                    id: currentUser._id,
                });
                dispatch(following(id));
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-4">
                <div className="px-6">
                    <LeftSidebar />
                </div>
                <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
                    <div className="flex justify-between items-center">
                        <img 
                            src={userProfile?.profilePicture} 
                            alt="Profile Pic" 
                            className="w-12 h-12 rounded-full"    
                        />
                        {currentUser._id === id ? (
                            <button 
                                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                                onClick={() => setOpen(true)}    
                            >
                                Edit Profile
                            </button>
                        ) : currentUser.following.includes(id) ? (
                            <button 
                                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                                onClick={handleFollow}    
                            >
                                Following
                            </button>
                        ) : (
                            <button 
                                className="px-4 py-2 bg-blue-500 rounded-full text-white"
                                onClick={handleFollow}    
                            >
                                Follow
                            </button>
                        )}
                    </div>
                    <div className="mt-6">
                        {userTweets && userTweets.map((tweet) => (
                            <div className="p-2" key={tweet._id}>
                                <Tweet tweet={tweet} setData={setUserTweets} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="px-6">
                    <RightSidebar />
                </div>
            </div>
            {open && <EditProfile setOpen={setOpen} />}
        </>
    );
}

export default Profile;
