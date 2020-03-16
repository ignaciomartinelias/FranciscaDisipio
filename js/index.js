// Variable Decalarations 
const scroll = new SmoothScroll();
const imgWrappers = document.querySelectorAll(".img-container");
const menuToggler = document.querySelector('.menu');
const menuExtended = document.querySelector('.menu-extended');
const categories = document.querySelectorAll('.menu-extended .category');
const customCursor = document.querySelector('.custom-cursor');
const sections = document.querySelectorAll('section');

const moreDetailsButtons = document.querySelectorAll('.mobile-expand');
const mobileExpanded = document.querySelector('.mobile-expanded');
const closeInDetails = document.querySelector('.mobile-expanded .menu');
const projects = document.querySelectorAll('.mobile-expanded .category');

// Click Animation on Image Wrappers
imgWrappers.forEach(imgWrapper => {

    // Adding Arrows to Image Wrappers
    const backArrow = document.createElement('img');
    const nextArrow = document.createElement('img');
    backArrow.setAttribute('src', '/FranciscaDisipio/assets/images/back-arrow.svg');
    nextArrow.setAttribute('src', '/FranciscaDisipio/assets/images/next-arrow.svg');
    backArrow.classList.add('back-arrow');
    backArrow.classList.add('arrow');
    nextArrow.classList.add('next-arrow');
    nextArrow.classList.add('arrow');
    imgWrapper.appendChild(backArrow);
    imgWrapper.appendChild(nextArrow);

    // Adding Click Event to Image Wrappers and Arrows
    imgWrapper.addEventListener("click", () => {
        const images = imgWrapper.querySelectorAll(".image-back");
        let targetImage = undefined;
        let nextImage = undefined;
        let forwards = true;

        if (event.target.classList.contains('back-arrow')) {
            forwards = false;
        }

        for (let i = 0; i < images.length; i++) {
            if (images[i].classList.contains("image-highlight")) {
                targetImage = images[i];
                if (forwards) {
                    if (i === images.length - 1) {
                        nextImage = images[0];
                    } else {
                        nextImage = images[i + 1];
                    }
                } else {
                    if (i === 0) {
                        nextImage = images[images.length - 1];
                    } else {
                        nextImage = images[i - 1];
                    }
                }

            }
        }

        targetImage.classList.remove("image-highlight");
        nextImage.classList.add("image-highlight");
        targetImage.classList.add("image-back");
    })
});

// Menu Toggler and Menu Expanded Animation

menuToggler.addEventListener("click", () => {
    if (menuExtended.classList.contains('toggle-on')) {
        categories.forEach(category => {
            category.classList.remove('appear-in');
        })
        menuExtended.classList.remove('toggle-on');
        menuToggler.classList.remove('toggle-on');
        customCursor.classList.remove('toggle-on');
    } else {
        menuExtended.classList.add('toggle-on');
        menuToggler.classList.add('toggle-on');
        customCursor.classList.add('toggle-on');
        let delay = 0;
        categories.forEach(category => {
            setTimeout(() => {
                category.classList.add('appear-in');
            }, delay);
            delay = delay + 150;
        })
    }
})

// Scroll to sections on Menu Items

const arrayCategories = Array.prototype.slice.call(categories);

categories.forEach((category) => {
    category.addEventListener('click', (e) => {
        const index = arrayCategories.indexOf(e.currentTarget);
        categories.forEach(category => {
            category.classList.remove('appear-in');
        })
        menuExtended.classList.remove('toggle-on');
        menuToggler.classList.remove('toggle-on');
        customCursor.classList.remove('toggle-on');

        const distanceY = sections[index].offsetTop - 75;

        if (window.innerWidth > 700) {
            window.scroll({
                top: distanceY,
                behavior: 'smooth'
            });
        } else {
            scroll.animateScroll(distanceY, { speed: 250, speedAsDuration: true, easing: 'linear' });
        }

    })
})

// var scroll = new SmoothScroll('a[href*="#"]');

// Cursor Animation

document.addEventListener('mousemove', () => {
    customCursor.style.left = `${event.pageX}px`;
    customCursor.style.top = `${event.pageY}px`;

    if ((sections[sections.length - 1].offsetTop - 50) < event.pageY) {
        if (!customCursor.classList.contains('toggle-on')) {
            customCursor.classList.add('toggle-on');
        }
    } else {
        if (!menuToggler.classList.contains('toggle-on') && customCursor.classList.contains('toggle-on')) {
            customCursor.classList.remove('toggle-on');
        }
    }
})

document.addEventListener('wheel', () => {
    customCursor.style.left = `${event.pageX}px`;
    customCursor.style.top = `${event.pageY}px`;
})

// Cursor Hover Animation

const arrows = document.querySelectorAll(".arrow");
const links = document.querySelectorAll(".contact-container a");

