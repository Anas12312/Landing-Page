/* Global Variables */

const sections = document.querySelectorAll('.sector');
let theViewedSection = document.querySelector('.your-active-class');
let theViewedNav = null;
let isScrolling;
const scrollToTopBtn = document.querySelector('#scroll-to-top');
const showMenuButton = document.querySelector('.show-menu');

/* Helper Functions */

// View the to-top button when the user scrolls below the fold of the page and hide it otherwise
function toggleToTopBtn(){
    if (document.body.scrollTop > 700 || document.documentElement.scrollTop > 700) {
        scrollToTopBtn.style.display = "block";
    }else{
        scrollToTopBtn.style.display = "none";
    }
}

// Display the navigation Bar
function viewTheNavigationBar(){
    document.querySelector('.navbar__menu').setAttribute('style','display:block');
}

// Hide the navigation Bar
function hideNavigationBar(){
    document.querySelector('.navbar__menu').setAttribute('style','display:none');
}

// Toggle the navigation Bar
function toggleTheNavigationBar(){
    const state = document.querySelector('.navbar__menu').style.display;
    if(state === 'block'){
        document.querySelector('.navbar__menu').setAttribute('style','display:none');
    }else {
        document.querySelector('.navbar__menu').setAttribute('style','display:block');
    }
}
// Highlights the viewed section's tab on the navigation bar
function highlightTheViewedNav(){
    const sectionName = theViewedSection.getAttribute('data-nav');
    const sectionNumber = sectionName[sectionName.length - 1];
    const theSelectedNav =  document.querySelector('#navbar__list').querySelector(`#nav${sectionNumber}`);
    if(theSelectedNav !== theViewedNav){
        if(theViewedNav === null){
            theViewedNav = theSelectedNav;
            theViewedNav.classList.add('viewed-nav');
        }else{
            theViewedNav.classList.remove('viewed-nav');
            theViewedNav = theSelectedNav;
            theViewedNav.classList.add('viewed-nav');
        }
    }
    
}

// Returns the section with the given section number
function getDesiredSection(sections, sectionNumber){
    let desiredSection = null;
    sections.forEach((section) => {
        if(section.getAttribute('data-nav') === `Section ${sectionNumber}`){
            desiredSection = section;
        }
    })
    return desiredSection;
}

//Collapse Or UnCollapse Section's Content
function collapseContent(header){
    let content;
    if(header.nodeName === 'H2'){
        content = header.nextElementSibling;
    }else if(header.nodeName === 'DIV'){
        content = header.parentElement.nextElementSibling;
    }else {
        content = header.parentElement.parentElement.nextElementSibling;
        header = header.parentElement
    }
    if(content.style.display === 'none'){
        content.style.display = 'block';
        header.querySelector('img').setAttribute('src' , 'Images/minus.png');
    }else {
        content.style.display = 'none';
        header.querySelector('img').setAttribute('src' , 'Images/plus.png');
    }
}

/* Main Functions */

// build the nav
function buildNav(e){
    sections.forEach((section) => {
        const data = section.getAttribute('data-nav');
        const navNumber = data[data.length-1];
        navEl = document.createElement('li');
        navEl.innerHTML = `<a href="#" id="nav${navNumber}" class="menu__link">${data}</a>`;
        document.querySelector('#navbar__list').appendChild(navEl);
    })
}

// Add class 'active' to section when near top of viewport
function updateTheViewedSection() {
    sections.forEach((section,key) => {
        if(sections[key].getBoundingClientRect().y < 100){
            if(sections[key] !== theViewedSection){
                theViewedSection.classList.remove('your-active-class');
                sections[key].classList.add('your-active-class');
                theViewedSection = sections[key];
            }
        }
    })
    highlightTheViewedNav();
}

// Scroll to anchor ID using scrollTO event
function scrollToDesiredSection(e){
    e.preventDefault();
    if(e.target.nodeName === 'A'){
        const sectionNumber = e.target.getAttribute('id')[e.target.getAttribute('id').length - 1];
        const desiredSection = getDesiredSection(sections, sectionNumber);
        desiredSection.scrollIntoView({behavior: "smooth"});
    }
}

/* Events */

// Build menu 
document.addEventListener('DOMContentLoaded',(e) => {
    buildNav(e);
})

// Scroll to section on link click
document.querySelector('#navbar__list').addEventListener('click' , (e) => {
    scrollToDesiredSection(e);
})

// Set sections as active
document.addEventListener('scroll',() => {
    window.clearTimeout(isScrolling);
    viewTheNavigationBar();
    updateTheViewedSection();
    toggleToTopBtn();
    isScrolling = setTimeout(hideNavigationBar, 2000);
});

// Show Menu Button
showMenuButton.addEventListener('click' , () => {
    toggleTheNavigationBar();
})

// Scroll to top of the page
scrollToTopBtn.addEventListener('click' , () => {
    document.body.scroll({
        behavior: 'smooth',
        top: 150,
        left: 150
      });
})

// Collapse Sections
sections.forEach((section) => {
    section.querySelector('h2').addEventListener('click',(e) => {
        collapseContent(e.target);
    })
})