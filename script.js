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

    // setting up the navigation dots
    dots = [];
    let dotsContainer = document.getElementById("dots-container");

    // creating the same number of dots as number of image slides
    for(let i = 0; i < slides.length; i++){
        // creating new html span element
        let dot = document.createElement("span");
        // adding the class="dots" to newly created span elements
        dot.classList.add("dots");
        // appending the .dots to the #dots-container element
        dotsContainer.append(dot);
        // pushing the .dots span elements into the dots array
        dots.push(dot);

    }

    // adds the class .active to the currently shown slide number to colour it dark grey
    dots[slidesIndex].classList.add("active")
}
initCarousel().dots:first-child {
    /* margin-left: 0; */
}