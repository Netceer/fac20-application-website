let slidesIndex, slides, dots, captionText

function initCarousel() {
    
    // setting the slideIndex to the first image out of the 5, first element in array is index 0
    slidesIndex = 0;

    // setting our image and caption class containers to slides variable
    slides = document.getElementsByClassName("image-and-caption");

    // changing the opacity of each image and caption opacity from 0 to 1
    slides[slidesIndex].style.opacity = 1;

    // trying using display: hidden to display: block instead of opacity
    // slides[slidesIndex].style.display = "block";

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
    dots[slidesIndex].classList.add("active");
 

}
initCarousel()

// next and previous button control
function plusSlides(n) {
    moveSlides(slidesIndex + n);
}


function moveSlides(n) {

    let i, currentSlide, nextSlide;

    // going to change slides with css rather than javascript for scroll effect, creating an object
    let moveSlideAnimationClass = {
        forCurrentSlide: "",
        forNextSlide: ""
    }

    // user has clicked on the next navigation button, setting object values to correct .class
    if(n > slidesIndex) {
        // if n is larger than slides length then user has reached end of carousel so need to loop back around
        if(n >= slides.length) {n = 0}

        moveSlideAnimationClass.forCurrentSlide="move-current-slide-left";
        moveSlideAnimationClass.forNextSlide="move-next-slide-left";
     } // user clicked on previous navigation button
    else if (n < slidesIndex){
        // this will loop back over to the last slide
        if(n < 0) {n = slides.length-1}

        moveSlideAnimationClass.forCurrentSlide="move-current-slide-right";
        moveSlideAnimationClass.forNextSlide="move-next-slide-right";
    }

    if(n != slidesIndex){
        currentSlide = slides[slidesIndex];
        nextSlide = slides[n]
        
        // for loop to hide images and to remove active dot class
        for(let i = 0; i < slides.length; i++){
            slides[i].className="image-and-caption";
            // slides[i].style.display = "none";
            slides[i].style.opacity = 0;
            dots[i].classList.remove("active");
        }

        // to add the correct animation class to the corresponding slides
        currentSlide.classList.add(moveSlideAnimationClass.forCurrentSlide);
        nextSlide.classList.add(moveSlideAnimationClass.forNextSlide);
        dots[n].classList.add("active");
        slidesIndex = n;
    }

}



