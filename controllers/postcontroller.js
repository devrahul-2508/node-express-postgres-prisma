import prisma from "../DB/db.config.js";

export const createPost = async(req,res)=>{
    const {user_id,title,description}=req.body



    const newPost = await prisma.post.create({
        data:{
           user_id:Number(user_id),
           title,
           description
        }
    })

    return res.json({
        status:200,
        data:newPost,
        message:"Post created successfully"
    })
}

export const updatePost = async(req,res)=>{
    const postId=req.params.id
    const {user_id,title,description}=req.body

    const updatedpost = await prisma.post.update({
        where:{
            id:Number(postId)
        },
        data:{
            user_id:Number(user_id),
            title,
            description
        }
    })

    return res.json({
        status:200,
        data: updatedpost,
        message:"Post updated successfully"
    })
}

export const fetchPosts = async(req,res)=>{
    const page = req.query.page || 1
    const limit = 2

    if(page<=0){
        page = 1
    }

    const skip = (page-1)*limit
    const posts = await prisma.post.findMany({
        skip:skip,
        take:limit,
        include:{
            comment: {
                include:{
                    user:true
                }
            }
        },
        orderBy:{
            id:"desc"
        },
        where:{
            OR:[
                {
                   title:{
                    startsWith: "Next"
                   } 
                },
                {
                    title:{
                        endsWith:"Blog"
                    }
                }
            ]
        }
    })

    // to get the total post count
    const totalPosts = await prisma.post.count()
    const totalPages = Math.ceil(totalPosts/limit)
    return res.json({
        status:200,
        data: posts,
        meta:{
            totalPages,currentPage:page,limit:limit
        },
        message:"posts fetched successfully"
    })
}

export const showPost = async(req,res)=>{
    const postId= req.params.id
    const post = await prisma.post.findFirst({
        where:{
            id:Number(postId)
        }
    })

    return res.json({
        status:200,
        data: post,
        message:"Post fetched successfully"
    })
}

export const deletePost = async(req,res)=>{
    const postId= req.params.id
    await prisma.post.delete({
        where:{
            id:Number(postId)
        }
    })

    return res.json({
        status:200,
        message:"Post deleted succesfully"
    })


}

export const searchPosts = async(req,res)=>{
   const query = req.query.q
   const posts = await prisma.post.findMany({
    where:{
        description:{
            search:query
        }
    }
   })

   return res.json({
    status:200,
    data: posts,
    message:"Posts fetched successfully"
})
}

