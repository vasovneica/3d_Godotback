import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {    
        fullName: {
            type: String,
            required: true,
        },
        login: {
            type: String,
            required: true,
            unique: true,

        },
        passwordHash: {
            type: String,
            required: true,
        },
        avatarUrl: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User",UserSchema);