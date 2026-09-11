/* ============================================
   KEELSA TAN — PORTFOLIO JAVASCRIPT
   Features:
   1. Mobile hamburger menu toggle
   2. Smooth scrolling for nav links
   3. Active nav link highlight on scroll
   4. Scroll reveal animations
   5. Back-to-top button visibility
   ============================================ */

// Wait for the DOM to fully load before running scripts
document.addEventListener('DOMContentLoaded', function () {

  // ============================
  // 1. MOBILE HAMBURGER MENU
  // Toggles the mobile navigation open/closed
  // ============================
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  // Click handler for the hamburger button
  hamburger.addEventListener('click', function () {
    // Toggle the 'open' class on both hamburger and nav
    hamburger.classList.toggle('open');
    nav.classList.toggle('open');
  });

  // Close the mobile menu when a nav link is clicked
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      // Only close on mobile (when nav has 'open' class)
      if (nav.classList.contains('open')) {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
      }
    });
  });

  // Also close menu if user clicks outside the nav
  document.addEventListener('click', function (e) {
    if (nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.classList.remove('open');
      nav.classList.remove('open');
    }
  });

  // ============================
  // 2. SMOOTH SCROLLING
  // Adds smooth scroll behavior for all anchor links
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      // Get the target section by its id
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for the fixed header
        const headerHeight = document.getElementById('header').offsetHeight;

        window.scrollTo({
          top: targetSection.offsetTop - headerHeight,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================
  // 3. HEADER BACKGROUND ON SCROLL
  // Adds a glass effect to the header when scrolled
  // ============================
  const header = document.getElementById('header');

  function handleHeaderScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleHeaderScroll);
  // Run once on load in case page is already scrolled
  handleHeaderScroll();

  // ============================
  // 4. ACTIVE NAV LINK ON SCROLL
  // Highlights the nav link that corresponds to the
  // section currently visible on screen
  // ============================
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveNav() {
    const headerHeight = header.offsetHeight;
    const scrollPosition = window.scrollY + headerHeight + 100; // offset buffer

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      // Check if the scroll position is within this section
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // Remove active class from all links
        navLinks.forEach(function (link) {
          link.classList.remove('active');
        });

        // Add active class to the matching link
        const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');
        if (activeLink) {
          activeLink.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', highlightActiveNav);
  // Run once on load
  highlightActiveNav();

  // ============================
  // 5. SCROLL REVEAL ANIMATION
  // Uses IntersectionObserver to reveal elements
  // as they enter the viewport
  // ============================
  const revealElements = document.querySelectorAll('.reveal');

  // Create an IntersectionObserver to watch for elements entering viewport
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      // When element is visible, add the 'revealed' class
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
      // Once revealed, stop observing (optional — remove if you want repeat animation)
      // entry.target.classList.add('revealed') alone keeps it visible on scroll back
    });
  }, {
    threshold: 0.15,  // Trigger when 15% of the element is visible
    rootMargin: '0px 0px -50px 0px'  // Slight offset so it triggers a bit early
  });

  // Observe all reveal elements
  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // ============================
  // 6. GEMZ OF THE SEA PHOTO
  // Shows the single bath-products photo when Learn More is clicked
  // ============================
  const gemzLearnMore = document.querySelector('.gemz-learn-more');
  const gemzPhotoGallery = document.getElementById('gemz-photo-gallery');

  if (gemzLearnMore && gemzPhotoGallery) {
    gemzLearnMore.addEventListener('click', function (e) {
      e.preventDefault();
      const isHidden = gemzPhotoGallery.hasAttribute('hidden');

      if (isHidden) {
        gemzPhotoGallery.removeAttribute('hidden');
        gemzLearnMore.setAttribute('aria-expanded', 'true');
        gemzLearnMore.textContent = 'Hide Photo';
      } else {
        gemzPhotoGallery.setAttribute('hidden', '');
        gemzLearnMore.setAttribute('aria-expanded', 'false');
        gemzLearnMore.textContent = 'Learn More';
      }
    });
  }

  // ============================
  // 7. BACK TO TOP BUTTON
  // Shows/hides button based on scroll position
  // and scrolls to top when clicked
  // ============================
  const backToTopBtn = document.getElementById('backToTop');

  // Show/hide button based on scroll position
  function handleBackToTop() {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleBackToTop);

  // Scroll to top when button is clicked
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

}); // End DOMContentLoaded
 