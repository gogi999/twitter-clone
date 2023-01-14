import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        const { password, ...otherData } = newUser._doc;

        res
            .cookie('access_token', token, { 
                httpOnly: true 
            })
            .status(200)
            .json(otherData);
    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    try {
        
    } catch (err) {
        
    }
};

