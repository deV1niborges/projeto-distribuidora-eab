const elementos = document.querySelectorAll(".animar");

const animarEntrada = () => {
  elementos.forEach((el, i) => {
    const top = el.getBoundingClientRect().top;
    const visivel = window.innerHeight;

    if (top < visivel - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0) scale(1)";
      el.style.transitionDelay = `${i * 0.2}s`;
    }
  });
};

window.addEventListener("scroll", animarEntrada);
window.addEventListener("load", animarEntrada);

// Partículas animadas simples (opcional, só para dar mais vibe)
// Adicione esse script antes de fechar </body> se quiser a vibe futurista

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "0";
document.querySelector(".footer").appendChild(canvas);

let width, height;
function resize() {
  width = canvas.width = canvas.clientWidth;
  height = canvas.height = canvas.clientHeight;
}
resize();
window.addEventListener("resize", resize);

const particles = [];
const maxParticles = 40;

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 3 + 1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
      this.reset();
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 231, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < maxParticles; i++) {
  particles.push(new Particle());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animate);
}
animate();

// Canvas partículas na section contato (canvas já está no HTML)
const canvasContato = document.getElementById("particulas");
const ctxContato = canvasContato.getContext("2d");

let w, h;
function resizeContato() {
  w = canvasContato.width = canvasContato.clientWidth;
  h = canvasContato.height = canvasContato.clientHeight;
}
resizeContato();
window.addEventListener("resize", resizeContato);

class ParticleContato {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5) * 0.2;
    this.speedY = (Math.random() - 0.5) * 0.2;
    this.opacity = Math.random() * 0.6 + 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
      this.reset();
    }
  }
  draw() {
    ctxContato.beginPath();
    ctxContato.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctxContato.fillStyle = `rgba(0, 255, 231, ${this.opacity})`;
    ctxContato.shadowColor = "rgba(0, 255, 231, 0.7)";
    ctxContato.shadowBlur = 8;
    ctxContato.fill();
  }
}

const particlesContato = [];
const maxParticlesContato = 60;
for (let i = 0; i < maxParticlesContato; i++) {
  particlesContato.push(new ParticleContato());
}

function animateContato() {
  ctxContato.clearRect(0, 0, w, h);
  particlesContato.forEach((p) => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateContato);
}
animateContato();
