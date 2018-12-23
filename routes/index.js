

module.exports = (app) => {

    app.get('/', (req, res) => {
        // get and render html to client
        res.render('index')

    });

    app.get('/signup', (req, res) => {
        // get and render signup page
        res.render('signup')
    });


}