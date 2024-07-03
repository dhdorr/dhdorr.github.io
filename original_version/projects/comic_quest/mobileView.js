const menu = document.getElementById("mobile_menu");
const burger = document.getElementById("toggle_burger");
const clickOffBox = document.getElementById("click_off");
const menuBtn = document.getElementById("menu_btn");

var animToggle = false;

//  Toggle animation bool
function toggleAnimation() {
    animToggle = !animToggle
}

function menuRise() {
    menu.style.animation = "mobileMenuRise 0.25s ease-out forwards";
    burger.textContent = "P";
    clickOffBox.style.visibility = "hidden";
    clickOffBox.style.zIndex = -99;
}

function menuDrop() {
    menu.style.animation = "mobileMenuDrop 0.25s ease-out forwards";
    burger.textContent = "Q";
    clickOffBox.style.visibility = "visible";
    clickOffBox.style.zIndex = 15;
}

//  When Menu button clicked, go down
//  If Menu is already down, go up
menuBtn.onclick = function dropMenu() {
    if (!animToggle){
        menuDrop();
    }
    else {
        menuRise();
    }
}

//  When Animation ends, toggle animation bool
menu.onanimationend = () => {
    toggleAnimation();
};

//  If User clicks outside of the Menu, close Menu
clickOffBox.onclick = function clickOutMenu() {
    if (animToggle){
        menuRise();
    }
}

