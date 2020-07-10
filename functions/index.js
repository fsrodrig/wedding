const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

admin.initializeApp();
const db = admin.firestore();

const EMAIL = functions.config().auth.user;
const PASSWORD = functions.config().auth.pass;

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

    console.log('guest :>> ', guest);

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
            songs: guest.songs,
            comments: guest.comments
        }
    };

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