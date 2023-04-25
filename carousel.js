var track = document.querySelector('.carousel-track');
var slides = Array.from(track.children);
var nextBtn = document.querySelector(".carousel_button.button-right");
var prevBtn = document.querySelector(".carousel_button.button-left");
var navBtns = document.querySelector(".carouselNav");
var dots = Array.from(navBtns.children);
var slideWidth = slides[0].getBoundingClientRect().width;

var setSlidePos = (slide, index) => {
    slide.style.left = slideWidth * index + "px";
};
slides.forEach(setSlidePos);

var moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

var updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}

var hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0) {
        prevBtn.classList.add("is-hidden");
        nextBtn.classList.remove("is-hidden");
    }
    else if(targetIndex === slides.length - 1) {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.add("is-hidden");
    }
    else {
        prevBtn.classList.remove("is-hidden");
        nextBtn.classList.remove("is-hidden");
    }
}

nextBtn.addEventListener("click", e =>  {
    var currentSlide = track.querySelector(".current-slide");
    var nextSlide = currentSlide.nextElementSibling;
    var currentDot = navBtns.querySelector(".current-slide");
    var nextDot = currentDot.nextElementSibling;
    var nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
})

prevBtn.addEventListener("click", e =>  {
    var currentSlide = track.querySelector(".current-slide");
    var prevSlide = currentSlide.previousElementSibling
    var currentDot = navBtns.querySelector(".current-slide");
    var prevDot = currentDot.previousElementSibling;
    var prevIndex = slides.findIndex(slide => slide === prevSlide);
    hideShowArrows(slides, prevBtn, nextBtn, prevIndex);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
})

navBtns.addEventListener("click", e => {
    var targetDot = e.target.closest("button");
    if(!targetDot) return;

    var currentSlide = track.querySelector(".current-slide");
    var currentDot = navBtns.querySelector(".current-slide");
    var targetIndex = dots.findIndex(dot => dot === targetDot);
    var targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
})