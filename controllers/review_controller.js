const Review = require('../models/review');

module.exports = {

    create(req,res,next){
        const reviewProps = req.body;

        Review.create(reviewProps)
            .then(review=>res.send(review))
            .catch(next);
    },

        edit(req,res,next) {
            const reviewId = req.params.id;
            const reviewProps = req.params.body;

            Review.findByIdAndUpdate({_id: reviewId}, reviewProps)
                .then(()=>Review.findById({_id:reviewId}))
                .then(review=>res.send(review))
                .catch(next);
        },

            delete(req,res,next) {
                const reviewId = req.params.id;

                Review.findOneByIdAndRemove({_id: reviewId})
                    .then(review=>res.status(204).send(review))
                    .catch(next);
            }
};