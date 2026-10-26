// Blinking cursor
function addBlinkingCursor(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.classList.add('typing');
    }
}
document.querySelectorAll('[data-cursor]').forEach(element => {
    element.classList.add('typing');
});

// Typewriter (skipped for visitors who prefer reduced motion)
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const descriptionElement = document.querySelector('.description');
if (descriptionElement && !reduceMotion) {
    const originalText = descriptionElement.textContent.trim();
    descriptionElement.textContent = '';
    descriptionElement.classList.add('typing');

    let i = 0;
    let isDeleting = false;

    function typeWriter() {
        if (!isDeleting && i < originalText.length) {
            descriptionElement.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else if (!isDeleting && i === originalText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 2000);
        } else if (isDeleting && i > 0) {
            descriptionElement.textContent = originalText.substring(0, i - 1);
            i--;
            setTimeout(typeWriter, 30);
        } else if (isDeleting && i === 0) {
            isDeleting = false;
            setTimeout(typeWriter, 1000);
        }
    }

    setTimeout(typeWriter, 500);
}

addBlinkingCursor('.about-typing');
addBlinkingCursor('.project-typing');

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => e.isIntersecting && e.target.classList.add('visible'));
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(s => observer.observe(s));

// Active nav highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove('active'));
            const id = entry.target.id || entry.target.querySelector('[id]')?.id;
            const active = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(s => navObserver.observe(s));

// Highlight Contact when scrolled to the bottom of the page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        navLinks.forEach(link => link.classList.remove('active'));
        const contact = document.querySelector('.nav-links a[href="#contact"]');
        if (contact) contact.classList.add('active');
    }
}, { passive: true });


// Scroll progress bar
const progressBar = document.getElementById('scrollProgress');
function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar && max > 0) {
        progressBar.style.width = (window.scrollY / max * 100) + '%';
    }
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();