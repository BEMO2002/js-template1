//check if there is local storage color option
let mainColors = localStorage.getItem("color_option");


if(mainColors !== null){
        // console.log("local storage is not empty");
        // console.log(localStorage.getItem("color_option"));
        document.documentElement.style.setProperty("--main-color" ,mainColors);
        //remove active class from all colors list
        document.querySelectorAll(".color-list li").forEach(element =>{
            element.classList.remove("active");
            //add active class on element with data-color === local storage item
            if(element.dataset.color === mainColors){
                //add active class
                element.classList.add("active");
            }
        });
        
}
// random background option 
let backgroundOption = true;

//variable to control the interval
let backgroundInterval;

//if there is local storage random background
let backgroundLocalItem = localStorage.getItem("background_option");

//check if random background local storage is not empty
if(backgroundLocalItem !== null){
    // console.log("local storage is not empty");
    if( backgroundLocalItem === true){
        backgroundOption = true;
    }else{
        backgroundOption= false;
    }
    //remove active class from all spans
    document.querySelectorAll(".random-backgrounds span ").forEach(element =>{
        element.classList.remove("active");

        if(backgroundLocalItem  === "true" ){
            document.querySelector(".random-backgrounds .yes").classList.add("active");
        }else{
            document.querySelector(".random-backgrounds .no").classList.add("active");
        }
    });
}



//toggle icon
document.querySelector(".toggle-setting .fa-gear").onclick = function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");

}

//switch color
const colorLi = document.querySelectorAll(".color-list li");
//loop on list items
colorLi.forEach(li => {
    //click on every list items
    li.addEventListener("click" , (e) =>{
        //set color on root
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color);
        //set color on local storage
        localStorage.setItem("color_option" , e.target.dataset.color);
        handelActive(e);
    });
});


//switch random background
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
//loop on spans
randomBackEl .forEach( span => {
    //click on every span
    span.addEventListener("click" , (e) =>{
        //remove active class from all spans

        handelActive(e);

        if(e.target.dataset.background === "yes"){
            backgroundOption = true;
            randomizeImgs();
            localStorage.setItem("background_option" , true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option" , false);
        }
    });
});



// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];


//function to randomize imgs
function randomizeImgs(){

    if(backgroundOption === true){
        backgroundInterval = setInterval(() => {
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            // Change Background Image Url 
            landingPage.style.backgroundImage = 'url("images/' + imgsArray[randomNumber] + '")';
        }, 3000);
    }
}
randomizeImgs();










// select skills
let ourSkills = document.querySelector(".skills");
window.onscroll = function(){
    //skills offset top
    let skillsOffsetTop = ourSkills.offsetTop;
    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    //window height
    let windowHeight = this.innerHeight;
    //window scroll top
    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop  > (skillsOffsetTop + skillsOuterHeight - windowHeight)){
            let allSkills =document.querySelectorAll(".skill-box .skill-progress span");
            allSkills.forEach(skill =>{
                skill.style.width = skill.dataset.progress;
                
            })
    }
}



//create popup with image
let ourGallery  =document.querySelectorAll(".gallery img");
ourGallery.forEach(img =>{
    img.addEventListener("click" , (e)=>{
        //create overlay element
        let overlay = document.createElement("div");

        //add class to overlay
        overlay.className = "popup-overlay";

        //append overlay to the body
        document.body.appendChild(overlay);

        //create popup
        let popupBox = document.createElement("div");

        //add class to the popup 
        popupBox.className = "popup-box";

        if(img.alt !== null ){
            //create heading
            let imgHeading = document.createElement("h3");
            // create text for heading
            let imgText = document.createTextNode(img.alt);
            //append the text on the heading
            imgHeading.appendChild(imgText);
            //append the heading to the popup
            popupBox.appendChild(imgHeading)
        }
        //create the image
        let popupImage = document.createElement("img");

        //set image source
        popupImage.src = img.src;

        //add image to popup box
        popupBox.appendChild(popupImage);

        //append the popup box to the body
        document.body.appendChild(popupBox);
        // Create The Close Span
        let closeButton = document.createElement("span");

        // Create The Close Button Text
        let closeButtonText = document.createTextNode("X");

        // Append Text To Close Button
        closeButton.appendChild(closeButtonText);

        // Add Class To Close Button
        closeButton.className = 'close-button';

        // Add Close Button To The Popup Box
        popupBox.appendChild(closeButton);
    });
});

// close popup
document.addEventListener("click" , function (e){
        if(e.target.className == "close-button"){
            //remove the current popup
            e.target.parentNode.remove();
            document.querySelector(".popup-overlay").remove();
        }
});



//select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
//select all links
const allLinks = document.querySelectorAll(".links a");
function scrollTOSomeWhere(elements){
    elements.forEach(ele => {
        ele.addEventListener("click" , (e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : "smooth",
            })
        });
    });
}

scrollTOSomeWhere(allBullets);
scrollTOSomeWhere(allLinks);

//handel active class
function handelActive(ev){
        //remove active class from all spans
        ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
            element.classList.remove("active");
        });
        //add active class on self
        ev.target.classList.add("active");
}


let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    } );

    if(bulletLocalItem === "block"){
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
        
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click" , (e) => {
        if(span.dataset.display === "show"){
                bulletsContainer.style.display = 'block';
                localStorage.setItem("bullets_option" ,  "block");
            }else{
                bulletsContainer.style.display = "none";
                localStorage.setItem("bullets_option" ,  "none");
            }
        handelActive(e);
    });
});



document.querySelector(".reset-option").onclick = function(){
    
    Swal.fire({
        title: "Are you sure?",
        text: "You want to reset options!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
        try {
            localStorage.removeItem("color_option");
            localStorage.removeItem("background_option");
            localStorage.removeItem("bullets_option");
              // Reload Window
            window.location.reload();
            Swal.fire('Your options has been Reseted.', '', 'success');
        } catch (error) {
            Swal.fire('حدث خطأ!', 'لم يتمكن من حذف الملف.', 'error');
        }
        }
    });
    //   localStorage.clear();
}




//toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

  // Stop Propagation
    e.stopPropagation();

  // Toggle Class "menu-active" On Button
    this.classList.toggle("menu-active");

    // Toggle Class "open" On Links
    tLinks.classList.toggle("open");

};


//click any where outside menu
document.addEventListener("click" , (e) => {
    if(e.target !==  toggleBtn && e.target !== tLinks ){
        //check the menu is opened
        if(tLinks.classList.contains("open")){
            // Toggle Class "menu-active" On Button
            toggleBtn.classList.toggle("menu-active");

            // Toggle Class "open" On Links
            tLinks.classList.toggle("open");

        }
    }
});

// Stop Propagation on menu
tLinks.onclick  =function(e){
    e.stopPropagation();
}




