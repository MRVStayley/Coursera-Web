const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function toggleNavigation() {
	const isOpen = navMenu.classList.toggle('open');
	navToggle.setAttribute('aria-expanded', String(isOpen));
}

if (navToggle && navMenu) {
	navToggle.addEventListener('click', toggleNavigation);
}

if (navMenu) {
	navMenu.addEventListener('click', (event) => {
		const link = event.target.closest('a[href^="#"]');

		if (!link) {
			return;
		}

		const target = document.querySelector(link.getAttribute('href'));

		if (!target) {
			return;
		}

		event.preventDefault();
		target.scrollIntoView({ behavior: 'smooth', block: 'start' });
	});
}

function filterProjects(category) {
	const projects = document.querySelectorAll('#projects article');

	projects.forEach((project) => {
		const matchesCategory = category === 'all' || project.dataset.category === category;
		project.hidden = !matchesCategory;
	});
}

const projectImages = document.querySelectorAll('#projects article img');
const lightbox = document.querySelector('#project-lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
let lastFocusedImage;

function openLightbox(image) {
	lastFocusedImage = image;
	lightboxImage.src = image.currentSrc || image.src;
	lightboxImage.alt = image.alt;
	lightbox.hidden = false;
	document.body.classList.add('lightbox-open');
	lightboxClose.focus();
}

function closeLightbox() {
	lightbox.classList.remove('is-open');
	document.body.classList.remove('lightbox-open');
	lightbox.hidden = true;
	lightboxImage.src = '';
	lastFocusedImage?.focus();
}

projectImages.forEach((image) => {
	image.tabIndex = 0;
	image.setAttribute('role', 'button');
	image.setAttribute('aria-label', `Enlarge ${image.alt}`);
	image.addEventListener('click', () => openLightbox(image));
	image.addEventListener('keydown', (event) => {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			openLightbox(image);
		}
	});
});

if (lightbox && lightboxImage && lightboxClose) {
	lightboxClose.addEventListener('click', closeLightbox);
	lightbox.addEventListener('click', (event) => {
		if (event.target === lightbox) {
			closeLightbox();
		}
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && !lightbox.hidden) {
			closeLightbox();
		}
	});
}

const contactForm = document.querySelector('#contact-form');

function validateContactForm(event) {
	const fields = [...contactForm.querySelectorAll('input[required], textarea[required]')];
	const emptyField = fields.find((field) => !field.value.trim());

	fields.forEach((field) => field.setCustomValidity(''));

	if (emptyField) {
		event.preventDefault();
		emptyField.setCustomValidity(`Please enter your ${emptyField.name === 'project' ? 'message' : emptyField.name}.`);
		emptyField.reportValidity();
	}
}

if (contactForm) {
	contactForm.addEventListener('submit', validateContactForm);
	contactForm.addEventListener('input', (event) => {
		event.target.setCustomValidity('');
	});
}

