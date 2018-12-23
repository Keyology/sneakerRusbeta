const Busisness = require('../models/business');
const mongoose = require('mongoose');

module.exports = (app) => {

    app.get('/', (req, res) => {
        // get and render html to client
        res.render('index')

    });

    app.get('/signup', (req, res) => {
        // get and render signup page
        res.render('signup')
    });

    app.post('/signup', (req, res) => {
        console.log("the post  route has been hit");
        //this route will handel when a signup form has been submitted
        const reqNew = req.body;
        const newBusisness = new Busisness({
            account_id: new mongoose.Types.ObjectId(),
            name: reqNew.name,
            email: reqNew.email,
            street_address: reqNew.address,
            city: reqNew.city,
            zipCode: reqNew.zip,
            country: reqNew.ctry,
            store_name: req.body.storeName,
            phone_number: reqNew.phone,
            instagram_handle: reqNew.igh
        })

        newBusisness.save().then(function () {
            res.send('<h1>Form submited</h1>').status(200)
            console.log('form has been saved');
        }).catch(err => {
            res.json({
                err: err,
                Message: " form has not be saved"
            }).status(400);
        })


    })

}