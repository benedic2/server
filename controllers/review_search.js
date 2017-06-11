const Review = require('../models/review');

/**
Searches through the reviews by project name and returns a list of the reviews that matcha regular expression based on the project name text entered. 
*/
module.exports = {

    reviewSearch(req,res,next){
        const criteria = req.body;
        const offset = 0;
        const limit = 20;

        const all = buildQuery(criteria)
        .find(buildQuery(criteria))
        //using an es6 interpolated key square brackets reads in the property
        .skip(offset)
        .limit(limit)
        .then(results=>
        res.send (results));
    }
}

const buildQuery = (criteria) =>{
    //first translate criteria object to a more usable object
    let query = Review
    .find({})
    .sort({projectDate : 1});

    if (criteria.projectName) {
        //Use mongoose to search the the full search results
        query = query
            .where('projectName')
            .equals(new RegExp(criteria.projectName, 'i'));
    }
    /*   ways to add additional search parameters perhaps project launch date or grade filters later on 
    if (criteria.age) {
        query.age={
            $gte:criteria.age.min,
            $lte:criteria.age.max            
        };
    }

    if (criteria.yearsActive) {
        query.yearsActive={
            $gte: criteria.yearsActive.min,
            $lte: criteria.yearsActive.max
        };
    }
    */
    return query;
};

