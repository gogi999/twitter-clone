import React from 'react';

import TimelineTweet from '../TimelineTweet/TimelineTweet';

const MainTweet = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>
            <p className="font-bold pl-2 y-2">
                Username
            </p>
            <form className="border-b-2 pb-6">
                <textarea
                    //onChange={(e) => setTweetText(e.target.value)}
                    type="text"
                    placeholder="What's happening"
                    maxLength={280}
                    className="bg-slate-200 rounded-lg w-full p-2"
                ></textarea>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full ml-auto"
                >
                    Tweet
                </button>
            </form>
            <TimelineTweet />
        </div>
    );
}

export default MainTweet;
