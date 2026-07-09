document.addEventListener('DOMContentLoaded', () => {
  // --- Mobile Navigation Menu ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  function toggleMobileMenu() {
    const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('flex');
    menuIconOpen.classList.toggle('hidden');
    menuIconClose.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden');
  }

  mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  });

  // Close menu on screen resize if open
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      mobileMenu.classList.remove('flex');
      menuIconOpen.classList.remove('hidden');
      menuIconClose.classList.add('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('overflow-hidden');
    }
  });


  // --- Testimonial Slider ---
  const testimonials = [
    {
      name: "Eleanor Sterling",
      role: "Patient since 2023",
      text: "Dr. Stone is incredible. I have always had high dental anxiety, but her gentle approach and the painless anesthesia system changed everything. The staff makes you feel so welcome.",
      rating: 5,
      tag: "Verified Patient"
    },
    {
      name: "Marcus K. Vance",
      role: "Patient since 2024",
      text: "Lumina Dental is the most high-tech and clean clinic I've ever visited. The intraoral camera showed me exactly what was going on, and the crown procedure was completely painless and quick.",
      rating: 5,
      tag: "Verified Patient"
    },
    {
      name: "Sophia Martinez",
      role: "Patient since 2022",
      text: "They fit me in for an emergency root canal the same day I called. The care was compassionate, prompt, and Dr. Stone explained every step to put my mind at ease. Highly recommend!",
      rating: 5,
      tag: "Verified Patient"
    }
  ];

  let currentSlide = 0;
  const slideContainer = document.getElementById('testimonial-container');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const dotContainer = document.getElementById('testimonial-dots');

  // Create dot indicators
  testimonials.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === 0 ? 'bg-teal-600 w-6' : 'bg-slate-300 hover:bg-slate-400'}`;
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotContainer.appendChild(dot);
  });

  const dots = dotContainer.querySelectorAll('button');

  function renderSlide(index) {
    const data = testimonials[index];
    
    // Add fade out class
    slideContainer.classList.add('opacity-0', 'translate-y-2');
    
    setTimeout(() => {
      slideContainer.innerHTML = `
        <div class="flex flex-col items-center text-center p-2">
          <!-- Rating Stars -->
          <div class="flex justify-center mb-6" aria-label="5 out of 5 stars">
            ${Array(data.rating).fill().map(() => `
              <svg class="w-6 h-6 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            `).join('')}
          </div>
          
          <!-- Testimonial Text -->
          <blockquote class="text-xl md:text-2xl font-light text-slate-800 italic leading-relaxed mb-8 max-w-3xl">
            "${data.text}"
          </blockquote>
          
          <!-- Author Info -->
          <div class="flex items-center gap-3">
            <div>
              <cite class="not-italic font-semibold text-slate-900 block text-lg">${data.name}</cite>
              <span class="text-slate-500 text-sm block">${data.role}</span>
            </div>
            <span class="inline-flex items-center gap-1 bg-teal-50 text-teal-700 text-xs font-semibold px-2.5 py-1 rounded-full border border-teal-100">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
              </svg>
              ${data.tag}
            </span>
          </div>
        </div>
      `;
      
      // Update dots UI
      dots.forEach((dot, dotIdx) => {
        if (dotIdx === index) {
          dot.className = 'w-2.5 h-2.5 rounded-full bg-teal-600 w-6 transition-all duration-300';
        } else {
          dot.className = 'w-2.5 h-2.5 rounded-full bg-slate-300 hover:bg-slate-400 transition-all duration-300';
        }
      });
      
      // Add fade in class
      slideContainer.classList.remove('opacity-0', 'translate-y-2');
    }, 200);
  }

  function goToSlide(index) {
    currentSlide = index;
    renderSlide(currentSlide);
    resetAutoPlay();
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonials.length;
    renderSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
    renderSlide(currentSlide);
  }

  // Event Listeners for Slider
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoPlay();
  });
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoPlay();
  });

  // Slider Autoplay
  let autoplayInterval = setInterval(nextSlide, 8000);
  function resetAutoPlay() {
    clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 8000);
  }

  // Initialize first slide
  renderSlide(0);


  // --- Appointment Booking Form & Modal ---
  const bookingForm = document.getElementById('booking-form');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalText = document.getElementById('modal-details-text');
  
  // Disable past dates in date picker
  const dateInput = document.getElementById('booking-date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('booking-name').value.trim();
    const contact = document.getElementById('booking-contact').value.trim();
    const service = document.getElementById('booking-service').value;
    const date = dateInput.value;
    const time = document.getElementById('booking-time').value;

    // Simple Form Validations
    if (!name || !contact || !service || !date || !time) {
      alert("Please fill in all details to proceed with your booking request.");
      return;
    }

    // Format display date
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Populate Success Modal Text
    modalText.innerHTML = `
      Dear <strong>${name}</strong>, we have received your request for <strong>${service}</strong> on <strong>${formattedDate} at ${time}</strong>.<br><br>
      Our coordinator will contact you at <strong>${contact}</strong> within 2 hours to confirm your precise appointment window. We look forward to seeing you!
    `;

    // Display the modal
    successModal.classList.remove('hidden');
    successModal.classList.add('flex');
    document.body.classList.add('overflow-hidden');

    // Reset Form
    bookingForm.reset();
  });

  closeModalBtn.addEventListener('click', () => {
    successModal.classList.add('hidden');
    successModal.classList.remove('flex');
    document.body.classList.remove('overflow-hidden');
  });

  // Close modal clicking outside the modal content
  successModal.addEventListener('click', (e) => {
    if (e.target === successModal) {
      closeModalBtn.click();
    }
  });


  // --- Active Nav Links Highlighting (Intersection Observer) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveLink() {
    let scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    
    // Add offset for the floating sticky header
    scrollPos += 120; 

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('text-teal-600', 'font-medium');
          link.classList.add('text-slate-600');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.remove('text-slate-600');
            link.classList.add('text-teal-600', 'font-semibold');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Trigger initially


  // --- Back to Top Button ---
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});
