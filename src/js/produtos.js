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

// --- SLIDERS RESPONSIVOS: GRID EM TELAS GRANDES, SLIDER EM TELAS PEQUENAS ---
function setupResponsiveSliders() {
  // Seleciona todos os sliders e setas de cada grupo
  const sliderGroups = [
    {
      slider: document.querySelector(".product-gallery-slider"),
      left: document.querySelector(
        ".product-gallery-slider-wrapper > .slider-arrow.left"
      ),
      right: document.querySelector(
        ".product-gallery-slider-wrapper > .slider-arrow.right"
      ),
    },
    {
      slider: document.querySelector(".apetit-gallery-slider"),
      left: document.querySelector(
        ".apetit-slider-wrapper > .slider-arrow.left"
      ),
      right: document.querySelector(
        ".apetit-slider-wrapper > .slider-arrow.right"
      ),
    },
    {
      slider: document.querySelector(".outros-gallery-slider"),
      left: document.querySelector(
        ".outros-slider-wrapper > .slider-arrow.left"
      ),
      right: document.querySelector(
        ".outros-slider-wrapper > .slider-arrow.right"
      ),
    },
  ];

  function clearSliderEvents(slider, left, right) {
    if (!slider) return;
    const newSlider = slider.cloneNode(true);
    slider.parentNode.replaceChild(newSlider, slider);
    if (left) {
      const newLeft = left.cloneNode(true);
      left.parentNode.replaceChild(newLeft, left);
    }
    if (right) {
      const newRight = right.cloneNode(true);
      right.parentNode.replaceChild(newRight, right);
    }
  }

  function enableSlider(slider, left, right) {
    if (!slider || !left || !right) return;
    // Scroll
    function scrollSlider(direction) {
      const item = slider.querySelector(".gallery-item");
      const itemWidth = item
        ? item.offsetWidth + parseInt(getComputedStyle(item).marginRight || 0)
        : 200;
      const scrollAmount = Math.max(slider.offsetWidth * 0.7, itemWidth);
      slider.scrollBy({ left: direction * scrollAmount, behavior: "smooth" });
    }
    // Setas
    function updateArrows() {
      const maxScroll = slider.scrollWidth - slider.offsetWidth;
      const hasOverflow = slider.scrollWidth > slider.offsetWidth + 5;
      left.disabled = !hasOverflow || slider.scrollLeft <= 5;
      right.disabled = !hasOverflow || slider.scrollLeft >= maxScroll - 5;
    }
    left.addEventListener("click", function (e) {
      e.preventDefault();
      scrollSlider(-1);
      updateArrows();
      setTimeout(updateArrows, 600);
    });
    right.addEventListener("click", function (e) {
      e.preventDefault();
      scrollSlider(1);
      updateArrows();
      setTimeout(updateArrows, 600);
    });
    slider.addEventListener("scroll", updateArrows);
    window.addEventListener("resize", updateArrows);
    updateArrows();
    // Drag/touch
    let isDown = false,
      startX,
      scrollLeftVal;
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("dragging");
      startX = e.pageX - slider.offsetLeft;
      scrollLeftVal = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("dragging");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("dragging");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeftVal - walk;
      updateArrows();
    });
    slider.addEventListener("touchstart", (e) => {
      isDown = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeftVal = slider.scrollLeft;
    });
    slider.addEventListener("touchend", () => {
      isDown = false;
    });
    slider.addEventListener("touchmove", (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeftVal - walk;
      updateArrows();
    });
  }

  function disableSlider(slider, left, right) {
    if (!slider) return;
    slider.scrollLeft = 0;
    if (left) left.disabled = true;
    if (right) right.disabled = true;
  }

  sliderGroups.forEach(({ slider, left, right }) => {
    clearSliderEvents(slider, left, right);
  });

  if (window.innerWidth >= 1200) {
    sliderGroups.forEach(({ slider, left, right }) => {
      disableSlider(slider, left, right);
    });
  } else {
    sliderGroups.forEach(({ slider, left, right }) => {
      enableSlider(slider, left, right);
    });
  }
}

window.addEventListener("resize", setupResponsiveSliders);
window.addEventListener("DOMContentLoaded", setupResponsiveSliders);
setupResponsiveSliders();

