import prisma from "../DB/db.config.js";

export const createComment = async(req,res)=>{
    const {user_id,post_id,comment}=req.body

        //Increase comment count

    const newComment = await prisma.comment.create({
        data:{
           user_id:Number(user_id),
           post_id:Number(post_id),
           comment
        }
    })

    await prisma.post.update({
        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                increment:1
            }
        }
    })

    return res.json({
        status:200,
        data:newComment,
        message:"Comment created successfully"
    })
}

export const updateComment = async(req,res)=>{
    const commentId=req.params.id
    const {user_id,post_id,comment}=req.body

    const updatedComment = await prisma.comment.update({
        where:{
            id:Number(commentId)
        },
        data:{
            user_id:Number(user_id),
            post_id:Number(post_id),
            comment
        }
    })

    return res.json({
        status:200,
        data: updatedComment,
        message:"comment updated successfully"
    })
}

export const fetchComments = async(req,res)=>{
    const comments = await prisma.comment.findMany({
        include:{
            user:true,
            post:{
                include:{
                    user:true
                }
            }
        }
    })
    return res.json({
        status:200,
        data: comments,
        message:"comments fetched successfully"
    })
}

export const showComment = async(req,res)=>{
    const commentId= req.params.id
    const comment = await prisma.comment.findFirst({
        where:{
            id:Number(commentId)
        }
    })

    return res.json({
        status:200,
        data: comment,
        message:"comment fetched successfully"
    })
}

export const deleteComment = async(req,res)=>{
    const commentId= req.params.id
    await prisma.comment.delete({
        where:{
            id:Number(commentId)
        }
    })

    await prisma.post.update({
        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                decrement:1
            }
        }
    })

    return res.json({
        status:200,
        message:"Comment deleted succesfully"
    })


}

