(function () {
    'use strict';
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
    var express = require('express'),
        nodemailer = require('nodemailer'),
        app = express();

    var smtpConfig = {
        host: 'mail.avatech.cz',
        port: 465,
        secure: true,
        auth: {
            user: 'info@gsgastro.cz',
            pass: 'pJcnK>VyhP9f238uEE'
        }
    };

    var transporter = nodemailer.createTransport(smtpConfig);

    app.use(require('body-parser').urlencoded({
        extended: true
    }));
    app.use(express.static('../../gs-gastro'));

    app.post('/send', function (req, res) {
        res.writeHead(200);
        res.end();

        var name = req.body.name,
            email = req.body.email,
            tel = req.body.tel,
            msg = req.body.msg;

        var mailOptions = {
            from: 'app@gsgastro.cz',
            to: 'info@gsgastro.cz',
            subject: 'Hello ✔',
            html: '<h4>Jmeno: </h4><span>' + name + '</span></br><h4>E-mail: </h4><span>' + email + '</span></br><h4>Telefon: </h4><span>' + tel + '</span></br><h4>Zprava: </h4><span>' + msg + '</span></br>'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });

        console.log(req.body);
    });

    app.listen(3000, '127.0.0.1');
    console.log('Server started on port 3000.');
}());
