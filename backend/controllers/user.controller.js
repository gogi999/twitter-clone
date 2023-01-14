import User from '../models/user.model.js';
import { handleError } from '../utils/error.js';

// import { handleError } from '../utils/error.js';

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        res.status(200).json(user);
    } catch (err) {
        
    }
};

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id, 
                { $set: req.body }, 
                { new: true }
            );

            res.status(200).json(updateUser);
        } catch (err) {
            next(err);
        }       
    } else {
        return next(handleError(403, 'You can only update your own account!'));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json('User deleted!');
        } catch (err) {
            next(err);
        }       
    } else {
        return next(handleError(403, 'You can only update your own account!'));
    }
};

export const follow = async (req, res, next) => {
    try {
        // User
        const user = await User.findById(req.params.id);

        // Current user
        const currentUser = await User.findById(req.body.id);

        if (!user.followers.includes(req.body.id)) {
            await user.updateOne({
                $push: { followers: req.body.id }
            });

            await currentUser.updateOne({
                $push: { following: req.params.id }
            });
        } else {
            res.status(403).json('You already follow this user!');
        }

        res.status(200).json('You have started to follow this user!');
    } catch (err) {
        next(err);
    } 
};
