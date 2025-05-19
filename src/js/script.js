const initScrollAnimations = () => {
  "use strict";

  const resetPage = () => {
    if (window.location.hash) {
      history.replaceState(null, null, " ");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });

    document
      .querySelectorAll(".hidden-on-load:not(.marquee-container)")
      .forEach((el) => {
        el.classList.remove("reveal", "revealed-once");
        void el.offsetWidth;
      });
  };

  const initMarquee = () => {
    const marquee = document.querySelector(".marquee-container");
    if (!marquee) return;

    const marqueeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");

            const track = entry.target.querySelector(".marquee-track");
            if (track) {
              track.style.animation = "none";
              void track.offsetWidth;
              track.style.animation = "scroll 20s linear infinite";
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px 100px 0px" }
    );

    marqueeObserver.observe(marquee);
  };

  const setupScrollAnimations = () => {
    const animatedElements = document.querySelectorAll(".hidden-on-load");

    // Se for tablet ou celular, revela os elementos imediatamente
    if (window.innerWidth <= 768) {
      animatedElements.forEach((el) => {
        el.classList.add("reveal", "revealed-once");
      });
      return null;
    }

    let lastScrollPos = window.pageYOffset;
    let ticking = false;

    const checkVisibility = () => {
      ticking = false;
      const scrollDir = window.pageYOffset > lastScrollPos ? "down" : "up";
      lastScrollPos = window.pageYOffset;

      const viewportHeight = window.innerHeight;
      const triggerPointTop = viewportHeight * 0.75;
      const triggerPointBottom = viewportHeight * 0.25;

      animatedElements.forEach((el) => {
        if (
          el.classList.contains("marquee-container") ||
          el.classList.contains("revealed-once")
        )
          return;

        const rect = el.getBoundingClientRect();
        const isVisible =
          (rect.top < triggerPointTop && rect.bottom > triggerPointBottom) ||
          (rect.height > viewportHeight && rect.bottom > triggerPointBottom);

        if (isVisible) {
          el.classList.add("reveal", "revealed-once");
        }
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkVisibility);
        ticking = true;
      }
    };

    checkVisibility();

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              entry.isIntersecting &&
              !entry.target.classList.contains("revealed-once")
            ) {
              entry.target.classList.add("reveal", "revealed-once");
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "0px 0px -25% 0px",
        }
      );

      animatedElements.forEach((el) => {
        if (!el.classList.contains("marquee-container")) {
          observer.observe(el);
        }
      });
    }

    return handleScroll;
  };

  const setupAnchorLinks = () => {
    document.body.addEventListener("click", (e) => {
      const anchorLink = e.target.closest('a[href^="#"]');
      if (!anchorLink) return;

      e.preventDefault();
      const targetId = anchorLink.getAttribute("href");

      if (targetId === "#") {
        resetPage();
        return;
      }

      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  const init = () => {
    const scrollHandler = setupScrollAnimations();

    if (scrollHandler) {
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    window.addEventListener("resize", () => {
      const newScrollHandler = setupScrollAnimations();
      if (newScrollHandler) {
        window.addEventListener("scroll", newScrollHandler, { passive: true });
      }
    });

    new MutationObserver(() => {
      const newScrollHandler = setupScrollAnimations();
      newScrollHandler && newScrollHandler();
      initMarquee();
    }).observe(document.body, { childList: true, subtree: true });

    const initialScrollHandler = setupScrollAnimations();
    initialScrollHandler && initialScrollHandler();

    initMarquee();
    setupAnchorLinks();
  };

  window.addEventListener("load", () => {
    window.scrollTo({ top: 0, behavior: "auto" }); // Garante reset no mobile
    resetPage();
    init();
  });

  window.addEventListener("pageshow", (e) => {
    if (e.persisted) {
      window.scrollTo({ top: 0, behavior: "auto" }); // Garante reset no mobile
      resetPage();
      init();
    }
  });
};

document.addEventListener("DOMContentLoaded", initScrollAnimations);

// Menu mobile
const menuToggle = document.getElementById("menuToggle");
const menuOverlay = document.getElementById("menuOverlay");
const mainMenu = document.getElementById("mainMenu");
const body = document.body;

menuToggle.addEventListener("click", function () {
  body.classList.toggle("menu-open");

  if (body.classList.contains("menu-open")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

const menuLinks = document.querySelectorAll(".menu a");
menuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    body.classList.remove("menu-open");
    document.body.style.overflow = "";
  });
});
