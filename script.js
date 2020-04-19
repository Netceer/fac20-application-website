let slidesIndex, slides, dots, captionText

function initCarousel() {
    
    // setting the slideIndex to the first image out of the 5, first element in array is index 0
    slidesIndex = 0;

    // setting our image and caption class containers to slides variable
    slides = document.getElementsByClassName("image-and-caption");

    // changing the opacity of each image and caption opacity from 0 to 1
    // slides[slidesIndex].style.opacity = 1;
    // trying using display: hidden to display: block instead of opacity
    slides[slidesIndex].style.display = "block";

    captionText = document.querySelector(".caption-container .caption-text");
    captionText.innerText = slides[slidesIndex].querySelector(".caption-text").innerText;
}
initCarousel()