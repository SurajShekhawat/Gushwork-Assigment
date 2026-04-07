document.addEventListener("DOMContentLoaded", () => {
  // --- Sticky Header Logic ---
  const header = document.getElementById("main-header");
  let lastScrollTop = 0;
  const scrollThreshold = 100;

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add 'header-scrolled' class after threshold
    if (scrollTop > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }

    // Hide on scroll down, show on scroll up
    if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  });

  // --- Hero Carousel Logic ---
  const track = document.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");
  const thumbs = document.querySelectorAll(".thumb");

  let currentSlideIndex = 0;

  const updateCarousel = (index) => {
    track.style.transform = `translateX(-${index * 100}%)`;
    thumbs.forEach(t => t.classList.remove("active"));
    thumbs[index].classList.add("active");
    currentSlideIndex = index;
  };

  nextBtn?.addEventListener("click", () => {
    let index = (currentSlideIndex + 1) % slides.length;
    updateCarousel(index);
  });

  prevBtn?.addEventListener("click", () => {
    let index = (currentSlideIndex - 1 + slides.length) % slides.length;
    updateCarousel(index);
  });

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => updateCarousel(index));
  });

  // --- Professional Magnifier Lens Logic ---
  const zoomImg = document.getElementById("zoom-img");
  const zoomLens = document.getElementById("zoom-lens");
  const zoomResult = document.getElementById("zoom-result");

  const runMagnifier = () => {
    // Show lens and result on mouse enter
    const container = document.querySelector(".main-carousel");

    container.addEventListener("mousemove", moveLens);
    container.addEventListener("mouseenter", () => {
      // Ensure the background image matches current carousel image
      const currentActiveImg = slides[currentSlideIndex].querySelector("img");
      zoomResult.style.backgroundImage = `url('${currentActiveImg.src}')`;

      // Calculate background size based on ratio
      const bx = zoomResult.offsetWidth / zoomLens.offsetWidth;
      const by = zoomResult.offsetHeight / zoomLens.offsetHeight;
      zoomResult.style.backgroundSize = `${zoomImg.width * bx}px ${zoomImg.height * by}px`;

      zoomLens.style.visibility = "visible";
      zoomResult.style.visibility = "visible";
    });

    container.addEventListener("mouseleave", () => {
      zoomLens.style.visibility = "hidden";
      zoomResult.style.visibility = "hidden";
    });

    function moveLens(e) {
      const pos = getCursorPos(e);
      let x = pos.x - (zoomLens.offsetWidth / 2);
      let y = pos.y - (zoomLens.offsetHeight / 2);

      // Bounds
      if (x > zoomImg.width - zoomLens.offsetWidth) { x = zoomImg.width - zoomLens.offsetWidth; }
      if (x < 0) { x = 0; }
      if (y > zoomImg.height - zoomLens.offsetHeight) { y = zoomImg.height - zoomLens.offsetHeight; }
      if (y < 0) { y = 0; }

      // Position lens
      zoomLens.style.left = x + "px";
      zoomLens.style.top = y + "px";

      // Result background ratio (Recalculate to ensure accurate magnification)
      const bx = zoomResult.offsetWidth / zoomLens.offsetWidth;
      const by = zoomResult.offsetHeight / zoomLens.offsetHeight;

      // Update background image for current slide if changed
      const currentActiveImg = slides[currentSlideIndex].querySelector("img");
      zoomResult.style.backgroundImage = `url('${currentActiveImg.src}')`;

      // Update background size and position
      zoomResult.style.backgroundSize = `${zoomImg.width * bx}px ${zoomImg.height * by}px`;
      zoomResult.style.backgroundPosition = "-" + (x * bx) + "px -" + (y * by) + "px";
    }

    function getCursorPos(e) {
      const rect = zoomImg.getBoundingClientRect();
      let x = e.pageX - rect.left - window.pageXOffset;
      let y = e.pageY - rect.top - window.pageYOffset;
      return { x: x, y: y };
    }
  };

  const isTouchDevice = () => {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
  }

  if (zoomImg && zoomLens && zoomResult && !isTouchDevice()) {
    runMagnifier();
  }

  // --- FAQ Accordion Logic ---
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Toggle current item
      item.classList.toggle("active");

      // Optional: Close other items
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove("active");
      });
    });
  });

  // --- Manufacturing Process Tabs ---
  const tabBtns = document.querySelectorAll(".tab-btn");
  const processTitle = document.getElementById("process-title");
  const processDesc = document.getElementById("process-desc");
  const processImg = document.getElementById("process-img");

  const processData = {
    raw: {
      title: "High-Grade Raw Material Selection",
      text: "Vacuum sizing tanks ensure precise outer diameter while internal pressure maintains perfect roundness and wall thickness uniformity.",
      img: "assets/process_1.png"
    },
    extrusion: {
      title: "Precision Extrusion Line",
      text: "State-of-the-art extrusion technology ensures consistent quality and optimal material properties.",
      img: "assets/hero_1.png"
    },
    cooling: {
      title: "Efficient Vacuum Cooling",
      text: "Multi-stage vacuum cooling tanks ensure the pipe maintains its shape and structural integrity as it solidifies.",
      img: "assets/process_1.png"
    },
    sizing: {
      title: "Precision Sizing & Rounding",
      text: "Calibration sleeves and vacuum tanks work together to achieve exact dimensional accuracy as per international standards.",
      img: "assets/app_1.png"
    },
    quality: {
      title: "Rigorous Quality Control",
      text: "Every batch undergoes ultrasonic testing and physical inspection to ensure zero defects and maximum performance.",
      img: "assets/hero_1.png"
    },
    marking: {
      title: "Automated Pipe Marking",
      text: "Laser marking systems apply persistent identification, including brand name, size, pressure rating, and manufacturing date.",
      img: "assets/process_1.png"
    },
    cutting: {
      title: "Precision Length Cutting",
      text: "Automated planetary cutters provide clean, square ends for perfectly aligned fusion joints during installation.",
      img: "assets/app_1.png"
    },
    packaging: {
      title: "Secure Packaging & Coiling",
      text: "Finished pipes are safely coiled or bundled, ready for secure transport to project sites worldwide.",
      img: "assets/hero_1.png"
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      // Remove active from all siblings in the same section
      const parent = btn.parentElement;
      parent.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const tab = btn.dataset.tab;
      const data = processData[tab] || processData.raw;

      if (processTitle) processTitle.textContent = data.title;
      if (processDesc) processDesc.textContent = data.text;
      if (processImg) processImg.src = data.img;
    });
  });

  // --- Testimonial Auto-Slide Logic ---
  const testimonialSlider = document.querySelector(".testimonial-slider");
  let isPaused = false;

  if (testimonialSlider) {
    testimonialSlider.addEventListener("mouseenter", () => isPaused = true);
    testimonialSlider.addEventListener("mouseleave", () => isPaused = false);
    testimonialSlider.addEventListener("touchstart", () => isPaused = true);
    testimonialSlider.addEventListener("touchend", () => isPaused = false);

    setInterval(() => {
      if (isPaused) return;

      const card = testimonialSlider.querySelector(".testimonial-card-v2");
      const cardWidth = card.offsetWidth + 32; // Card width + gap
      const maxScroll = testimonialSlider.scrollWidth - testimonialSlider.offsetWidth;

      if (testimonialSlider.scrollLeft >= maxScroll - 10) {
        testimonialSlider.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        testimonialSlider.scrollBy({ left: cardWidth, behavior: "smooth" });
      }
    }, 3000);
  }

  // --- Support Tab Navigation for Mobile ---
  const nextProc = document.querySelector(".next-proc");
  const prevProc = document.querySelector(".prev-proc");
  const nextMobile = document.querySelector(".next-mobile");
  const prevMobile = document.querySelector(".prev-mobile");

  function navigateProcess(direction) {
    const activeBtn = document.querySelector(".tab-btn.active");
    const allBtns = Array.from(document.querySelectorAll(".tab-btn"));
    const currentIndex = allBtns.indexOf(activeBtn);
    let nextIndex = currentIndex + direction;

    if (nextIndex >= 0 && nextIndex < allBtns.length) {
      allBtns[nextIndex].click();
      // Update Mobile Badge
      const stepNum = document.getElementById("mobile-step-num");
      const stepName = document.getElementById("mobile-step-name");
      if (stepNum) stepNum.textContent = nextIndex + 1;
      if (stepName) stepName.textContent = allBtns[nextIndex].textContent;
    }
  }

  nextProc?.addEventListener("click", () => navigateProcess(1));
  prevProc?.addEventListener("click", () => navigateProcess(-1));
  document.querySelector(".next-mobile")?.addEventListener("click", () => navigateProcess(1));
  document.querySelector(".prev-mobile")?.addEventListener("click", () => navigateProcess(-1));

  // --- Application Slider Logic (Restored) ---
  const appTrack = document.querySelector(".app-track");
  const appNext = document.querySelector(".next-app");
  const appPrev = document.querySelector(".prev-app");
  let appScrollAmount = 0;

  appNext?.addEventListener("click", () => {
    const card = appTrack.querySelector(".app-card");
    const cardWidth = card.offsetWidth + 32; // Card width + gap
    const maxScroll = appTrack.scrollWidth - appTrack.parentElement.offsetWidth;

    appScrollAmount = Math.min(appScrollAmount + cardWidth, maxScroll);
    appTrack.style.transform = `translateX(-${appScrollAmount}px)`;
  });

  appPrev?.addEventListener("click", () => {
    const card = appTrack.querySelector(".app-card");
    const cardWidth = card.offsetWidth + 32;

    appScrollAmount = Math.max(appScrollAmount - cardWidth, 0);
    appTrack.style.transform = `translateX(-${appScrollAmount}px)`;
  });

  // --- Scroll Reveal Animation Logic ---
  function initScrollReveal() {
    const revealElements = document.querySelectorAll(".reveal");

    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          // Optionally stop observing after trigger for performance
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));
  }

  initScrollReveal();

  // --- Modal Popup Logic ---
  const modal = document.getElementById("quote-modal");
  const closeBtn = document.getElementById("modal-close");
  const openBtns = Array.from(document.querySelectorAll("button, a")).filter(el =>
    el.textContent.trim().includes("Get Custom Quote") || el.classList.contains("pulse-btn")
  );

  const openModal = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  openBtns.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  }));

  closeBtn.addEventListener("click", closeModal);

  // Close on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on Escape key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) closeModal();
  });

  // Handle brochure form submission
  const brochureForm = document.getElementById("catalogue-form");
  brochureForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const btn = brochureForm.querySelector("button");
    btn.textContent = "Sending Catalogue...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
      btn.textContent = "Catalogue Sent Successfully!";
      btn.style.background = "#22C55E"; // Green success color
      btn.style.color = "white";

      setTimeout(() => {
        closeModal();
        // Reset form for next time
        brochureForm.reset();
        btn.textContent = "Download Brochure";
        btn.style.background = "#E2E8F0";
        btn.style.color = "#64748B";
        btn.style.opacity = "1";
      }, 2000);
    }, 1500);
  });

  // --- Request a Call Back Modal Logic ---
  const callbackModal = document.getElementById("callback-modal");
  const callbackCloseBtn = document.getElementById("callback-modal-close");

  // Trigger buttons: "Request a Quote", "Talk to an Expert", "Request Custom Quote" (contact form submit)
  const callbackTriggers = Array.from(document.querySelectorAll("button, a")).filter(el => {
    const txt = el.textContent.trim();
    return (
      txt.includes("Request a Quote") ||
      txt.includes("Talk to an Expert") ||
      txt.includes("Request Custom Quote")
    );
  });

  const openCallbackModal = () => {
    callbackModal.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeCallbackModal = () => {
    callbackModal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  callbackTriggers.forEach(btn => btn.addEventListener("click", (e) => {
    e.preventDefault();
    openCallbackModal();
  }));

  callbackCloseBtn.addEventListener("click", closeCallbackModal);

  callbackModal.addEventListener("click", (e) => {
    if (e.target === callbackModal) closeCallbackModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && callbackModal.classList.contains("active")) closeCallbackModal();
  });

  // Submit handler with success state
  const callbackForm = document.getElementById("callback-form");
  callbackForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const submitBtn = callbackForm.querySelector(".btn-callback-submit");
    submitBtn.textContent = "Submitting...";
    submitBtn.style.opacity = "0.7";

    setTimeout(() => {
      submitBtn.textContent = "✓ We'll Call You Back!";
      submitBtn.style.background = "#22C55E";
      submitBtn.style.opacity = "1";

      setTimeout(() => {
        closeCallbackModal();
        callbackForm.reset();
        submitBtn.textContent = "Submit Form";
        submitBtn.style.background = "#2B3990";
      }, 2000);
    }, 1500);
  });
});
