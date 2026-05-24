import { mountAurora } from "./aurora.js";
import {
  initTicker,
  initHeroRotator,
  initScrollProgress,
  initThemeToggle,
  initCounters,
  initManifesto,
  initArchetypes,
  initWall,
  initQuiz,
  initViolationForm,
  initChaiTimer,
  initTools,
  initDiagnosis,
  initMembership,
  initInteractiveFooter,
  initBottomNav,
  initReveals
} from "./features.js";

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion) {
  try {
    mountAurora(document.querySelector("#aurora"), {
      colorStops: ["#b7ff37", "#2f7dff", "#ff3b30"],
      blend: 0.42,
      amplitude: 0.9,
      speed: 0.5
    });
    document.documentElement.classList.add("aurora-ready");
  } catch (error) {
    console.warn("Aurora fallback active.", error);
    document.documentElement.classList.add("aurora-fallback");
  }
} else {
  document.documentElement.classList.add("aurora-fallback");
}

const glitchBox = document.querySelector(".glitch-box");
if (glitchBox && !reducedMotion) {
  setInterval(() => {
    glitchBox.classList.add("glitch");
    setTimeout(() => glitchBox.classList.remove("glitch"), 160);
  }, 3200);
}

document.addEventListener("pointermove", (e) => {
  if (reducedMotion) return;
  document.documentElement.style.setProperty("--mx", `${Math.round((e.clientX / window.innerWidth) * 100)}%`);
  document.documentElement.style.setProperty("--my", `${Math.round((e.clientY / window.innerHeight) * 100)}%`);
});

document.querySelectorAll(".meter span[data-meter]").forEach((meter) => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const w = entry.target.dataset.meter;
      entry.target.style.width = `${w}%`;
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  obs.observe(meter);
});

const navLinks = [...document.querySelectorAll("nav a[data-nav]")];
const navSections = navLinks.map((l) => document.getElementById(l.dataset.nav)).filter(Boolean);
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle("is-active", link.dataset.nav === entry.target.id));
  });
}, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });
navSections.forEach((s) => navObserver.observe(s));

document.querySelectorAll(".faq-list button").forEach((button) => {
  button.addEventListener("click", () => {
    const open = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!open));
  });
});

initTicker();
initHeroRotator();
initScrollProgress();
initThemeToggle();
initCounters();
initManifesto();
initArchetypes();
initWall();
initQuiz();
initViolationForm();
initChaiTimer();
initTools(copyText);
const getDiagnosisState = initDiagnosis(copyText);
initMembership(copyText, getDiagnosisState);
initInteractiveFooter();
initBottomNav();
initReveals();
