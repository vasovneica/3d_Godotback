import {body}  from "express-validator";

export const loginValidation=[
    body("login","invalid mail format").isLength({min:2}).isString(),
    body("password","your password very short (min 5 letters)").isLength({min:5}),
]

export const registerValidation=[
    body("login","invalid mail format").isLength({min:2}).isString(),
    body("password","your password very short (min 5 letters)").isLength({min:5}),
    body("fullName","write down your name").isLength({min:3}),
    body("avatarUrl","invalid link to ava").optional().isURL(),
]

export const postCreateValidation=[
    body("title","enter the title of the article (min 5 letters)").isLength({min:5}).isString(),
    body("text","enter the text of the article (min 5 letters)").isLength({min:5}).isString(),
    body("faces","invalid faces format").optional().isNumeric(),
    body("imageUrl","invalid link to image").optional().isString(),
    body("secondImageUrl","invalid link to image").optional().isString(),
    body("modelUrl","invalid link to model").optional().isString(),
]
