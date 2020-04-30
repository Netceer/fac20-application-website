let slidesIndex, slides, dots, captionText

function initCarousel() {
    
    // setting the slideIndex to the first image out of the 5, first element in array is index 0
    slidesIndex = 0;

    // setting our image and caption class containers to slides variable
    slides = document.getElementsByClassName("image-and-caption");

    // changing the opacity of each image and caption opacity from 0 to 1
    slides[slidesIndex].style.opacity = 1;

    captionText = document.querySelector(".caption-container .caption-text");

    // sets correct default caption text according to current slide
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
document.addEventListener("keyup", arrowKeyNavigation)

function moveSlides(n) {

    let i, currentSlide, nextSlide;

    // going to change slides with css rather than javascript for scroll effect, creating an object
    let moveSlideAnimationClass = {
        forCurrentSlide: "",
        forNextSlide: ""
    }

    let slideCaptionAnimationClass;

    // user has clicked on the next navigation button, setting object values to correct .class
    if(n > slidesIndex) {
        // if n is larger than slides length then user has reached end of carousel so need to loop back around
        if(n >= slides.length) {n = 0}

        moveSlideAnimationClass.forCurrentSlide="move-current-slide-left";
        moveSlideAnimationClass.forNextSlide="move-next-slide-left";

        // slide text in from top when moving to the right
        slideCaptionAnimationClass = "slide-caption-from-top";

     } // user clicked on previous navigation button
    else if (n < slidesIndex){

        // this will loop back over to the last slide
        if(n < 0) {n = slides.length-1}

        moveSlideAnimationClass.forCurrentSlide="move-current-slide-right";
        moveSlideAnimationClass.forNextSlide="move-next-slide-right";
        slideCaptionAnimationClass = "slide-caption-from-bottom";
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

    // Changing caption text along with image 
    captionText.style.display = "none";
    captionText.className = "caption-text " + slideCaptionAnimationClass;
    captionText.innerText = slides[n].querySelector(".caption-text").innerText;
    captionText.style.display = "block";

}
// Creating auto play image carousel
let timer = 0;

// function for executing plusSlides function every 3s to start on page load
function setTimer() {
    timer = setInterval( () => plusSlides(1), 3000)
}
setTimer();

// Function for the play pause button itself
function playPauseCarousel() {
    let playPauseButtonIcon = document.querySelector("#play-pause-button i")
    if(timer == 0){
        setTimer();
        playPauseButtonIcon.className = ("fas fa-pause");
    }else{
        clearInterval(timer);
        timer = 0;
        playPauseButtonIcon.className = ("fas fa-play");
    }
}

// Adding event listener to the play and pause button
let playPauseButton = document.getElementById("play-pause-button")
playPauseButton.addEventListener("click", playPauseCarousel);

// Flame test 
const elements = document.querySelectorAll(".element");


let draggedItem = null;

// iterate through all elements 
for (let i = 0; i < elements.length; i++) {
    const element = elements[i];
    // add event listener for drag start
    element.addEventListener("dragstart", function (){
        console.log("drag start");
        draggedItem = element;
        // setTimeout( () => draggedItem.style.display = "none", 0);
    
    })

    // add event listener for drag end
    element.addEventListener("dragend", function (){
        console.log("drag end");

        setTimeout( () => {
            draggedItem.style.display = "block";
            draggedItem = null;
        }, 0);
        
    })

   
    
}
const dragArea = document.querySelector(".dragAreas");



    // need event listeners to prevent default for dragover and dragenter

    dragArea.addEventListener("dragover", (e) => e.preventDefault());
    dragArea.addEventListener("dragenter", (e) => e.preventDefault());
    
    // event listener for drop
    dragArea.addEventListener("drop", function(e){
        console.log("drop");
        this.append(draggedItem);
        test();
        checkElement();
    })
let testNode = null;
    function test(){
    testNode = dragArea.querySelectorAll(".element")
    if(testNode.length > 1 ) {
        console.log("working");
        testNode[0].remove()
    
    }
}

let flameTest = document.getElementById("flame-test");
let stuff1 = document.getElementById("elements-list").cloneNode(true)
let stuff3 = document.getElementById("bunsen-burner-container");


function checkElement(){
    testNode = dragArea.querySelectorAll(".element")
    if(testNode[0].className == "element copper") {
        document.documentElement.style
    .setProperty('--main-colour', 'pink');
    }

    if(testNode[0].className == "element sodium") {
        console.log("reset")
        stuff1.remove();
        stuff2.remove();
        flameTest.append(stuff1);
        flameTest.append(stuff2);
    }

}

