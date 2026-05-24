import { mountAurora } from "./aurora.js";

try {
  mountAurora(document.querySelector("#aurora"), {
    colorStops: ["#b7ff37", "#2f7dff", "#ff3b30"],
    blend: 0.38,
    amplitude: 0.85,
    speed: 0.5
  });
  document.documentElement.classList.add("aurora-ready");
} catch (error) {
  console.warn("Aurora background fallback active.", error);
  document.documentElement.classList.add("aurora-fallback");
}

const glitchBox = document.querySelector(".glitch-box");
if (glitchBox) {
  setInterval(() => {
    glitchBox.classList.add("glitch");
    setTimeout(() => glitchBox.classList.remove("glitch"), 160);
  }, 3200);
}

document.addEventListener("pointermove", (event) => {
  const x = Math.round((event.clientX / window.innerWidth) * 100);
  const y = Math.round((event.clientY / window.innerHeight) * 100);
  document.documentElement.style.setProperty("--mx", `${x}%`);
  document.documentElement.style.setProperty("--my", `${y}%`);
});

document.querySelectorAll(".section, .stat-tile, .manifesto-section .policy-grid article, .archetype-scroll article").forEach((item) => {
  item.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

const navLinks = [...document.querySelectorAll("nav a[data-nav]")];
const sections = navLinks
  .map((link) => document.getElementById(link.dataset.nav))
  .filter(Boolean);

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.nav === id);
    });
  });
}, { rootMargin: "-40% 0px -50% 0px", threshold: 0 });

sections.forEach((section) => navObserver.observe(section));

const ranges = [
  document.querySelector("#callsRange"),
  document.querySelector("#pingsRange"),
  document.querySelector("#sureRange")
];
const gauge = document.querySelector("#gauge");
const gaugeScore = document.querySelector("#gaugeScore");
const diagnosisOutput = document.querySelector("#diagnosisOutput");
const diagnosisTitle = document.querySelector("#diagnosisTitle");
const diagnosisText = document.querySelector("#diagnosisText");
const severitySpans = [...document.querySelectorAll(".severity-strip span")];

const diagnoses = [
  ["M0: Functional Optimism", "Still believes the retro will fix culture."],
  ["M1: Mild Drift", "Forgets why the meeting started but remains optimistic."],
  ["M2: Calendar Anxiety", "Heart rate increases when a blank invite appears."],
  ["M3: Strategic Numbness", "Says 'let us circle back' to survive the moment."],
  ["M4: Acute Corporate Dissociation", "Typing 'noted' while spiritually absent."],
  ["M5: Founder Slide Syndrome", "Can now explain suffering through a 2x2 matrix."]
];

function updateDiagnosis() {
  const raw = Number(ranges[0].value) * 2 + Number(ranges[1].value) * 3 + Number(ranges[2].value);
  const score = Math.min(99, Math.round(raw * 1.25));
  const band = Math.min(diagnoses.length - 1, Math.floor(score / 17));
  const pct = Math.min(99, score);

  gaugeScore.textContent = score;
  gauge.style.background = `conic-gradient(from 20deg, var(--corp) 0%, var(--warn) ${pct}%, rgba(248,244,232,0.12) ${pct}%)`;
  diagnosisTitle.textContent = diagnoses[band][0];
  diagnosisText.textContent = diagnoses[band][1];

  severitySpans.forEach((span, i) => span.classList.toggle("active", i === band));

  gauge.classList.add("pulse");
  diagnosisOutput.classList.add("updated");
  setTimeout(() => {
    gauge.classList.remove("pulse");
    diagnosisOutput.classList.remove("updated");
  }, 320);
}

ranges.forEach((range) => range.addEventListener("input", updateDiagnosis));

const toolData = {
  excuse: {
    label: "Meeting excuse generator",
    items: [
      ["\"Currently in a cross-functional sync with my nervous system.\"", "Approved for vague invites, surprise reviews, and calls titled only \"Discussion\"."],
      ["\"Resolving a high-priority bandwidth incident.\"", "Use when your brain has too many tabs open."],
      ["\"Need to step away for urgent context recovery.\"", "Deploy when nobody knows what the project is anymore."]
    ]
  },
  buzzword: {
    label: "Buzzword translator",
    items: [
      ["\"High visibility\" = high risk, low credit.", "Public success, private panic."],
      ["\"Let us take this offline\" = disagreement with better lighting.", "Controlled environment for corporate diplomacy."],
      ["\"Ownership mindset\" = scope up, compensation flat.", "A classic fiscal magic trick."]
    ]
  },
  pto: {
    label: "PTO guilt calculator",
    items: [
      ["Guilt Index: 82/100.", "Apply anyway. Avoid Slack for 36 hours."],
      ["Guilt Index: 46/100.", "Manager tone appears survivable."],
      ["Guilt Index: 97/100.", "Recommend fake network instability and deep breathing."]
    ]
  },
  bandwidth: {
    label: "Emotional bandwidth meter",
    items: [
      ["Status: Can only react.", "Avoid strategy docs and humans saying \"quick\"."],
      ["Status: Do not perceive me.", "Camera-off is now a medical necessity."],
      ["Status: Able to collaborate.", "Rare weather event. Use responsibly."]
    ]
  }
};

let activeTool = "excuse";
let toolIndex = 0;
const toolButtons = [...document.querySelectorAll(".tool-tabs button")];
const toolLabel = document.querySelector("#toolLabel");
const toolTitle = document.querySelector("#toolTitle");
const toolCopy = document.querySelector("#toolCopy");
const toolRefresh = document.querySelector("#toolRefresh");
const toolCopyBtn = document.querySelector("#toolCopyBtn");
const copyToast = document.querySelector("#copyToast");

function renderTool() {
  const tool = toolData[activeTool];
  const item = tool.items[toolIndex % tool.items.length];
  toolLabel.textContent = tool.label;
  toolTitle.textContent = item[0];
  toolCopy.textContent = item[1];
}

toolButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeTool = button.dataset.tool;
    toolIndex = 0;
    toolButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderTool();
  });
});

toolRefresh.addEventListener("click", () => {
  toolIndex += 1;
  renderTool();
});

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

toolCopyBtn.addEventListener("click", async () => {
  const text = `${toolTitle.textContent}\n\n${toolCopy.textContent}`;
  const ok = await copyText(text);
  if (ok && copyToast) {
    copyToast.hidden = false;
    setTimeout(() => {
      copyToast.hidden = true;
    }, 2200);
  }
});

const memberForm = document.querySelector("#memberForm");
const certificate = document.querySelector("#certificate");
const certName = document.querySelector("#certName");
const certCopy = document.querySelector("#certCopy");

memberForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = new FormData(memberForm).get("name") || "Anonymous Cadre";
  certName.textContent = String(name);
  certificate.hidden = false;
  certificate.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

certCopy.addEventListener("click", async () => {
  const text = `MELEEIUM RESILIENCE CERTIFICATE\nIssued to: ${certName.textContent}\nRepublic of Corporate India · CMJP\nValid 90 days. Emotionally binding.`;
  await copyText(text);
});

document.querySelectorAll(".faq-list button").forEach((button) => {
  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
  });
});

updateDiagnosis();
renderTool();
