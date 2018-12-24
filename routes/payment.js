const paypal = require('paypal-rest-sdk');
require('dotenv').config('../.env');

module.exports = (app) => {
    // this file will handle payment with paypal



    app.get('/pay', (req, res) => {
        // configure paypal with the credentials you got when you created your paypal app
        paypal.configure({
            'mode': 'sandbox', //sandbox or live 
            'client_id': process.env.Paypal_clientId, // please provide your client id here 
            'client_secret': process.env.paypal_secrect // provide your client secret here 
        });


        // create payment object 
        const payment = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://127.0.0.1:5000/success",
                "cancel_url": "http://127.0.0.1:5000/err"
            },
            "transactions": [{
                "amount": {
                    "total": 10.00,
                    "currency": "USD"
                },
                "description": " paying for beta test "
            }]
        }


        // call the create Pay method 
        createPay(payment)
            .then((transaction) => {
                const id = transaction.id;
                const links = transaction.links;
                let counter = links.length;
                while (counter--) {
                    if (links[counter].method == 'REDIRECT') {
                        // redirect to paypal where user approves the transaction 
                        return res.redirect(links[counter].href)
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/err');
            });


    });



    // success page 
    app.get('/success', (req, res) => {
        var paymentId = req.query.paymentId;
        var payerId = {
            'payer_id': req.query.PayerID
        };
        console.log(req.query);
        paypal.payment.execute(paymentId, payerId, function (error, payment) {
            if (error) {
                console.error(error);
            } else {
                if (payment.state === 'approved') {
                    
                    res.redirect('/signup');
                    console.log('payment has been made',payment);
                } else {
                    res.send('payment not successful');
                }
            }
        });
    });






    // error page 
    app.get('/err', (req, res) => {
        console.log(req.query);
        res.send("<h1>payment did not go through</h1>");
    })

    // helper functions 
    const createPay = (payment) => {
        return new Promise((resolve, reject) => {
            paypal.payment.create(payment, function (err, payment) {
                if (err) {
                    reject(err);
                } else {
                    resolve(payment);
                }
            });
        });
    }

}