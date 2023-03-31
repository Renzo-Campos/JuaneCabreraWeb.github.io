const toggleBtn = document.querySelector(".toggle_btn")
const toggleBtnIcon = document.querySelector(".toggle_btn i")
const dropDownMenu = document.querySelector(".dropdown_menu")

toggleBtn.onclick = () => {
  dropDownMenu.classList.toggle("open")
};

const reelContainer = document.getElementById("reels_container");
const reelSlider = document.getElementById("reel_slider");
const buttonLeft = document.getElementById("button-left");
const buttonRight = document.getElementById("button-right");

const reelElements = document.querySelectorAll(".reel_element");

const rootStyles = document.documentElement.style;

let slideCounter = 0;
let isInTransition = false;

const DIRECTION = {
  RIGHT : "RIGHT",
  LEFT : "LEFT"
};

const getTransformValue = () => 
  Number(rootStyles.getPropertyValue("--slide-transform").replace("px", ""));

const reorderSlide = () => {
  const transformValue = getTransformValue();
  rootStyles.setProperty("--transition", "none");
  if (slideCounter === reelElements.length - 1){
    reelSlider.appendChild(reelSlider.firstElementChild);
    rootStyles.setProperty("--slide-transform", `${transformValue + reelElements[slideCounter].scrollWidth}px`);
    slideCounter --;
  } else if (slideCounter === 0){
    reelSlider.prepend(reelSlider.lastElementChild);
    rootStyles.setProperty("--slide-transform", `${transformValue - reelElements[slideCounter].scrollWidth}px`);
    slideCounter ++;
  }

  isInTransition = false;
}

const moveSlide = (direction) => {
  if(isInTransition) return
  const transformValue = getTransformValue();
  rootStyles.setProperty("--transition", "transform 1s");
  isInTransition = true;
  if (direction === DIRECTION.RIGHT){
    rootStyles.setProperty("--slide-transform", `${transformValue - reelElements[slideCounter].scrollWidth}px`);
    slideCounter ++;
  } else if (direction === DIRECTION.LEFT){
    rootStyles.setProperty("--slide-transform", `${transformValue + reelElements[slideCounter].scrollWidth}px`);
    slideCounter --;
  }
};

buttonRight.addEventListener("click", () => moveSlide(DIRECTION.RIGHT));
buttonLeft.addEventListener("click", () => moveSlide(DIRECTION.LEFT));

reelSlider.addEventListener("transitionend", reorderSlide);

reorderSlide();
