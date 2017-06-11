const Review = require('../models/review');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 {all: [artists],count:count, offset:offset, limit:limit}
 */
module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
   const query = Review
    .find(buildQuery(criteria))
    //using an es6 interpolated key square brackets reads in the property
    .sort({[sortProperty] : 1})
    .skip(offset)
    .limit(limit)
    
    return Promise.all([query, Review
    .find(buildQuery(criteria)).count()])
    .then((result)=>{
        return {
            all:result[0], 
            count:result[1], 
            offset: offset, 
            limit: limit
        };
    });
};

const buildQuery = (criteria) =>{
    //first translate criteria object to a more usable object
    const query ={};
    
    if (criteria.projectName) {
        //do a text search for the name. Accept partial text search
        query.$text={$search: criteria.projectName};
    }
    
    if (criteria.launchDate) {
        query.launchDate={
            $gte:criteria.launchDate.min,
            $lte:criteria.launchDate.max            
        };
    }
    
    if (criteria.gradeOverall) {
        query.yearsActive={
            $gte: criteria.gradeOverall.min,
            $lte: criteria.gradeOverall.max
        };
    }
    return query;
};