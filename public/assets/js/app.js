// HEART ANIMATION
let bg = document.querySelector('#bg');
window.addEventListener('scroll', function () {
    let value = window.scrollY;
    bg.style.backgroundSize = 3 * value + 'px';
});

const logo = document.querySelectorAll("#logo>path");
for (let i = 0; i < logo.length; i++) {
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`); 
}

!function(a) {
    a(".countdown").countdown("2021/02/12 17:00:00").on("update.countdown", function(s) {
        a(this).html(s.strftime('<div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1 ">%D</span> <span class="label">Día%!D</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1">%H</span> <span class="label">Hora%!H</span></div></div> <div class="col"><div class="card card-body countdown-shadow mb-4 mb-lg-0 p-3"><span class="counter mb-1">%M</span> <span class="label">Minuto%!M</span></div></div> <div class="col"><div class="card card-body countdown-shadow p-3"><span class="counter mb-1">%S</span> <span class="label">Segundo%!S</span></div></div>'))
    })
}(jQuery);