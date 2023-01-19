import React, { useEffect } from 'react';

import axios from 'axios';
import {
  useLocation,
  useParams,
} from 'react-router-dom';

const UserPlaceholder = ({ userData, setUserData }) => {
    const { id } = useParams();
    const location = useLocation().pathname;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await axios.get(`/users/find/${id}`);
                setUserData(userProfile.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div>
            {userData?.username}
        </div>
    );
}

export default UserPlaceholder;
