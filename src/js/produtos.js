// PRODUTOS.JS - VERSÃO OTIMIZADA

const ProductGallery = (() => {
  // Configuração dos sliders
  const SLIDER_CONFIG = [
    {
      selector: ".product-gallery-slider",
      wrapper: ".product-gallery-slider-wrapper",
      arrows: {
        left: ".slider-arrow.left",
        right: ".slider-arrow.right"
      }
    },
    {
      selector: ".apetit-gallery-slider",
      wrapper: ".apetit-slider-wrapper",
      arrows: {
        left: ".apetit-arrow-left",
        right: ".apetit-arrow-right"
      }
    },
    {
      selector: ".outros-gallery-slider",
      wrapper: ".outros-slider-wrapper",
      arrows: {
        left: ".outros-arrow-left",
        right: ".outros-arrow-right"
      }
    }
  ];

  // Estado dos sliders
  const sliderState = new Map();
  let isDesktop = null;

  // Inicialização
  function init() {
    checkViewport();
    window.addEventListener("resize", debounce(checkViewport, 100));
    setupProductModal();
  }

  // Verifica o viewport e configura os sliders
  function checkViewport() {
    const desktop = window.innerWidth >= 1200;
    if (desktop !== isDesktop) {
      isDesktop = desktop;
      SLIDER_CONFIG.forEach(config => setupSlider(config, isDesktop));
    }
  }

  // Configura um slider específico
  function setupSlider(config, desktop) {
    const slider = document.querySelector(config.selector);
    const wrapper = document.querySelector(config.wrapper);
    const left = document.querySelector(config.arrows.left);
    const right = document.querySelector(config.arrows.right);
    
    if (!slider || !wrapper) return;
    
    cleanupSlider(slider);

    if (desktop) {
      slider.scrollLeft = 0;
      slider.style.overflowX = "visible";
      slider.style.cursor = "default";
      if (left) left.style.display = "none";
      if (right) right.style.display = "none";
      sliderState.set(slider, { left, right, handlers: {} });
      return;
    }

    slider.style.overflowX = "auto";
    slider.style.cursor = "grab";
    if (left) left.style.display = "flex";
    if (right) right.style.display = "flex";

    let isDown = false, startX = 0, scrollLeftVal = 0;
    
    const handlers = {
      leftClick: () => scrollSlider(slider, -1),
      rightClick: () => scrollSlider(slider, 1),
      updateArrows: () => updateArrows(slider, left, right),
      mouseDown: (e) => {
        isDown = true;
        slider.classList.add("dragging");
        startX = e.pageX - slider.offsetLeft;
        scrollLeftVal = slider.scrollLeft;
      },
      mouseLeave: () => (isDown = false),
      mouseUp: () => (isDown = false),
      mouseMove: (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.2;
        slider.scrollLeft = scrollLeftVal - walk;
        updateArrows(slider, left, right);
      },
      touchStart: (e) => {
        isDown = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeftVal = slider.scrollLeft;
      },
      touchEnd: () => (isDown = false),
      touchMove: (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.2;
        slider.scrollLeft = scrollLeftVal - walk;
        updateArrows(slider, left, right);
      }
    };

    if (left) left.addEventListener("click", handlers.leftClick);
    if (right) right.addEventListener("click", handlers.rightClick);
    slider.addEventListener("scroll", handlers.updateArrows);
    slider.addEventListener("mousedown", handlers.mouseDown);
    slider.addEventListener("mouseleave", handlers.mouseLeave);
    slider.addEventListener("mouseup", handlers.mouseUp);
    slider.addEventListener("mousemove", handlers.mouseMove);
    slider.addEventListener("touchstart", handlers.touchStart);
    slider.addEventListener("touchend", handlers.touchEnd);
    slider.addEventListener("touchmove", handlers.touchMove);
    
    sliderState.set(slider, { left, right, handlers });
    updateArrows(slider, left, right);
  }

  // Configura o modal de produtos
  function setupProductModal() {
    const modal = new bootstrap.Modal(document.getElementById('imageGalleryModal'));
    const carousel = new bootstrap.Carousel(document.getElementById('carouselGallery'));
    
    document.querySelectorAll('.gallery-item img').forEach((img, index) => {
      img.addEventListener('click', () => {
        modal.show();
        carousel.to(index);
      });
    });
  }

  // Funções auxiliares
  function scrollSlider(slider, direction) {
    const item = slider.querySelector(".gallery-item");
    const itemWidth = item ? item.offsetWidth + 20 : 200;
    slider.scrollBy({ left: direction * itemWidth * 2, behavior: "smooth" });
  }

  function updateArrows(slider, left, right) {
    if (!slider || !left || !right) return;
    
    const maxScroll = slider.scrollWidth - slider.offsetWidth;
    left.disabled = slider.scrollLeft <= 5;
    right.disabled = slider.scrollLeft >= maxScroll - 5;
  }

  function cleanupSlider(slider) {
    const state = sliderState.get(slider);
    if (!state) return;
    
    const { left, right, handlers } = state;
    if (left && handlers.leftClick) left.removeEventListener("click", handlers.leftClick);
    if (right && handlers.rightClick) right.removeEventListener("click", handlers.rightClick);
    
    slider.removeEventListener("scroll", handlers.updateArrows);
    slider.removeEventListener("mousedown", handlers.mouseDown);
    slider.removeEventListener("mouseleave", handlers.mouseLeave);
    slider.removeEventListener("mouseup", handlers.mouseUp);
    slider.removeEventListener("mousemove", handlers.mouseMove);
    slider.removeEventListener("touchstart", handlers.touchStart);
    slider.removeEventListener("touchend", handlers.touchEnd);
    slider.removeEventListener("touchmove", handlers.touchMove);
    
    sliderState.delete(slider);
  }

  function debounce(func, wait) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(func, wait);
    };
  }

  return { init };
})();

// Inicialização quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  ProductGallery.init();
  
  // Observer para conteúdo dinâmico
  const observer = new MutationObserver(() => {
    ProductGallery.init();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// Animação de revelação
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.hidden');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
};

document.addEventListener("DOMContentLoaded", animateOnScroll);
window.addEventListener("load", animateOnScroll);