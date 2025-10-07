document.addEventListener("DOMContentLoaded", function () {
  // --- 1. Cursive Write-on Animation ---
  const nameSvg = document.getElementById("name-svg");
  if (sessionStorage.getItem("animationPlayed") === null) {
    setTimeout(() => {
      nameSvg.classList.add("visible");
      nameSvg.classList.add("animate");
      sessionStorage.setItem("animationPlayed", "true");
    }, 500); // Small delay to prevent animation from firing on browser refresh
  } else {
    nameSvg.classList.add("visible");
    // Set final state directly if animation has already played
    nameSvg.querySelectorAll(".name-text").forEach((text) => {
      text.style.strokeDashoffset = 0;
      text.style.fill = text.classList.contains("shekhawat-color")
        ? "#22d3ee"
        : "#e5e7eb";
    });
  }

  // --- 2. Geometric Background Animation ---
  const canvas = document.getElementById("geometric-background");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = 70;

  function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 1,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update particle positions
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 211, 238, 0.5)";
      ctx.fill();
    });

    // Draw lines between nearby particles
    ctx.beginPath();
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dist = Math.sqrt(
          (particles[i].x - particles[j].x) ** 2 +
            (particles[i].y - particles[j].y) ** 2
        );

        if (dist < 120) {
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
        }
      }
    }
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "rgba(34, 211, 238, 0.15)";
    ctx.stroke();

    requestAnimationFrame(draw);
  }

  setCanvasSize();
  createParticles();
  draw();

  window.addEventListener("resize", () => {
    setCanvasSize();
    createParticles(); // Recreate particles for new screen size
  });

  // --- 3. Scroll-triggered Animations ---
  const animatedElements = document.querySelectorAll(".animate-on-scroll");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("is-visible");
          }, delay * 1000);
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // --- Existing Functionality ---

  // Custom Cursor Logic
  const cursorDot = document.querySelector(".custom-cursor-dot");
  const cursorOutline = document.querySelector(".custom-cursor-outline");

  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate(
      {
        left: `${posX}px`,
        top: `${posY}px`,
      },
      {
        duration: 500,
        fill: "forwards",
      }
    );
  });

  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Close mobile menu when a link is clicked
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
});
