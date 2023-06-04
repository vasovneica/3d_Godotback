import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import OwnerModel from "../models/Owner.js";

export const register = async (req, res) => {
    try {


        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new OwnerModel({
            login: req.body.login,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secretwheel7",

            {
                expiresIn: "30d",
            }
        );
        const { passwordHash, ...userData } = user._doc;


        res.json({
            ...userData,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to register",
        })
    }
};

export const login = async (req, res) => {
    try {
        const user = await OwnerModel.findOne({ login: req.body.login })
        if (!user) {
            return res.status(404).json({
                message: "user not found",
            })
        }
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: "invalid username or password",
            })
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            "secretwheel7",

            {
                expiresIn: "30d",
            }
        );
        const { passwordHash, ...userData } = user._doc;


        res.json({
            ...userData,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to log in",
        })
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await OwnerModel.findById(req.userId);
        if (!user) {
            res.status(404).json({
                message: "user not found",
            })
        }
        const { passwordHash, ...userData } = user._doc;


        res.json(userData)

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "no access",
        })
    }


};
