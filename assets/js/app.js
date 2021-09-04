// HEART ANIMATION
let bg = document.querySelector("#bg");
window.addEventListener("scroll", function () {
  let value = window.scrollY;
  bg.style.backgroundSize = 3 * value + "px";
});

// JQuery Functions
!(function (a) {
  a(window).bind("scroll", function () {
    if (a(window).scrollTop() > 30) {
      a(".down").hide();
    } else {
      a(".down").show();
    }
  });

  // COUNTDOWN
  a(".countdown")
    .countdown("2021/12/17 17:00:00")
    .on("update.countdown", function (s) {
      a(this).html(
        s.strftime(
          '<div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1 ">%D</span> <span class="label">Día%!D</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1">%H</span> <span class="label">Hora%!H</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1">%M</span> <span class="label">Minuto%!M</span></div></div> <div class="col"><div class="card card-body countdown-shadow p-3"><span class="counter mb-1">%S</span> <span class="label">Segundo%!S</span></div></div>'
        )
      );
    });

  // ADD SONGS
  const maxSongs = 4;
  let cantSongs = 0;
  a("#addSong").click(function (e) {
    e.preventDefault();
    if (cantSongs < maxSongs) {
      if (cantSongs === 3) {
        a("#addSong").attr("disabled", true);
      }

      a("#songs")
        .append(`<div id="added-${cantSongs}" class="row song" style="display: none;">
        <div class="col-md-6">
           <div class="form-group">
              <label>Artista</label>
              <input name="artist-${cantSongs}" type="text" class="form-control form-control-md" placeholder="Artista">
           </div>
        </div>
        <div class="col-md-6">
           <div class="form-group">
              <label>Canción</label>
              <input name="song-${cantSongs}" type="text" class="form-control form-control-md"
                 placeholder="Canción">
           </div>
        </div>
     </div>`);
      a(`#added-${cantSongs}`).slideDown("slow");
      cantSongs++;
    }
  });
})(jQuery);
