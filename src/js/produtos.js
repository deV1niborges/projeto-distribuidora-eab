document.addEventListener("DOMContentLoaded", function () {
  function setupCarousel(carouselClass, prevClass, nextClass) {
    const carousel = document.querySelector(carouselClass);
    const prevBtn = document.querySelector(prevClass);
    const nextBtn = document.querySelector(nextClass);
    if (!carousel || !prevBtn || !nextBtn) return;
    let scrollAmount =
      carousel.querySelector(".carousel-item")?.offsetWidth ||
      carousel.offsetWidth;
    let isScrolling = false;

    function scrollToItem(direction) {
      if (isScrolling) return;
      isScrolling = true;
      const scrollOptions = {
        left: direction * scrollAmount,
        behavior: "smooth",
      };
      carousel.scrollBy(scrollOptions);
      setTimeout(() => {
        isScrolling = false;
      }, 420); // tempo igual ao transition do CSS
    }

    prevBtn.addEventListener("click", () => scrollToItem(-1));
    nextBtn.addEventListener("click", () => scrollToItem(1));
    window.addEventListener("resize", () => {
      scrollAmount =
        carousel.querySelector(".carousel-item")?.offsetWidth ||
        carousel.offsetWidth;
    });
  }
  setupCarousel(".carousel-gulao", ".prev-gulao", ".next-gulao");
  setupCarousel(".carousel-apetit", ".prev-apetit", ".next-apetit");
  setupCarousel(".carousel-outros", ".prev-outros", ".next-outros");

  // Animação para títulos das linhas e imagens dos produtos SOMENTE em telas até 767px
  if (window.innerWidth <= 767) {
    const lines = document.querySelectorAll(".line");
    const items = document.querySelectorAll(".carousel-item");
    const animatedUp = document.querySelectorAll(".animate-up");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    lines.forEach((line) => observer.observe(line));
    items.forEach((item) => observer.observe(item));
    animatedUp.forEach((el) => observer.observe(el));
  }

  // Animação exclusiva para desktop (mínimo 768px)
  if (window.innerWidth >= 768) {
    const linesDesktop = document.querySelectorAll(".line");
    const itemsDesktop = document.querySelectorAll(".carousel-item");
    const animatedUpDesktop = document.querySelectorAll(".animate-up-desktop");
    const observerDesktop = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    linesDesktop.forEach((el) => observerDesktop.observe(el));
    itemsDesktop.forEach((el) => observerDesktop.observe(el));
    animatedUpDesktop.forEach((el) => observerDesktop.observe(el));
  }
});
