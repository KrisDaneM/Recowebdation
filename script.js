// =============================
// Sticky Header Scroll Effect
// =============================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if(window.scrollY > 20){
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// =============================
// Horizontal Auto-Scrolling / Drag Nav
// =============================
const navScroll = document.querySelector('.nav-scroll');
const originalNavItems = [...navScroll.children];
let scrollSpeed = 0.5;
let isDragging = false;
let startX = 0;
let scrollLeftStart = 0;
let isPaused = false; // flag to pause auto-scroll on hover

// Clone nav items for infinite loop
function makeInfiniteNav() {
    navScroll.innerHTML = '';

    const containerWidth = navScroll.parentElement.offsetWidth;
    let totalWidth = 0;
    let iterations = 0;
    while (totalWidth < containerWidth * 3 && iterations < 20) {
        originalNavItems.forEach(item => navScroll.appendChild(item.cloneNode(true)));
        totalWidth = navScroll.scrollWidth;
        iterations++;
    }

    navScroll.scrollLeft = totalWidth / 2;
}

// Auto-scroll continuously
function autoScroll() {
    if (!isPaused) {
        navScroll.scrollLeft += scrollSpeed;

        if (navScroll.scrollLeft >= navScroll.scrollWidth / 1.5) {
            navScroll.scrollLeft = navScroll.scrollLeft / 2;
        }
    }
    requestAnimationFrame(autoScroll);
}

// Manual drag / touch
function setupDrag() {
    navScroll.addEventListener('mousedown', e => {
        isDragging = true;
        startX = e.pageX - navScroll.offsetLeft;
        scrollLeftStart = navScroll.scrollLeft;
    });
    navScroll.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const x = e.pageX - navScroll.offsetLeft;
        navScroll.scrollLeft = scrollLeftStart + (startX - x);
    });
    navScroll.addEventListener('mouseup', () => isDragging = false);
    navScroll.addEventListener('mouseleave', () => isDragging = false);

    navScroll.addEventListener('touchstart', e => {
        isDragging = true;
        startX = e.touches[0].pageX - navScroll.offsetLeft;
        scrollLeftStart = navScroll.scrollLeft;
    });
    navScroll.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - navScroll.offsetLeft;
        navScroll.scrollLeft = scrollLeftStart + (startX - x);
    });
    navScroll.addEventListener('touchend', () => isDragging = false);
}

// Pause auto-scroll when hovering header
const header = document.querySelector('header');
header.addEventListener('mouseenter', () => { isPaused = true; });
header.addEventListener('mouseleave', () => { isPaused = false; });

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    makeInfiniteNav();
    setupDrag();
    autoScroll();
});

// Handle window resize
window.addEventListener('resize', () => {
    makeInfiniteNav();
});

// =============================
// Contact Form Submit
// =============================
const contactForm = document.querySelector('.contact-form-card form');
const successMsg = document.querySelector('.contact-form-card .success-message');
const errorMsg = document.querySelector('.contact-form-card .error-message');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const accessKey = formData.get('access_key');

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      successMsg.style.display = 'block';
      errorMsg.style.display = 'none';
      contactForm.reset();
    } else {
      throw new Error('Form submission failed');
    }
  } catch (err) {
    successMsg.style.display = 'none';
    errorMsg.style.display = 'block';
    console.error(err);
  }
});
