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
    },

    //unused for now becuase the review is already sent by the show review call. Can take the comments off of that call.
  fetch(req,res,next){
        const _id= req.params._id
        Review.find({_id})
      .populate('comments')
      .populate('comments.user')
      .then((review)=>res.send(review))
      .catch(next);
    }
    

};
