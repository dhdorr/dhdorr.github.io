const links = document.querySelectorAll(".clickable");
const emailbtn = document.querySelector(".email");

const link2 = document.querySelectorAll(".slider");
link2.forEach((e) => {
    e.style.right = "0%";
    e.style.opacity = "1";
});

const element = document.getElementById("title");

var contentState = "About Me";

var cardGridHTML = '<div class="card-grid"> <div class="project-card" style="--cindex: 0"> <div class="card-info"> <h2 class="card-title">A* Pathfinder</h2> <p class="card-body">Try out an interactive A* pathfinding program!</p> </div> </div> <div class="project-card-b" style="--cindex: 1"> <div class="card-info"> <h2 class="card-title">Published Games</h2> <p class="card-body">Check out and play some of my game jam submissions!</p> </div> </div> <div class="project-card-c" style="--cindex: 2"> <div class="card-info"> <h2 class="card-title">Github Repos</h2> <p class="card-body">See what I\x27m working on now, and browse my repositories!</p> </div> </div> <div class="project-card-d" style="--cindex: 3"> <div class="card-info"> <h2 class="card-title">More to Come</h2> <p class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, reiciendis. </p> </div> </div> </div>';
var aboutMeHTML = '<p class="about-me-content" id="about-me"> <span style="font-weight: 600; font-size: 30px">Hello! </span>My name is Derek Dorr and I am an aspiring Software Developer. I graduated from California State University Fullerton with a B.S. in Computer Science with an emphasis on Software Engineering. My passion is building beautiful software and designing unique, unforgettable user experiences that make each application, game, and web-site stand out! </p> <div class="about-interests"> <h3>Career Interests</h3> <div class="interest-list"> <h2 class="item" style="--bindex: 0">Apps</h2> <h2 class="item" style="--bindex: 1">Games</h2> <h2 class="item" style="--bindex: 2">Web</h2> </div> </div>';
var resumeHTML = '<embed src="./images/DD_BestResume_2022.pdf#toolbar=0" type="application/pdf" width="100%" height="95%"/>'
var contactHTML = '<div class="contact-page"><div class="linkedin"><a class="contact-btn linkedin" href="https://www.linkedin.com/in/derek-dorr-7a0930167/" target="_blank"><i class="fab fa-linkedin-in fa-2x"></i></a><div class="li-dropdown">Connect with me!</div></div><div class="email"><div class="contact-btn email"><i class="far fa-envelope fa-2x"></i></div><div class="em-dropdown">Send me a message!</div></div></div>';
var welcomeHTML = '<div class="welcome-page"><h1 class="topper" style="font-weight: 500">Creative at heart</h1><h1 class="botter" style="font-weight: 500">Driven to build great experiences</h1></div>';

const temp = document.createElement('div');
var currentPage = "about";

// New Code Here
links.forEach((e) => {
    e.addEventListener("click", el => {
        links.forEach((el) => {
            el.style.background = "";
            if(el.id == "contact"){
                el.style.color = "white";
            }
        });
        e.style.background = "rgba(115, 181, 211, 0.15)";
        e.style.color = "rgba(39, 71, 112, 0.8)";
        const test = document.getElementById("parent").firstElementChild;
        console.log(test.className)
        if(e.id == "home" || e.id == "about" || e.id == "projects" || e.id == "resume" || e.id == "contact"){
            test.style.opacity = "0";
            currentPage = e.id;
        }
        else{
            console.log("broke");
        }

        if(e.id == "home"){
            document.getElementById("parent").innerHTML = welcomeHTML;
            element.innerText = "";
            element.style.animation = "";
            // element.opacity = 0;
        }
        else if(e.id == "about"){
            document.getElementById("parent").innerHTML = aboutMeHTML;
            element.innerText = "About Me";
            element.style.animation = "fadein2 1s";
            // element.opacity = 0;
        }
        else if (e.id == "projects"){
            document.getElementById("parent").innerHTML = cardGridHTML;
            element.innerText = "My Projects";
            element.style.animation = "fadein2 1s";
            // element.opacity = 0;
        }
        else if (e.id == "resume"){
            document.getElementById("parent").innerHTML = resumeHTML;
            element.innerText = "My Resume";
            element.style.animation = "fadein2 1s";
            // element.opacity = 0;
        }
        else if (e.id == "contact"){
            document.getElementById("parent").innerHTML = contactHTML;
            element.innerText = "Contact Me";
            element.style.animation = "fadein2 1s";
            // element.opacity = 0;
        }
        
    })
});

element.addEventListener('animationend', () => {
    console.log("we ended");
    element.style.animation = "";
});


