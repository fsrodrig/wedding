"use strict";var bg=document.querySelector("#bg");window.addEventListener("scroll",function(){var n=window.scrollY;bg.style.backgroundSize=3*n+"px"}),function(a){a(window).bind("scroll",function(){30<a(window).scrollTop()?a(".down").hide():a(".down").show()}),a(".countdown").countdown("2021/12/17 17:45:00").on("update.countdown",function(n){a(this).html(n.strftime('<div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1 ">%D</span> <span class="label">Día%!D</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1">%H</span> <span class="label">Hora%!H</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1">%M</span> <span class="label">Minuto%!M</span></div></div> <div class="col"><div class="card card-body countdown-shadow p-3"><span class="counter mb-1">%S</span> <span class="label">Segundo%!S</span></div></div>'))});var s=0;a("#addSong").click(function(n){n.preventDefault(),s<4&&(3===s&&a("#addSong").attr("disabled",!0),a("#songs").append('<div id="added-'.concat(s,'" class="row song" style="display: none;">\n        <div class="col-md-6">\n           <div class="form-group">\n              <label>Artista</label>\n              <input name="artist-').concat(s,'" type="text" class="form-control form-control-md" placeholder="Artista">\n           </div>\n        </div>\n        <div class="col-md-6">\n           <div class="form-group">\n              <label>Canción</label>\n              <input name="song-').concat(s,'" type="text" class="form-control form-control-md"\n                 placeholder="Canción">\n           </div>\n        </div>\n     </div>')),a("#added-".concat(s)).slideDown("slow"),s++)})}(jQuery);