module.exports = {

    sendHello: function(options) {

        var transporter = sails.Nodemailer.createTransport();
            transporter.sendMail({
                from: 'info@symantis.org',
                to: options.user.email,
                envelope: {
                    from: 'Symantis <info@symantis.org>',
                    to: options.user.firstName+' <'+options.user.email+'>'
                },
                subject: 'Hi '+ options.user.firstName +' you logged in!',
                text: 'Hi '+ options.user.firstName +', \n You just logged in for the first time! We thought we\'d email you about it and say welcome!'
            });
    },

    sendPasswordRecovery: function(options) {
        var message = 'Hi, '+ options.user.firstName +'\n Seems you forgot your Password. Here\'s your new one until you change it: '
        
        var transporter = sails.Nodemailer.createTransport();
            transporter.sendMail({
                from: 'info@symantis.org',
                to: options.user.email,
                envelope: {
                    from: 'Symantis <info@symantis.org>',
                    to: options.user.firstName+' <'+options.user.email+'>'
                },
                subject: 'Password Recovery',
                text: message
            });
    }
};