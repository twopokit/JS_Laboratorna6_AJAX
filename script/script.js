$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
  
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
});

let woods = document.querySelector("#WoodsPic");
let studio = document.querySelector("#StudioPic");
let home = document.querySelector("#HomePic");

let up_button = document.querySelector(".to-up-button__wrapper");
let header = document.querySelector("#header");
$(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if(scroll >= 700) {
        up_button.classList.add("up-button__alive");
    }
    else {
        up_button.classList.remove("up-button__alive");
    }

    if(scroll >= 1900) {
        $(woods).css({transform: "translateX(0)"}, 100);
        $(studio).css({transform: "translateY(0)"}, 200);
        $(home).css({transform: "translateX(0)"}, 100);
    }
})
