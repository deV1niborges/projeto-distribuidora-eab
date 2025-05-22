const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

document.querySelectorAll(".product-image").forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt || "";
  });
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target === closeModal) {
    modal.style.display = "none";
  }
});

// Animação quando os elementos entram na viewport
document.addEventListener("DOMContentLoaded", function () {
  const animateElements = document.querySelectorAll(
    ".animate-desktop, .animate-mobile"
  );

  function checkIfInView() {
    animateElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementBottom = element.getBoundingClientRect().bottom;

      // Verifica se o elemento está na viewport
      if (elementTop < window.innerHeight && elementBottom > 0) {
        element.classList.add("animated");
      }
    });
  }

  // Verifica na carga inicial
  checkIfInView();

  // Verifica durante o scroll
  window.addEventListener("scroll", checkIfInView);
});
