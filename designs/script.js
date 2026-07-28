import * as THREE from "./vendor/three.module.min.js";

const gsap = window.gsap;

/* ---------- VideoIntro: fade-in + slow Ken Burns zoom ---------- */

function initVideoIntro() {
  const root = document.getElementById("videoIntro");
  const foreground = document.getElementById("foregroundLayer");

  gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: "power2.out" });

  gsap.fromTo(
    foreground,
    { scale: 1 },
    { scale: 1.035, duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 }
  );
}

/* ---------- HeroContent: staggered GSAP entrance ---------- */

function initHeroContent() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.35 });

  tl.fromTo(".tagline", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.9 })
    .fromTo(
      ".name-line",
      { opacity: 0, y: 60, filter: "blur(6px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.1, stagger: 0.14 },
      "-=0.55"
    )
    .fromTo(".subtitle", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.5");
}

/* ---------- ScrollIndicator ---------- */

function initScrollIndicator() {
  const button = document.getElementById("scrollIndicator");
  button.addEventListener("click", () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  });
}

/* ---------- Header: scroll-based glass, nav clicks, mobile menu ---------- */

function initHeader() {
  const logo = document.getElementById("logo");
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    closeMenu();
  };

  const openMenu = () => {
    menuToggle.classList.add("open");
    mobileMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    menuToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = "";
  };

  menuToggle.addEventListener("click", () => {
    if (mobileMenu.classList.contains("open")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  logo.addEventListener("click", () => goTo("home"));

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      goTo(link.dataset.target);
    });
  });
}

/* ---------- CinematicLayer: warm bokeh particle field ---------- */

const PARTICLE_COUNT = 110;
const EMBER_COLOR = new THREE.Color("#ff8a3d");
const WHITE_COLOR = new THREE.Color("#fff3e6");

function createBokehTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.55)");
  gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.12)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function initCinematicLayer() {
  const container = document.getElementById("cinematicLayer");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 50);
  camera.position.z = 12;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const texture = createBokehTexture();

  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const sizes = new Float32Array(PARTICLE_COUNT);
  const basePositions = new Float32Array(PARTICLE_COUNT * 3);
  const phases = new Float32Array(PARTICLE_COUNT);
  const speeds = new Float32Array(PARTICLE_COUNT);
  const drifts = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = (Math.random() - 0.5) * 18;
    const y = (Math.random() - 0.5) * 12;
    const z = (Math.random() - 0.5) * 10 - 2;

    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    basePositions[i * 3] = x;
    basePositions[i * 3 + 1] = y;
    basePositions[i * 3 + 2] = z;

    const mix = Math.random();
    const color = EMBER_COLOR.clone().lerp(WHITE_COLOR, mix * 0.7 + 0.15);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    sizes[i] = 0.4 + Math.random() * 1.6;
    phases[i] = Math.random() * Math.PI * 2;
    speeds[i] = 0.15 + Math.random() * 0.25;
    drifts[i] = 0.3 + Math.random() * 0.6;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    size: 0.55,
    map: texture,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geometry, material);
  scene.add(points);

  const pointer = { x: 0, y: 0 };
  const targetCamera = { x: 0, y: 0 };

  const handlePointerMove = (event) => {
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (event.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener("pointermove", handlePointerMove, { passive: true });

  const resize = () => {
    const { clientWidth, clientHeight } = container;
    camera.aspect = clientWidth / Math.max(clientHeight, 1);
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight, false);
  };
  resize();

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  let frameId = 0;
  let isVisible = true;
  const handleVisibility = () => {
    isVisible = document.visibilityState === "visible";
    if (isVisible && !reduceMotion) {
      frameId = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(frameId);
    }
  };
  document.addEventListener("visibilitychange", handleVisibility);

  const clock = new THREE.Clock();
  const posAttr = geometry.getAttribute("position");

  function animate() {
    if (!isVisible) return;
    const elapsed = clock.getElapsedTime();

    const posArray = posAttr.array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const bx = basePositions[i * 3];
      const by = basePositions[i * 3 + 1];
      const bz = basePositions[i * 3 + 2];
      const phase = phases[i];
      const speed = speeds[i];
      const drift = drifts[i];

      posArray[i * 3] = bx + Math.sin(elapsed * speed * 0.5 + phase) * drift;
      posArray[i * 3 + 1] = by + Math.sin(elapsed * speed + phase) * drift * 1.4;
      posArray[i * 3 + 2] = bz + Math.cos(elapsed * speed * 0.4 + phase) * drift;
    }
    posAttr.needsUpdate = true;

    targetCamera.x += (pointer.x * 0.8 - targetCamera.x) * 0.03;
    targetCamera.y += (-pointer.y * 0.5 - targetCamera.y) * 0.03;
    camera.position.x = targetCamera.x;
    camera.position.y = targetCamera.y;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }

  frameId = requestAnimationFrame(animate);
  if (reduceMotion) {
    cancelAnimationFrame(frameId);
    renderer.render(scene, camera);
  }
}

initVideoIntro();
initHeroContent();
initScrollIndicator();
initCinematicLayer();
initHeader();
