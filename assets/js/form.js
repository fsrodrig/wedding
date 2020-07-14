const db = firebase.firestore();
const confirmationForm = document.querySelector('#confirmation-form');
const confirmationButton = document.getElementById("confirm-btn");

const notificationForm = document.getElementById("notification-form");
const notificationButton = document.getElementById("notification-btn");

// Firebase Auth
firebase.auth().signInAnonymously().catch(function (error) {
    console.log('error :>> ', `(${error.code}): ${error.message}`);
});

// Save guest confirmation

confirmationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    confirmationButton.disabled = true;

    const songElements = document.querySelectorAll('.song');
    let songs = [];
    for (let i = 0; i < songElements.length; i++) {
        const artist = confirmationForm[`artist-${i}`].value;
        const song = confirmationForm[`song-${i}`].value;

        if (!!artist && !!song) {
            songs.push({
                artist,
                song
            });
        }
    }

    const veggie = isNaN(confirmationForm.veggie.value) ? 0 : confirmationForm.veggie.value;
    const celiaco = isNaN(confirmationForm.celiaco.value) ? 0 : confirmationForm.celiaco.value;

    db.collection('guests').add({
            name: confirmationForm.name.value,
            lastname: confirmationForm.lastname.value,
            adults: confirmationForm.adt.value,
            children: confirmationForm.chd.value,
            veggie,
            celiaco,
            songs,
            comments: confirmationForm.comments.value ? confirmationForm.comments.value : 'Sin comentarios'
        })
        .then(function () {
            let text = "Los esperamos"
            if (confirmationForm.adt.value == 1 && confirmationForm.chd.value == 0) {
                text = "Te esperamos"
            }
            swal("Muchas gracias!", text, "success");
            confirmationButton.style.backgroundColor = "#28a745"
            confirmationButton.style.borderColor = "#28a745"
            confirmationButton.textContent = "Gracias por confirmar!"
            confirmationForm.reset();
        })
        .catch(function (error) {
            swal("Lo sentimos", "Hubo un error al intentar enviar tu confirmación", "error");
            confirmationButton.disabled = false;
            console.error("Error adding document: ", error);
        });
});

// Notification Form

notificationForm.addEventListener('submit', function (e) {
    e.preventDefault();
    notificationButton.disabled = true;

    db.collection('gifts').add({
        name: notificationForm.name.value,
        email: notificationForm.email.value,
        comments: notificationForm.comments.value
    })
    .then(function () {
        swal("Muchas gracias!", "" , "success");
        notificationButton.style.backgroundColor = "#28a745"
        notificationButton.style.borderColor = "#28a745"
        const icon = document.querySelector('#notification-btn .fa-paper-plane');
        icon.parentNode.removeChild(icon);
        notificationButton.textContent = "Gracias!"
        notificationForm.reset();
    })
    .catch(function (error) {
        swal("Lo sentimos", "Hubo un error al intentar enviar tu mensaje", "error");
        notificationButton.disabled = false;
        console.error("Error adding document: ", error);
    });
});