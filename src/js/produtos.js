document.addEventListener("DOMContentLoaded", () => {
  if (window.location.hash) {
    return;
  }

  if (window.innerWidth <= 768) {
    document
      .querySelectorAll(".hidden")
      .forEach((el) => el.classList.remove("hidden"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((el) => observer.observe(el));
});
