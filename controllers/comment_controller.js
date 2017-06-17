const Comment = require('../models/comment');
const Review = require('../models/review');
const User = require('../models/user');


module.exports = {

    create(req,res,next){
        const commentProps = req.body;
        const _id = req.params._id;
        const id = req.params.user;

        const comment = new Comment({
            late: commentProps.late,
            comment: commentProps.comment,
            grade: commentProps.grade,
            user: id
        })

        comment.save()
            .then(()=>User.findOne({_id:id}))
            .then((user)=>{
            user.comments.push(comment._id);
            return user.save();
        })
            .then(()=>Review.findOne({_id}))
            .then((review)=>{
            review.comments.push(comment._id);
            return review.save();
        })

            .then(res.send(comment))        
            .catch(next);
    }
};

/*
Stable version of a simple review creation with similar format
    create(req,res,next){
        const reviewProps = req.body;

        Review.create(reviewProps)
            .then(review=>res.send(review))
            .catch(next);
            */