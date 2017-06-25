const Review = require('../models/review');

module.exports = {

    fetchAll(req,res,next){
        const sortCriteria= req.params.criteria
        Review.find({})
            .sort({[sortCriteria]:'asc'})
            .then(review=>res.send(review))
            .catch(next);
    },

    fetch(req,res,next){
        const _id = req.params._id
        Review.find({_id})
            .populate({
            path: 'comments',
            model: 'comment',
            options:{sort:{'created_at': -1}},
            populate: {
                path: 'user',
                model: 'user'
            }
        })
            .then(review=>res.send(review))
            .catch(next);
        },

                      };