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

     } // user clicked on previous navigation button, setting all correct aniimation classes ready to apply
    else if (n < slidesIndex){

        // this will loop back over to the last slide
        if(n < 0) {n = slides.length-1}

        moveSlideAnimationClass.forCurrentSlide="move-current-slide-right";
        moveSlideAnimationClass.forNextSlide="move-next-slide-right";
        slideCaptionAnimationClass = "slide-caption-from-bottom";
    }

    // user selected am image that is different from current one, applies all preset animation classes from previous if statements
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

        // finally sets slidesIndex to n so it now equals ready for next input
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
        // using clone fixes the big problem!!
        draggedItem = element.cloneNode(true);
        // setTimeout( () => draggedItem.style.display = "none", 0);
        element.classList.toggle("after-drag");
        draggedItem.classList.toggle("after-drag")
        draggedItem.style.backgroundColor = 'var(--main-colour)';
    })

    // add event listener for drag end
    element.addEventListener("dragend", function (){
        draggedItem.style.display = "block";
        draggedItem = null;
        element.classList.toggle("after-drag");
    })

   
    
}
const dragArea = document.querySelector(".dragAreas");

    // need event listeners to prevent default for dragover and dragenter
    // add class toggles for class dragenter and dragleave

    dragArea.addEventListener("dragover", (e) => e.preventDefault());
    
    
    dragArea.addEventListener("dragenter", (e) => {
        e.preventDefault();
        dragArea.classList.toggle("drag-hover-above-flame");
    });

    dragArea.addEventListener("dragleave", (e) => {
        dragArea.classList.toggle("drag-hover-above-flame");
    });
    
    // event listener for drop
    dragArea.addEventListener("drop", function(e){
        dragArea.classList.toggle("drag-hover-above-flame");
        // stop user dragging null elements into dragArea
        if(draggedItem == null ) return;
        
        this.append(draggedItem);
        removeExtraElements();
        checkElement();
        draggedItem.classList.add("burn-away");
    })

//    make testNode null and let functions define variable so it only assigns elements dragged into flame
let testNode = null;
 // function to only allow 1 element above flame
    function removeExtraElements(){
    testNode = dragArea.querySelectorAll(".element")
    if(testNode.length > 1 ) {
        testNode[0].remove()
    }
}

// function to change website colours according to the flame test result
let bunsenBurner = document.getElementById("bunsen-burner");
function checkElement(){
    testNode = dragArea.querySelectorAll(".element")
    let rootCSS = document.documentElement.style
    // copper ions burn green
    if(testNode[0].className == "element copper after-drag") {
        rootCSS.setProperty('--bg-colour', '#F1F0F3')
        rootCSS.setProperty('--main-colour', '#00DD6E')
        rootCSS.setProperty('--text-colour', '#242027')
        rootCSS.setProperty('--light-accent', '#78A5A2')
        rootCSS.setProperty('--dark-accent', '#656757')
        // change flame colour image
        bunsenBurner.src = "images/bunsen-burner-copper.svg";
    }
// potassium ions burn lilac
    if(testNode[0].className == "element potassium after-drag") {
        rootCSS.setProperty('--bg-colour', '#f3f3eb')
        rootCSS.setProperty('--main-colour', '#C8A2C8')
        rootCSS.setProperty('--text-colour', '#8f4899')
        rootCSS.setProperty('--light-accent', '#c48c98')
        rootCSS.setProperty('--dark-accent', '#817590')
        bunsenBurner.src = "images/bunsen-burner-potassium.svg";
    }
// lithium ions burn crimson
    if(testNode[0].className == "element lithium after-drag") {
        rootCSS.setProperty('--bg-colour', '#F3EEEF')
        rootCSS.setProperty('--main-colour', '#DC143C')
        rootCSS.setProperty('--text-colour', '#292230')
        rootCSS.setProperty('--light-accent', '#E89980')
        rootCSS.setProperty('--dark-accent', '#86849F')
        bunsenBurner.src = "images/bunsen-burner-lithium.svg";
    }
// sodium ions burn yellow
    if(testNode[0].className == "element sodium after-drag") {
        rootCSS.setProperty('--bg-colour', '#f0f2f0')
        rootCSS.setProperty('--main-colour', '#ffd064')
        rootCSS.setProperty('--text-colour', '#4a3c4e')
        rootCSS.setProperty('--light-accent', '#7ca4b3')
        rootCSS.setProperty('--dark-accent', '#806157')
        bunsenBurner.src = "images/bunsen-burner-sodium.svg";
    }


}

// code for the responsive navbar

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
    // need to turn nodelist into an array to use map
const links = [...document.querySelectorAll(".nav-links li")];

// add event listener to hamburger icon
hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("open");

    // add opacity-one class to each link anchor

    links.map( link => {
        link.classList.toggle("opacity-one");
    })

    // .forEach works on nodelist without any converting
    // links.forEach(link => {
    //     link.classList.toggle("opacity-one")
    // })

})

// add event listener to close hamburger navbar when user clicks link
const linkAnchor = [...document.querySelectorAll(".nav-link")];

// iterate through anchors to close hamburger menu along with correct animations

linkAnchor.map( (anchor) => anchor.addEventListener("click", () => {
    // closes hamburger navbar
    navLinks.classList.remove("open");

    // have to iterate through each link to toggle class just like in hamburger event listerner
    links.map( link => {
            link.classList.toggle("opacity-one");
        });
    })
)