// --- MODAL DINÂMICO ---
const carouselInner = document.querySelector(
  "#carouselGallery .carousel-inner"
);
const gulaoImgs = [
  {
    src: "src/assets/img/novidades-produtos/Gulao_120g_QueijoSuico_png-min.png",
    alt: "Produto 1",
  },
  {
    src: "src/assets/img/novidades-produtos/Gulao_180g_CebolaeSalsa_png.png",
    alt: "Produto 2",
  },
  {
    src: "src/assets/img/novidades-produtos/Gulao_180g_Churrasco_png.png",
    alt: "Produto 3",
  },
  {
    src: "src/assets/img/novidades-produtos/Gulao_180g_Presunto_png.png",
    alt: "Produto 4",
  },
  {
    src: "src/assets/img/novidades-produtos/Gulao_180g_Requeijao_png.png",
    alt: "Produto 5",
  },
];
const apetitImgs = [
  {
    src: "src/assets/img/novidades-produtos/salgadinho-apetit-sabor-bacon-100g.jpg",
    alt: "Salgadinho Apetit Bacon 100g",
  },
  {
    src: "src/assets/img/novidades-produtos/salgadinho-apetit-sabor-churrasco-100g.jpg",
    alt: "Salgadinho Apetit Churrasco 100g",
  },
  {
    src: "src/assets/img/novidades-produtos/salgadinho-apetit-sabor-queijo-100g.jpg",
    alt: "Salgadinho Apetit Queijo 100g",
  },
  {
    src: "src/assets/img/novidades-produtos/salgadinho-apetit-sabor-pimentinha-100g.jpg",
    alt: "Salgadinho Apetit Pimentinha 100g",
  },
  {
    src: "src/assets/img/novidades-produtos/salgadinho-pimentinha-apetit.jpg",
    alt: "Salgadinho Pimentinha Apetit",
  },
  {
    src: "src/assets/img/novidades-produtos/salgadinho-de-trigo-sabor-barbecue.jpg",
    alt: "Salgadinho de Trigo Barbecue Apetit",
  },
  {
    src: "src/assets/img/novidades-produtos/salgadinho-de-trigo-sabor-costelinha-com-limao-apetitos-55g.jpg",
    alt: "Salgadinho de Trigo Costelinha com Limão Apetitos 55g",
  },
];
const outrosImgs = [
  {
    src: "src/assets/img/novidades-produtos/biscoito-escaldado-crocante-150g.jpg",
    alt: "Biscoito Escaldado Crocante 150g",
  },
  {
    src: "src/assets/img/novidades-produtos/biscoito-sequinho-sabor-leite---vovo-clara.jpg",
    alt: "Biscoito Sequinho Sabor Leite Vovó Clara",
  },
  {
    src: "src/assets/img/novidades-produtos/broinha-de-fuba.jpg",
    alt: "Broinha de Fubá",
  },
  {
    src: "src/assets/img/novidades-produtos/4983632931201331700.jpg",
    alt: "Produto Diverso 1",
  },
  {
    src: "src/assets/img/novidades-produtos/4983632931201331706.jpg",
    alt: "Produto Diverso 2",
  },
  {
    src: "src/assets/img/novidades-produtos/4983632931201331707.jpg",
    alt: "Produto Diverso 3",
  },
  {
    src: "src/assets/img/novidades-produtos/4983632931201331709.jpg",
    alt: "Produto Diverso 4",
  },
  {
    src: "src/assets/img/novidades-produtos/sequinho-tradicional2.jpg",
    alt: "Sequinho Tradicional",
  },
];

[...document.querySelectorAll(".gallery-item img")].forEach((img) => {
  img.addEventListener("click", function () {
    let parentSlider = "gulao";
    if (this.closest(".apetit-gallery-slider")) parentSlider = "apetit";
    if (this.closest(".outros-gallery-slider")) parentSlider = "outros";
    const idx = parseInt(this.getAttribute("data-index"), 10) || 0;
    let imgs = gulaoImgs;
    if (parentSlider === "apetit") imgs = apetitImgs;
    if (parentSlider === "outros") imgs = outrosImgs;
    let html = "";
    imgs.forEach((img, i) => {
      html += `<div class="carousel-item${
        i === idx ? " active" : ""
      }">\n      <img src="${img.src}" class="d-block w-100" alt="${
        img.alt
      }" />\n    </div>`;
    });
    carouselInner.innerHTML = html;
  });
});

// Adiciona animação de entrada (reveal) aos wrappers dos sliders de produtos
// ATENÇÃO: Este bloco só manipula .hidden/.show nos wrappers dos sliders, nunca .hidden-on-load/.reveal
const sliderWrappers = document.querySelectorAll(
  ".product-gallery-slider-wrapper, .apetit-slider-wrapper, .outros-slider-wrapper"
);

sliderWrappers.forEach((wrapper) => {
  // Garante que não há .hidden-on-load ou .reveal nos wrappers dos sliders
  wrapper.classList.remove("hidden-on-load", "reveal", "revealed-once");
  wrapper.classList.add("hidden");
});

if (window.innerWidth > 768) {
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
  sliderWrappers.forEach((el) => observer.observe(el));
} else {
  sliderWrappers.forEach((el) => el.classList.remove("hidden"));
}
