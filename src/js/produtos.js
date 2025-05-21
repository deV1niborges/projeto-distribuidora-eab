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
