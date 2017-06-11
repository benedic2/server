const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema ({
    reviewDate: Date,
    name: String,
    projectName: String,
    singleSentance: String,
    threeSentance: String,
    photoMain: String, 
    team: String, 
    launchDate: Date, 
    delivery: Date, 
    gradeOverall: Number, 
    gradeMaking: Number,
    gradeFinancials: Number,
    gradeFeasible: Number,
    projectSummary: String,
    detailOverall: String,
    detailManufacturing: String,
    detailBudget: String,
    detailEngineering: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }]
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;
