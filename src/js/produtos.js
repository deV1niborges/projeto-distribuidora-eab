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
});