arrows.forEach(arrow => {
    arrow.addEventListener('mouseover', toggleCursorHoverAnimation);
    arrow.addEventListener('mouseout', toggleCursorHoverAnimation);
})

links.forEach(link => {
    link.addEventListener('mouseover', toggleCursorHoverAnimation);
    link.addEventListener('mouseout', toggleCursorHoverAnimation);
})

categories.forEach(category => {
    category.addEventListener('mouseover', toggleCursorHoverAnimation);
    category.addEventListener('mouseout', toggleCursorHoverAnimation);
})

menuToggler.addEventListener('mouseover', toggleCursorHoverAnimation);
menuToggler.addEventListener('mouseout', toggleCursorHoverAnimation);

function toggleCursorHoverAnimation() {
    event.stopPropagation();
    customCursor.classList.toggle('hover');
}

// Cursor Click Animation

document.body.addEventListener('click', () => {
    customCursor.classList.add('click');
    setTimeout(() => {
        customCursor.classList.remove('click');
    }, 200);
});

// Cursor leave window 

document.addEventListener('mouseout', () => {
    if (!customCursor.classList.contains('hover')) {
        customCursor.classList.add('dissapear');
    }
});
document.addEventListener('mouseover', () => {
    if (!customCursor.classList.contains('hover')) {
        customCursor.classList.remove('dissapear');
    }
});

// Project Details Animation

moreDetailsButtons.forEach(button => {
    button.addEventListener("click", () => {
        mobileExpanded.classList.add('toggle-on');
        closeInDetails.classList.add('toggle-on');
        customCursor.classList.add('toggle-on');
        const array = Array.from(moreDetailsButtons);
        const bla = event.target;
        menuToggler.classList.add("hide");
        projects.item(array.indexOf(bla)).classList.add('appear-in');
    })
})

closeInDetails.addEventListener('click', () => {
    mobileExpanded.classList.remove('toggle-on');
    closeInDetails.classList.remove('toggle-on');
    customCursor.classList.remove('toggle-on');
    projects.forEach(project => {
        if (project.classList.contains('appear-in')) {
            project.classList.add("mid-animation");
        }
    })


    setTimeout(() => {
        menuToggler.classList.remove("hide");
        projects.forEach(project => {
            if (project.classList.contains('appear-in')) {
                project.classList.remove("appear-in");
                project.classList.remove("mid-animation");
            }
        })
    }, 1000)
})

gsap.from('header .header-item:nth-child(1)', { duration: 2.5, opacity: .5, ease: "power3.out", y: 500 });
gsap.from('header .header-item:nth-child(1) .face', { duration: 2.5, opacity: .5, ease: "power3.out", y: -1000 });
gsap.from('header .header-item:nth-child(2)', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });
gsap.from('.logo', { duration: 2.5, opacity: .5, ease: "power3.out", x: -500 });
gsap.from('.number-00', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });

window.addEventListener('scroll', function () {
    sections.forEach((element, index) => {
        var position = element.getBoundingClientRect();
        // checking for partial visibility
        var isTrueSet = (element.getAttribute('appeared') == 'true');
        if (window.innerWidth > 700) {
            if (!isTrueSet && position.top < (window.innerHeight + 100) && position.bottom >= 0) {
                sectionTransition(index);
                element.setAttribute('appeared', true);
            }
        } else {
            if (!isTrueSet && position.top < (window.innerHeight + 50) && position.bottom >= 0) {
                sectionTransition(index);
                element.setAttribute('appeared', true);
            }
        }
    })
});

