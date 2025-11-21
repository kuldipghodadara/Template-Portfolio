// Theme Toggle
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check for saved theme or system preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    html.classList.add('dark');
  }
  
  // Toggle theme
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      html.classList.toggle('dark');
      const theme = html.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      updateThemeIcon();
    });
  }
  
  updateThemeIcon();
}

function updateThemeIcon() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  
  const isDark = document.documentElement.classList.contains('dark');
  themeToggle.innerHTML = isDark 
    ? '<svg class="icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg class="icon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
}

// Mobile Menu Toggle
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      updateMobileMenuIcon();
    });
    
    // Close menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        updateMobileMenuIcon();
      });
    });
  }
}

function updateMobileMenuIcon() {
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileToggle || !mobileMenu) return;
  
  const isOpen = mobileMenu.classList.contains('active');
  mobileToggle.innerHTML = isOpen
    ? '<svg class="icon" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
    : '<svg class="icon" viewBox="0 0 24 24"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
}

// Set Active Navigation Link
function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar-menu a, .mobile-menu a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (href === 'index.html' && currentPage === '')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Contact Form Handling
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.querySelector('[name="name"]').value,
      email: form.querySelector('[name="email"]').value,
      message: form.querySelector('[name="message"]').value
    };
    
    console.log('Form submitted:', formData);
    
    // Show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'card';
    successDiv.style.padding = '2rem';
    successDiv.style.textAlign = 'center';
    successDiv.style.marginTop = '2rem';
    successDiv.innerHTML = `
      <svg class="icon" style="width: 3rem; height: 3rem; margin: 0 auto 1rem; color: #22c55e;" viewBox="0 0 24 24">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      <h3>Message Sent!</h3>
      <p class="text-muted">Thank you for reaching out. I'll get back to you soon.</p>
    `;
    
    form.parentElement.innerHTML = '';
    form.parentElement.appendChild(successDiv);
  });
}

// Project Filter
function initProjectFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterButtons.length === 0) return;
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter projects
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Animate on Scroll
function initScrollAnimation() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.card, .project-card, .service-card, .blog-card').forEach(el => {
    observer.observe(el);
  });
}

function initTestimonialCarousel() {
  const carousel = document.querySelector('.testimonial-carousel');
  if (!carousel) return;
  
  const slider = carousel.querySelector('.testimonial-slider');
  const slides = carousel.querySelectorAll('.testimonial-slide');
  const dotsContainer = carousel.querySelector('.carousel-controls');
  
  if (!slider || slides.length === 0) return;
  
  let currentSlide = 0;
  let autoplayInterval;
  
  // Create dots
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot';
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }
  
  // Arrow buttons
  const leftArrow = carousel.querySelector('.carousel-arrow-left');
  const rightArrow = carousel.querySelector('.carousel-arrow-right');
  
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }
  
  function goToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentSlide = index;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    const dots = carousel.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  function nextSlide() {
    goToSlide(currentSlide + 1);
  }
  
  function resetAutoplay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }
  
  // Start autoplay
  resetAutoplay();
}

// Initialize all functions on page load
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  setActiveNav();
  initContactForm();
  initProjectFilter();
  initSmoothScroll();
  initScrollAnimation();
  updateMobileMenuIcon();
  initTestimonialCarousel();
});
