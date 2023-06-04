import { log } from "console";
import multer from "multer";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { registerValidation, loginValidation, postCreateValidation} from "./validations.js";
import checkAuth from "./utils/checkAuth.js";
import * as OwnerController from "./controllers/OwnerController.js";
import * as PostController from "./controllers/PostController.js";
import handleValidationErrors from "./utils/handleValidationErrors.js";



mongoose.connect(process.env.MONGO_DB_URI
    ,

).then(() => { console.log("DB OK"); })
    .catch((err) => console.log("DB error", err));

const app = express();

const storage= multer.diskStorage({
    destination:(_, __,cb)=>{
        cb(null,"uploads");

    },
    filename:(_, file,cb)=>{
        cb(null,file.originalname);

    }
});

const upload=multer({storage});


app.use(express.json());

app.use(cors());

app.use("/uploads",express.static("uploads"));

app.post("/auth/login",loginValidation,handleValidationErrors, OwnerController.login)

app.post("/auth/register", registerValidation,handleValidationErrors,OwnerController.register )

app.post("/upload",checkAuth, upload.single("image"),(req,res)=>{
    res.json({
        url:`/uploads/${req.file.originalname}`
    })
})

app.get("/auth/me", checkAuth,OwnerController.getMe )

app.get("/posts",PostController.getAll )

app.get("/tags",PostController.getLastTags )

app.get("/posts/:id",PostController.getOne)

app.get("/groups/:group",PostController.getGroup)

app.post("/posts",checkAuth,postCreateValidation,handleValidationErrors,PostController.create)

app.patch("/posts/:id",checkAuth,postCreateValidation,handleValidationErrors,PostController.update )

app.delete("/posts/:id",checkAuth,PostController.remove )


app.listen(process.env.PORT || 4444, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server OK");
})