function sectionTransition(index) {
    if (window.innerWidth > 700) {
        switch (index) {
            case 0:
                gsap.from('.number-01', { duration: 2.5, opacity: .5, ease: "power3.out", x: -250 });
                gsap.from('#furia .furia', { duration: 2.5, opacity: .5, ease: "power3.out", y: 500 });
                break;
            case 1:
                gsap.from('.number-02', { duration: 2.5, opacity: .5, ease: "power3.out", y: -250 });
                gsap.from('#container .big-container:nth-child(1) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });
                gsap.from('#container .big-container:nth-child(2) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: -500 });
                break;
            case 2:
                gsap.from('#dimension .big-container:nth-child(1) .img-static', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });
                gsap.from('#dimension .big-container:nth-child(1) .dimension-letters', { duration: 2.5, opacity: 0, ease: "power3.out", y: -250, x: -500 });
                gsap.from('#dimension .big-container:nth-child(2) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", y: 500 });
                break;
            case 3:
                gsap.from('#jewelry .big-container:nth-child(2) .img-static', { duration: 2.5, opacity: .5, ease: "power3.out", y: -500 });
                gsap.from('#jewelry .big-container:nth-child(1) .jewelry-letters', { duration: 2.5, opacity: 0, ease: "power3.out", x: 500 });
                gsap.from('#jewelry .big-container:nth-child(1) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", y: 500 });
                break;
            case 4:
                gsap.from('#fangio .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: -500 });
                gsap.from('#fangio .fondo-fangio', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });
                gsap.from('#fangio .fangio-letters', { duration: 2.5, opacity: 0, ease: "power3.out", y: 250 });
                break;
            case 5:
                gsap.from('#matrix .big-container:nth-child(1) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: -500 });
                gsap.from('#matrix .big-container:nth-child(2) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });
                gsap.from('#matrix .big-container:nth-child(1) .matrix1', { duration: 2.5, opacity: .5, ease: "power3.out", y: -250 });
                gsap.from('#matrix .big-container:nth-child(1) .matrix2', { duration: 2.5, opacity: .5, ease: "power3.out", y: 250 });
                gsap.from('#matrix .number-06', { duration: 2.5, opacity: .5, ease: "power3.out", x: 250 });
                gsap.from('#matrix .number-06-bis', { duration: 2.5, opacity: .5, ease: "power3.out", x: -250 });
                break;
            case 6:
                gsap.from('#museum .big-container:nth-child(1)', { duration: 2.5, opacity: .5, ease: "power3.out", x: -500 });
                gsap.from('#museum .big-container:nth-child(1) .number-07', { duration: 2.5, opacity: 0, ease: "power3.out", x: 500, y: -250 });
                gsap.from('#museum .big-container:nth-child(2) .img-container', { duration: 2.5, ease: "power3.out", y: 250 });
                gsap.from('#museum .big-container:nth-child(2) .letters-museum', { duration: 2.5, opacity: .5, ease: "power3.out", x: 1000 });
                break;
        }
    } else {
        switch (index) {
            case 0:
                gsap.from('.number-01', { duration: 2.5, opacity: .5, ease: "power3.out", x: -125 });
                gsap.from('#furia .furia', { duration: 2.5, opacity: .5, ease: "power3.out", y: 250 });
                break;
            case 1:
                gsap.from('.number-02', { duration: 2.5, opacity: .5, ease: "power3.out", y: -125 });
                gsap.from('#container .big-container:nth-child(1) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: 250 });
                gsap.from('#container .big-container:nth-child(2) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: -250 });
                break;
            case 2:
                gsap.from('#dimension .big-container:nth-child(1) .img-static', { duration: 2.5, opacity: .5, ease: "power3.out", x: 250 });
                gsap.from('#dimension .big-container:nth-child(1) .dimension-letters', { duration: 2.5, opacity: 0, ease: "power3.out", y: -125, x: -250 });
                gsap.from('#dimension .big-container:nth-child(2) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", y: 250 });
                break;
            case 3:
                gsap.from('#jewelry .big-container:nth-child(2) .img-static', { duration: 2.5, opacity: .5, ease: "power3.out", x: -250 });
                gsap.from('#jewelry .big-container:nth-child(2) .img-static .number-04', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });
                gsap.from('#jewelry .big-container:nth-child(1) .jewelry-letters', { duration: 2.5, opacity: 0, ease: "power3.out", x: 250 });
                gsap.from('#jewelry .big-container:nth-child(1) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", y: 250 });
                break;
            case 4:
                gsap.from('#fangio .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: -250 });
                gsap.from('#fangio .fondo-fangio', { duration: 2.5, opacity: .5, ease: "power3.out", x: 250 });
                gsap.from('#fangio .fangio-letters', { duration: 2.5, opacity: 0, ease: "power3.out", y: 125 });
                break;
            case 5:
                gsap.from('#matrix .big-container:nth-child(1) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: -250 });
                gsap.from('#matrix .big-container:nth-child(2) .img-container', { duration: 2.5, opacity: .5, ease: "power3.out", x: 250 });
                gsap.from('#matrix .big-container:nth-child(1) .matrix1', { duration: 2.5, opacity: .5, ease: "power3.out", y: -125 });
                gsap.from('#matrix .big-container:nth-child(1) .matrix2', { duration: 2.5, opacity: .5, ease: "power3.out", y: 125 });
                gsap.from('#matrix .number-06', { duration: 2.5, opacity: .5, ease: "power3.out", x: 125 });
                gsap.from('#matrix .number-06-bis', { duration: 2.5, opacity: .5, ease: "power3.out", x: -125 });
                break;
            case 6:
                gsap.from('#museum .big-container:nth-child(1)', { duration: 2.5, opacity: .5, ease: "power3.out", x: -250 });
                gsap.from('#museum .big-container:nth-child(1) .number-07', { duration: 2.5, opacity: 0, ease: "power3.out", x: 250, y: -125 });
                gsap.from('#museum .big-container:nth-child(2) .img-container', { duration: 2.5, ease: "power3.out", y: 125 });
                gsap.from('#museum .big-container:nth-child(2) .letters-museum', { duration: 2.5, opacity: .5, ease: "power3.out", x: 500 });
                break;
        }
    }
}