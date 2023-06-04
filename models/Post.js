import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
    {    
        title: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
           

        },
        faces: {
            type: Number,
            required: true,
        },
        loadCount:{
            type:Number,
            default:0,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            
            required: true,

        },
        
        imageUrl: {
            type: String,
            required:true,
        },   
        secondImageUrl:{
            type:String,
            require:true,
        },    

        
        modelUrl:{
         type:String,
         required:true,
        },
        group:{
            type:String,
            required:true,
        }
        
    },

    {
        timestamps: true,
    }
);

export default mongoose.model("Post",PostSchema);