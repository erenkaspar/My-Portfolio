function setCurrentYear() {
  for (const el of document.querySelectorAll("[data-current-year]")) {
    el.textContent = String(new Date().getFullYear());
  }
}

// background snow, color comes from --color-snow
function initSnow() {
  const canvas = document.querySelector("[data-snow]");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const ctx = canvas.getContext("2d");
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
  const AREA_PER_FLAKE = 14000; // lower = more snow
  const MAX_FLAKES = 140;

  let width = 0;
  let height = 0;
  let color = "";
  let flakes = [];

  const random = (min, max) => min + Math.random() * (max - min);

  const createFlake = (y = random(0, height)) => ({
    x: random(0, width),
    y,
    radius: random(0.6, 2.2),
    speed: random(0.25, 0.8),
    drift: random(0.2, 0.6),
    phase: random(0, Math.PI * 2),
    alpha: random(0.25, 0.7),
  });

  const readColor = () => {
    color = getComputedStyle(document.documentElement).getPropertyValue("--color-snow").trim();
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(MAX_FLAKES, Math.round((width * height) / AREA_PER_FLAKE));
    flakes = Array.from({ length: count }, (_, i) => flakes[i] ?? createFlake());
  };

  const draw = (time) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;

    for (const flake of flakes) {
      flake.y += flake.speed;
      flake.x += Math.sin(time / 1600 + flake.phase) * flake.drift * 0.4;

      if (flake.y - flake.radius > height) Object.assign(flake, createFlake(-flake.radius));
      if (flake.x > width + 5) flake.x = -5;
      if (flake.x < -5) flake.x = width + 5;

      ctx.globalAlpha = flake.alpha;
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  readColor();
  resize();
  window.addEventListener("resize", resize, { passive: true });
  colorScheme.addEventListener("change", readColor);
  requestAnimationFrame(draw);
}

setCurrentYear();
initSnow();
