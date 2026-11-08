const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? '✕' : '☰';
  });
  document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '☰';
  }));
}
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const type = document.getElementById('type').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all required fields.');
      return;
    }

    if (!document.getElementById('email').validity.valid) {
      alert('Please enter a valid email address.');
      return;
    }

    const companyEmail = 'goldenpacificoman@gmail.com';

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nEnquiry: ${type}\n\nMessage: ${message}`
    );

    const subject = encodeURIComponent('Website enquiry: ' + type);
form.reset();

window.location.href = `mailto:${companyEmail}?subject=${encodeURIComponent('Website enquiry: ' + type)}&body=${body}`;
  });
}
/* Project Image Lightbox */
const projectImages = document.querySelectorAll(".project-card");
console.log("Lightbox project cards:", projectImages.length);
const lightbox = document.createElement("div");
lightbox.className = "image-lightbox";
lightbox.innerHTML = `
  <span class="lightbox-close">&times;</span>
  <img src="" alt="Project Image">
`;

document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const closeButton = lightbox.querySelector(".lightbox-close");

projectImages.forEach((card) => {
  const openProjectImage = () => {
    const background = getComputedStyle(card).backgroundImage;
    const match = background.match(/url\(["']?(.*?)["']?\)/);

    if (match) {
      lightboxImage.src = match[1];
      lightbox.classList.add("show");
    }
  };

  card.addEventListener("click", openProjectImage);
  const viewButton = card.querySelector(".project-view-image");
  if (viewButton) {
    viewButton.addEventListener("click", (event) => {
      event.stopPropagation();
      openProjectImage();
    });
  }
});

closeButton.addEventListener("click", () => {
  lightbox.classList.remove("show");
});

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.classList.remove("show");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    lightbox.classList.remove("show");
  }
});
 