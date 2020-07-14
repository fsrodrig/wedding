const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

admin.initializeApp();
const db = admin.firestore();

const EMAIL = functions.config().nodemailer.email;
const PASSWORD = functions.config().nodemailer.password;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});


// Emails the client when a new guest confirms
exports.newGuest = functions.firestore.document('guests/{guestId}').onCreate(async (change, context) => {

    // Read the guest document
    const guestSnap = await db.collection('guests').doc(context.params.guestId).get();

    // Raw Data
    const guest = guestSnap.data();

    // Fields required validation
    const isValid = guest.name && guest.lastname && guest.comments &&
        guest.adults !== null && guest.children !== null;

    if (!isValid) {
        return {
            message: 'Invitado no válido'
        }
    }

    // Template
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.hbs',
            partialsDir: 'templates',
            layoutsDir: 'templates',
            defaultLayout: 'confirmation.hbs',
        },
        viewPath: 'templates',
        extName: '.hbs'
    }));

    const songs = (guest.songs && guest.songs.length > 0) ? guest.songs : undefined;

    // Email
    const mailOptions = {
        from: EMAIL,
        to: 'fs.rodriguez91@gmail.com, alfonzodenise@gmail.com',
        subject: `Fede & Denu - ${guest.name} ${guest.lastname} x${guest.adults}`,
        template: 'confirmation',
        context: {
            name: guest.name,
            lastname: guest.lastname,
            adults: guest.adults,
            children: guest.children,
            veggie: guest.veggie ? guest.veggie : 0,
            celiaco: guest.celiaco ? guest.celiaco : 0,
            songs,
            comments: guest.comments
        }
    };

    console.log('mailOptions :>> ', mailOptions);

    // Send it
    return transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return err.message;
        }

        return {
            message: `Mensaje enviado a ${mailOptions.to}`
        };
    });

});

exports.notification = functions.firestore.document('gifts/{giftId}').onCreate(async (change, context) => {
    
    // Read the gift document
    const giftSnap = await db.collection('gifts').doc(context.params.giftId).get();

    // Raw Data
    const gift = giftSnap.data();

    // Fields required validation
    const isValid = gift.name && gift.email;

    if (!isValid) {
        return {
            message: 'Notificación no válida'
        }
    }

    // Template
    transporter.use('compile', hbs({
        viewEngine: {
            extName: '.hbs',
            partialsDir: 'templates',
            layoutsDir: 'templates',
            defaultLayout: 'notification.hbs',
        },
        viewPath: 'templates',
        extName: '.hbs'
    }));

    // Email
    const mailOptions = {
        from: EMAIL,
        to: 'fs.rodriguez91@gmail.com, alfonzodenise@gmail.com',
        subject: `Fede & Denu - Recibieron un Regalo`,
        template: 'notification',
        context: {
            name: gift.name,
            email: gift.email,
            comments: gift.comments
        }
    };

    console.log('mailOptions :>> ', mailOptions);

    // Send it
    return transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return err.message;
        }

        return {
            message: `Mensaje enviado a ${mailOptions.to}`
        };
    });
});