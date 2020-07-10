const db = firebase.firestore();
const form = document.querySelector('#confirmation-form');
const button = document.getElementById("confirm-btn");

// Save guest confirmation

form.addEventListener('submit', function (e) {
    e.preventDefault();
    button.disabled = true;

    const songElements = document.querySelectorAll('.song');
    let songs = [];
    for (let i = 0; i < songElements.length; i++) {
        const artist = form.artist-[i].value;
        const song = form.song-[i].value;
        
        if (!!artist && !!song) {
            songs.push({
                artist,
                song
            });
        }
    }

    db.collection('guests').add({
        name: form.name.value,
        lastname: form.lastname.value,
        adults: form.adt.value,
        children: form.chd.value,
        veggie: form.veggie.value,
        celiaco: form.celiaco.value,
        songs,
        comments: form.comments.value ? form.comments.value : 'Sin comentarios'
    })
    .then(function() {
        let text = "Los esperamos"
        if (form.adt.value == 1 && form.chd.value == 0) {
            text = "Te esperamos"
        }
        swal("Muchas gracias!", text, "success");
        button.style.backgroundColor="#28a745"
        button.style.borderColor="#28a745"
        button.textContent = "Gracias por confirmar!"
        form.reset();
    })
    .catch(function(error) {
        swal("Lo sentimos", "Hubo un error al intentar enviar tu confirmación", "error");
        button.disabled = false;
        console.error("Error adding document: ", error);
    });
});

