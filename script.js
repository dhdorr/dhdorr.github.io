const links = document.querySelectorAll(".clickable");

var contentState = "About Me";

var cardGridHTML = '<div class="card-grid"> <div class="project-card"> <div class="card-info"> <h2 class="card-title">A* Pathfinder</h2> <p class="card-body">Try out an interactive A* pathfinding algorithm!</p> </div> </div> <div class="project-card"> <div class="card-info"> <h2 class="card-title">Itch.io Games</h2> <p class="card-body">Check out and play some of my game jam submissions!</p> </div> </div> <div class="project-card"> <div class="card-info"> <h2 class="card-title">Github Repos</h2> <p class="card-body">See what I\x27m working on now, and browse my repositories!</p> </div> </div> <div class="project-card"> <div class="card-info"> <h2 class="card-title">Card 1</h2> <p class="card-body"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, reiciendis. </p> </div> </div> </div>';
var aboutMeHTML = '<p class="about-me-content" id="about-me"> <span style="font-weight: 600; font-size: 36px">Hello! </span>My name is Derek Dorr and I am an aspiring Software Developer. I graduated from California State University Fullerton with a B.S. in Computer Science with an emphasis on Software Engineering. My passion is building beautiful software and designing unique, unforgettable user experiences that make each application, game, and web-site stand out. </p> <div class="about-interests"> <h3>Career Interests</h3> <div class="interest-list"> <h2 class="item">Apps</h2> <h2 class="item">Games</h2> <h2 class="item">Web</h2> </div> </div>';
var resumeHTML = '<embed src="./images/DD_BestResume_2022.pdf#toolbar=0" type="application/pdf" width="100%" height="95%"/>'
var contactHTML = '<div></div>';
var welcomeHTML = '<div class="welcome-page"><h1 style="font-weight: 500">Creative at heart</h1><h1 style="font-weight: 500">Driven to build great experiences</h1></div>';

const temp = document.createElement('div');
var currentPage = "about";

// New Code Here
links.forEach((e) => {
    e.addEventListener("click", el => {
        const test = document.getElementById("parent").firstElementChild;
        console.log(test.className)
        if(e.id == "home" || e.id == "about" || e.id == "projects" || e.id == "resume"){
            test.style.opacity = "0";
            currentPage = e.id;
        }
        else{
            console.log("broke");
        }

        var element = document.getElementById("title");
        if(e.id == "home"){
            document.getElementById("parent").innerHTML = welcomeHTML;
            element.innerText = "";
        }
        else if(e.id == "about"){
            document.getElementById("parent").innerHTML = aboutMeHTML;
            element.innerText = "About Me";
        }
        else if (e.id == "projects"){
            document.getElementById("parent").innerHTML = cardGridHTML;
            element.innerText = "My Projects";
        }
        else if (e.id == "resume"){
            document.getElementById("parent").innerHTML = resumeHTML;
            element.innerText = "My Resume";
        }
    })
});





// links.forEach((e) => {
//     e.addEventListener("click", el => {
//         if (e.innerText != contentState) {
//             tl.to(".about-info", {opacity:"0", duration:".3"});
//             // document.getElementById("contentView").removeChild(document.getElementById("contentView").lastElementChild);
//             // document.getElementById("contentView").removeChild();
//             // var node = document.createElement('div');
//             if (e.innerText == "My Projects"){
//                 node.className = "cards-grid";
//                 node.innerHTML = cardGridHTML;
//             }
//             else if (e.innerText == "About Me"){
//                 node.className = "about-info";
//                 node.innerHTML = aboutMeHTML;
//             }
//             else if (e.innerText == "My Resume"){
//                 node.className = "about-info";
//                 node.innerHTML = resumeHTML;
//             }
//             else if (e.innerText == "Contact Me!"){
//                 node.className = "about-info";
//                 node.innerHTML = aboutMeHTML;
//             }
           
//             document.getElementById("contentView").append(node);
//             contentState = e.innerText;
//             console.log(contentState);
//         }
       
//         var element = document.getElementById("title");
//         element.innerText = e.innerText;
       
       
//     })
// });
