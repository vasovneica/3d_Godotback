import PostModel from "../models/Post.js";


export const getLastTags = async (req,res)=>{
    try {
        const posts = await PostModel.find().populate().limit(5).exec();

        const tags = posts
        .map(obj=>obj.tags).flat()
        .slice(0,5);

        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get all articles",
        })

    }
}




export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate("user").exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get all articles",
        })

    }
}

// only find not count

// export const getOne = async (req, res) => {
//     try {
//         const postId = req.params.id;
//          const post=await PostModel.findOne({
//             _id:postId,
//          })
//         //  (err.doc)=>{
//         //     if(err){
//         //         console.log(err);
//         //         return res.status(500).json({
//         //             message:"failed to get article"
//         //         })
//         //     }
//         //     if (!doc){
//         //         return res.status(404).json({
//         //             message:"article  not found";
//         //         });

//         //     }
//         //     res.json(doc);
//         //  }



//         //  )
//                 res.json(post);

//             }



//      catch (error) {
//         console.log(error);
//         res.status(500).json({
//             message: "failed to get one article",
//         })

//     }
// }
export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;
        
        PostModel.findOneAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: 'after',
            }
        )
            .then((doc) => {
                res.json(doc);
            })
            .catch((err) => {
                console.log(err);
                res.status(404).json({ message: 'Статья не найдена' });
            });
    }



    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get one article",
        })

    }
}

export const getGroup = async (req, res) => {
    // console.log(req.params.group);
    // const postsGroup = req.params.id;
    const postGroup = req.params;

    try {
        console.log("postgroup",postGroup);
        const posts = await PostModel.find(postGroup).populate("user").exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get all articles",
        })

    }
}


export const remove = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.findOneAndDelete({
            _id: postId,
        })
            .then((doc) => {
                if (!doc) {
                    return res.status(500).json({
                        message: "failed to get article",
                    });
                }
                res.json({
                    success: true,
                })
            })

            .catch((err) => {
                console.log(err);
                res.status(404).json({ message: "failed to delete article" });
            });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to get one article",
        })

    }
}

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            faces: req.body.faces,
            imageUrl: req.body.imageUrl,
            secondImageUrl:req.body.secondImageUrl,
            group: req.body.group,
            user: req.userId,
            modelUrl:req.body.modelUrl,
        });
        const post = await doc.save();

        res.json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "failed to create the article",
        })
    }
}

export const update = async (req, res) => {
    try {
        const postId = req.params.id;
        await PostModel.updateOne({
            _id: postId,
        },
            {
                title: req.body.title,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
                user: req.userId,
            }).then(
                res.json({
                    success: true
                })
            )
            .catch((err) => {
                console.log(err);
                res.status(404).json({ message: "failed to update article" });
            });
    }
    catch (error) {
        console.log(error);
    }
}

