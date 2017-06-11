const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const ReviewController = require ('./controllers/review_controller');
const ReviewClientController = require('./controllers/review_client_controller');
const ReviewSearch = require ('./controllers/review_search');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {

    //homepage
    app.get('/', requireAuth, function(req, res) {
        res.send({ message: 'Super secret code is ABC123' });
    });

    //signin and sign up
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    
    //Reviews
    app.get('/reviews/:criteria', ReviewClientController.fetchAll );
    app.get('/review/:_id', ReviewClientController.fetch );
    app.post('/review/search', ReviewSearch.reviewSearch);
    
    
    //SuperUsergroup
    app.post('/review_secretspot', requireAuth, ReviewController.create );
    app.delete('/review_secretspot', requireAuth, ReviewController.delete);
    app.put('/review_secretspot', requireAuth, ReviewController.edit);
}
