document.addEventListener("DOMContentLoaded", function () {
  // Carrossel horizontal dos produtos principais (não do modal)
  // Permite rolar os produtos para esquerda/direita com botões
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
  setupCarousel(".carousel-ruppers", ".prev-ruppers", ".next-ruppers");

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

  // Modal carrossel ampliado para cada linha
  function setupModalCarouselAmpliado(
    modalId,
    carouselSelector,
    itemSelector,
    prevBtnSelector,
    nextBtnSelector
  ) {
    const modal = document.getElementById(modalId);
    const carousel = modal.querySelector(carouselSelector);
    const items = Array.from(carousel.querySelectorAll(itemSelector));
    const prevBtn = modal.querySelector(prevBtnSelector);
    const nextBtn = modal.querySelector(nextBtnSelector);
    const closeBtn = modal.querySelector(".close-modal");
    let currentIndex = 0;

    function showItem(index) {
      items.forEach((item, i) => {
        item.style.display = i === index ? "flex" : "none";
      });
    }

    function openModal(startIndex = 0) {
      modal.classList.add("ativo");
      currentIndex = startIndex;
      showItem(currentIndex);
      document.body.style.overflow = "hidden";
    }

    function closeModal() {
      modal.classList.remove("ativo");
      document.body.style.overflow = "";
    }

    function next() {
      currentIndex = (currentIndex + 1) % items.length;
      showItem(currentIndex);
    }

    function prev() {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showItem(currentIndex);
    }

    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);
    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });

    // Retorna função para abrir modal externamente
    return openModal;
  }

  // Setup para cada linha
  const openModalGulao = setupModalCarouselAmpliado(
    "modal-gulao",
    ".carousel-modal-gulao",
    ".carousel-item-modal",
    ".prev-modal-gulao",
    ".next-modal-gulao"
  );
  const openModalApetit = setupModalCarouselAmpliado(
    "modal-apetit",
    ".carousel-modal-apetit",
    ".carousel-item-modal",
    ".prev-modal-apetit",
    ".next-modal-apetit"
  );
  const openModalOutros = setupModalCarouselAmpliado(
    "modal-outros",
    ".carousel-modal-outros",
    ".carousel-item-modal",
    ".prev-modal-outros",
    ".next-modal-outros"
  );
  const openModalRuppers = setupModalCarouselAmpliado(
    "modal-ruppers",
    ".carousel-modal-ruppers",
    ".carousel-item-modal",
    ".prev-modal-ruppers",
    ".next-modal-ruppers"
  );

  // Clique nas imagens dos carrosseis principais para abrir o modal correspondente
  function setupOpenModalOnImage(carouselSelector, openModalFn) {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;
    const imgs = Array.from(carousel.querySelectorAll("img"));
    imgs.forEach((img, idx) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", () => openModalFn(idx));
    });
  }
  setupOpenModalOnImage(".carousel-gulao", openModalGulao);
  setupOpenModalOnImage(".carousel-apetit", openModalApetit);
  setupOpenModalOnImage(".carousel-outros", openModalOutros);
  setupOpenModalOnImage(".carousel-ruppers", openModalRuppers);

  // Adiciona suporte a swipe/touch nos carrosseis ampliados do modal
  function addSwipeToCarousel(carouselSelector, nextFn, prevFn) {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;
    let startX = 0;
    let isMoving = false;

    carousel.addEventListener("touchstart", function (e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        isMoving = true;
      }
    });
    carousel.addEventListener("touchmove", function (e) {
      if (!isMoving) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) {
          nextFn();
        } else {
          prevFn();
        }
        isMoving = false;
      }
    });
    carousel.addEventListener("touchend", function () {
      isMoving = false;
    });
  }
  // Integrar swipe aos modais ampliados
  addSwipeToCarousel(
    ".carousel-modal-gulao",
    () => openModalGulao(currentIndexGulao + 1),
    () => openModalGulao(currentIndexGulao - 1)
  );
  addSwipeToCarousel(
    ".carousel-modal-apetit",
    () => openModalApetit(currentIndexApetit + 1),
    () => openModalApetit(currentIndexApetit - 1)
  );
  addSwipeToCarousel(
    ".carousel-modal-outros",
    () => openModalOutros(currentIndexOutros + 1),
    () => openModalOutros(currentIndexOutros - 1)
  );
  addSwipeToCarousel(
    ".carousel-modal-ruppers",
    () => openModalRuppers(currentIndexRuppers + 1),
    () => openModalRuppers(currentIndexRuppers - 1)
  );

  // Adiciona suporte a swipe/touch nos carrosseis principais
  function addSwipeToMainCarousel(
    carouselSelector,
    nextBtnSelector,
    prevBtnSelector
  ) {
    const carousel = document.querySelector(carouselSelector);
    const nextBtn = document.querySelector(nextBtnSelector);
    const prevBtn = document.querySelector(prevBtnSelector);
    if (!carousel || !nextBtn || !prevBtn) return;
    let startX = 0;
    let isMoving = false;

    carousel.addEventListener("touchstart", function (e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        isMoving = true;
      }
    });
    carousel.addEventListener("touchmove", function (e) {
      if (!isMoving) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) {
          nextBtn.click();
        } else {
          prevBtn.click();
        }
        isMoving = false;
      }
    });
    carousel.addEventListener("touchend", function () {
      isMoving = false;
    });
  }
  addSwipeToMainCarousel(".carousel-gulao", ".next-gulao", ".prev-gulao");
  addSwipeToMainCarousel(".carousel-apetit", ".next-apetit", ".prev-apetit");
  addSwipeToMainCarousel(".carousel-outros", ".next-outros", ".prev-outros");
  addSwipeToMainCarousel(".carousel-ruppers", ".next-ruppers", ".prev-ruppers");

  // Adiciona suporte a swipe/touch nos carrosseis ampliados dos modais
  function addSwipeToModalCarousel(carouselSelector, nextFn, prevFn) {
    const carousel = document.querySelector(carouselSelector);
    if (!carousel) return;
    let startX = 0;
    let isMoving = false;

    carousel.addEventListener("touchstart", function (e) {
      if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        isMoving = true;
      }
    });
    carousel.addEventListener("touchmove", function (e) {
      if (!isMoving) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 40) {
        if (dx < 0) {
          nextFn();
        } else {
          prevFn();
        }
        isMoving = false;
      }
    });
    carousel.addEventListener("touchend", function () {
      isMoving = false;
    });
  }
  // Funções para navegação dos modais ampliados
  let currentIndexGulao = 0,
    currentIndexApetit = 0,
    currentIndexOutros = 0,
    currentIndexRuppers = 0;
  function nextGulao() {
    openModalGulao(++currentIndexGulao);
  }
  function prevGulao() {
    openModalGulao(--currentIndexGulao);
  }
  function nextApetit() {
    openModalApetit(++currentIndexApetit);
  }
  function prevApetit() {
    openModalApetit(--currentIndexApetit);
  }
  function nextOutros() {
    openModalOutros(++currentIndexOutros);
  }
  function prevOutros() {
    openModalOutros(--currentIndexOutros);
  }
  function nextRuppers() {
    openModalRuppers(++currentIndexRuppers);
  }
  function prevRuppers() {
    openModalRuppers(--currentIndexRuppers);
  }
  addSwipeToModalCarousel(".carousel-modal-gulao", nextGulao, prevGulao);
  addSwipeToModalCarousel(".carousel-modal-apetit", nextApetit, prevApetit);
  addSwipeToModalCarousel(".carousel-modal-outros", nextOutros, prevOutros);
  addSwipeToModalCarousel(".carousel-modal-ruppers", nextRuppers, prevRuppers);
});
