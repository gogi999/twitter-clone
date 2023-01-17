import React, {
  useEffect,
  useState,
} from 'react';

import axios from 'axios';
import formatDistance from 'date-fns/formatDistance';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Tweet = ({ tweet, setData }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [userData, setUserData] = useState();

    const dateStr = formatDistance(new Date(tweet.createdAt), new Date());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const findUser = await axios.get(`/users/find/${tweet.userId}`);

                setUserData(findUser.data);
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();
    }, [tweet.userId, tweet.likes]);

    return (
        <div>
            {userData && (
                <>
                    <div className="flex space-x-2">
                        {/* <img src="" alt="" /> */}
                        <Link to={`/profile/${userData._id}`}>
                            <h3 className="font-bold">
                                {userData.username}
                            </h3>
                        </Link>
                        <span className="font-normal">
                            @{userData.username}
                        </span>
                        <p> - {dateStr} ago</p>
                    </div>
                </>
            )}
        </div>
    );
}

export default Tweet;
