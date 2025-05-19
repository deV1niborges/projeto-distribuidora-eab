document.addEventListener("DOMContentLoaded", function () {
  function setupCarousel(carouselClass, prevClass, nextClass) {
    const carousel = document.querySelector(carouselClass);
    const prevBtn = document.querySelector(prevClass);
    const nextBtn = document.querySelector(nextClass);
    if (!carousel || !prevBtn || !nextBtn) return;
    let scrollAmount = carousel.offsetWidth;
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
    window.addEventListener("resize", () => {
      scrollAmount = carousel.offsetWidth;
    });
  }
  setupCarousel(".carousel-gulao", ".prev-gulao", ".next-gulao");
  setupCarousel(".carousel-apetit", ".prev-apetit", ".next-apetit");
  setupCarousel(".carousel-outros", ".prev-outros", ".next-outros");
});
