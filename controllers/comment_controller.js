const Comment = require('../models/comment');
const Review = require('../models/review');
const User = require('../models/user');


module.exports = {

    create(req,res,next){
        const commentProps = req.body;
        //        const _id = req.params._id;
        //        const id = req.params.user;

        //        .then(comment=>comment.user=User.findOne({_id:id}))
        //       comment.save()
        //comment.user=user)
        //       .then(User.findOne({id}))       
        //    .then(comment.user=user)
        //    .then(comment => comment.save())
        //        review.comments.push(comment);
        //        user.comments.push(comment);

        //        Promise.all([review.save(),comment.save(),user.save()])
    
        // stable simple comment creator without linking anything
        Comment.create(commentProps)
            .then(comment=>res.send(comment))
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