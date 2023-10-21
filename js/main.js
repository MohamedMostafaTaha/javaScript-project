// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);

  // remove active class from all colors list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    //   add active class on element with data color === local storage item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

// random background option
let backgroundOption = true;

// variable to control the background interval
let backgroundInterval;

// check if there's local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");

// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  //   remove  active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((el) => {
    el.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// toggle spin class on icon
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  //   toggle class fa-spin for rotation on self
  this.classList.toggle("fa-spin");

  //   toggle class open on main settings box
  document.querySelector(".settings-box").classList.toggle("open");
};

// switch colors
const colorsLi = document.querySelectorAll(".colors-list li");

// loop on all list items
colorsLi.forEach((li) => {
  // click on every list items
  li.addEventListener("click", (e) => {
    // set color on root (:root => in css)
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// switch random background option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// loop on all spans
randomBackEl.forEach((span) => {
  // click on every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();

      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// select landing page element
let landingPage = document.querySelector(".landing-page");

// get array of images
let imgsArray = [
  "photo number 1.jpg",
  "photo number 2.jpeg",
  "photo number 3.jpg",
  "photo number 4.jpg",
  "photo number 5.jpeg",
];

// function to randomize imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // change background image url
      landingPage.style.backgroundImage = `url("imgs/${imgsArray[randomNumber]}")`;
    }, 10000);
  }
}

// select skills selector
let ourSkills = document.querySelector(".skills");
let spansScroll = document.querySelectorAll(".skills .skill-progress span");

window.onscroll = function () {
  // skills offset top
  // this give me the distance between the top of the page till the edge of the element (ourSkills) that equall 971
  let skillsOffsetTop = ourSkills.offsetTop;

  // skills outer height
  // this give me the height of the element(ourSkills) including the border and padding but excluding the margin, that equall 635
  let skillsOuterHeight = ourSkills.offsetHeight;

  // window height
  // this give me the viewport-height(100vh) of the page and differ between different size of devices and you cand resize it, that equall 651
  let windowHeight = this.innerHeight;

  // window scrollTop
  // this give me the position you are on the page now , 0 => 1 => 2 => 3 .... till reach the point you on
  let windowScrollTop = this.scrollY;

  // if we down on the page and the number become bigger than (the sum of the height of the element and the height above the element,
  // which equall 971 + 635 = 1606) minus - the vh the page have ,and which equall (1606 - 651) to give me 955
  // at this point action what i need you to do (make progress to the skills)
  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// create popup with the image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create overlay element
    let overlay = document.createElement("div");
    // add class to overlay
    overlay.className = "popup-overlay";
    // append overlay to body
    document.body.appendChild(overlay);

    // create the popup
    let popupBox = document.createElement("div");
    // add class popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // create heading
      let imgHeading = document.createElement("h3");
      // create text for heading
      let imgText = document.createTextNode(img.alt);

      // append the text to the heading
      imgHeading.appendChild(imgText);

      // append the heading to the popup box
      popupBox.appendChild(imgHeading);
    }

    // create the image
    let popupImage = document.createElement("img");
    // set image source
    popupImage.src = img.src;

    // add image to popup box
    popupBox.appendChild(popupImage);
    // append the popup box to body
    document.body.appendChild(popupBox);

    // create the close span
    let closeButton = document.createElement("span");
    // create the close button text
    let closeButtonText = document.createTextNode("X");
    // append text to close button
    closeButton.appendChild(closeButtonText);
    // add class to close button
    closeButton.className = "close-button";
    // add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});

// close popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // remove the current popup
    e.target.parentNode.remove();

    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// make adding the bullets dynamic
let allSections = document.querySelectorAll(".sections .section");
let navBullets = document.createElement("div");
navBullets.className = "nav-bullets";
allSections.forEach((section) => {
  let navBullet = document.createElement("div");
  navBullet.className = "bullet";
  navBullet.setAttribute("data-section", `.${section.className.split(" ")[1]}`);
  let navBulletTooltip = document.createElement("div");
  navBulletTooltip.className = "tooltip";
  navBulletTooltip.innerHTML = section.className.split(" ")[1].split("-")[0];
  navBulletTooltip.style.textTransform = "capitalize";
  navBullet.appendChild(navBulletTooltip);
  navBullets.appendChild(navBullet);

  // make adding the nav links dynamic
  let links = document.querySelector(".links");
  let link = document.createElement("li");
  let linkA = document.createElement("a");
  linkA.setAttribute("data-section", `.${section.className.split(" ")[1]}`);
  linkA.href = "#";
  linkA.innerHTML = section.className.split(" ")[1].split("-")[0];
  linkA.style.textTransform = "capitalize";
  link.appendChild(linkA);
  links.appendChild(link);
});
document.body.appendChild(navBullets);

// select all Links and Bullets
const allLinks = document.querySelectorAll(".links a");
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// (element i wanted to go to him).scrollIntoView({behavior: 'smooth',})
// this excellent way to go to any area you wanted in the page by pure js
// it is a Web Api
function scrollToSomeWhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      // as the clicked element is a tag and the href is #, we need to disabled this process to got to the section
      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);

// handle active state
function handleActive(ev) {
  // remove active class from all childrens
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class on self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });

  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";

      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";

      localStorage.setItem("bullets_option", "none");
    }

    handleActive(e);
  });
});

// reset button
document.querySelector(".reset-options").onclick = function () {
  localStorage.removeItem("bullets_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  window.location.reload();
};

// toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // stop propagation (the spaces between spans in toggle-menu)
  e.stopPropagation();
  // toggle class "menu-active" on Button
  this.classList.toggle("menu-active");
  // toggle class "open" on links
  tLinks.classList.toggle("open");
};

// click anywhere outside menu and toggle button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // check if menu is open
    if (tLinks.classList.contains("open")) {
      // toggle class "menu-active" on Button
      toggleBtn.classList.toggle("menu-active");
      // toggle class "open" on links
      tLinks.classList.toggle("open");
    }
  }
});

// stop propagation on menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
