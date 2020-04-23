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
        // adding onClick event to dots
        // the +i+ is OUTSIDE the quotation marks, the + are used to concatenate a string for final value
        // e.g 
        // dot.setAttribute("class", "newDotClass");
        // dot.setAttribute("onClick",  "moveSlides("  + i +  ")"  ) ;
        // its 3 parts
        // part 1: "moveSlides("
        // part 2: i
        // part 3: ")"
        // dot.setAttribute("onClick", "moveSlides(" + i + ")");
        
        // appending the .dots to the #dots-container element
        dotsContainer.append(dot);
        // pushing the .dots span elements into the dots array
        dots.push(dot);
      
    }

    // adds the class .active to the currently shown slide number to colour it dark grey
    dots[slidesIndex].classList.add("active");
 

}
initCarousel()

// adding click event listener to the dots elements
dots.map( (dotEle, index) => dotEle.addEventListener("click", () => moveSlides(index) ) )

// next and previous button control
function plusSlides(n) {
    moveSlides(slidesIndex + n);
}

// event listeners for next and previous buttons
let nextButton = document.querySelector(".next-button");
nextButton.addEventListener("click", () => plusSlides(1) );

let previousButton = document.querySelector(".previous-button");
previousButton.addEventListener("click", () => plusSlides(-1) );

// function for handling arrow key presses to navigate carousel
function arrowKeyNavigation(e) {
    if(e.key === "ArrowRight") plusSlides(1);
    if(e.key === "ArrowLeft") plusSlides(-1);
}

// event listener for left and right arrow keys are pressed
document.addEventListener("keydown", arrowKeyNavigation)

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
