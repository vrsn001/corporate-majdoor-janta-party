import {
  TICKER_LINES,
  HERO_LINES,
  MANIFESTO_POLICIES,
  ARCHETYPES,
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  WALL_ENTRIES,
  TOOL_DATA
} from "./data.js";

export function initTicker() {
  const el = document.querySelector("#tickerTrack");
  if (!el) return;
  const line = [...TICKER_LINES, ...TICKER_LINES].map((t) => `<span>${t}</span>`).join("");
  el.innerHTML = line;
}

export function initHeroRotator() {
  const el = document.querySelector("#heroRotator");
  if (!el) return;
  let i = 0;
  el.textContent = HERO_LINES[0];
  setInterval(() => {
    i = (i + 1) % HERO_LINES.length;
    el.classList.add("fade");
    setTimeout(() => {
      el.textContent = HERO_LINES[i];
      el.classList.remove("fade");
    }, 280);
  }, 4200);
}

export function initScrollProgress() {
  const bar = document.querySelector("#scrollProgress");
  if (!bar) return;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
    bar.setAttribute("aria-valuenow", String(Math.round(pct)));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

export function initThemeToggle() {
  const btn = document.querySelector("#themeToggle");
  if (!btn) return;
  const stored = localStorage.getItem("cmjp-theme");
  if (stored === "corporate") document.documentElement.setAttribute("data-theme", "corporate");
  btn.addEventListener("click", () => {
    const isCorp = document.documentElement.getAttribute("data-theme") === "corporate";
    if (isCorp) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("cmjp-theme", "employee");
      btn.textContent = "HR View";
    } else {
      document.documentElement.setAttribute("data-theme", "corporate");
      localStorage.setItem("cmjp-theme", "corporate");
      btn.textContent = "Employee View";
    }
  });
  if (stored === "corporate") btn.textContent = "Employee View";
}

export function initCounters() {
  const els = document.querySelectorAll("[data-count]");
  const animate = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - p) ** 3;
      el.textContent = Math.round(target * eased).toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animate(e.target);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  els.forEach((el) => obs.observe(el));
}

export function initManifesto() {
  const grid = document.querySelector("#policyGrid");
  const counter = document.querySelector("#petitionCount");
  if (!grid) return;

  let petition = 47291 + (Math.floor(Date.now() / 86400000) % 500);
  if (counter) counter.textContent = petition.toLocaleString();

  const render = (filter = "all") => {
    const items = filter === "all" ? MANIFESTO_POLICIES : MANIFESTO_POLICIES.filter((p) => p.cat === filter);
    grid.innerHTML = items.map((p, index) => `
      <article class="policy-card" data-cat="${p.cat}" tabindex="0" style="animation-delay: ${index * 45}ms">
        <div class="policy-top">
          <span class="policy-num">${p.id}</span>
          <span class="policy-stamp">${p.status}</span>
        </div>
        <h3>${p.title}</h3>
        <p class="policy-punch">${p.punch}</p>
        <p class="policy-body">${p.body}</p>
        <details class="policy-details">
          <summary>Legal text / Human translation</summary>
          <div class="details-content">
            <p class="legal"><strong>Legal:</strong> ${p.legal}</p>
            <p class="human"><strong>Human:</strong> ${p.human}</p>
          </div>
        </details>
      </article>
    `).join("");

    grid.querySelectorAll(".policy-card").forEach((card) => {
      card.addEventListener("click", (e) => {
        if (e.target.closest(".policy-details")) {
          return;
        }
        card.classList.toggle("stamped");
      });
    });

    grid.querySelectorAll(".policy-details").forEach((details) => {
      details.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    });
  };

  render();
  document.querySelectorAll(".manifesto-filter button").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".manifesto-filter button").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      render(btn.dataset.filter);
      petition += Math.floor(Math.random() * 3) + 1;
      if (counter) counter.textContent = petition.toLocaleString();
    });
  });
}

export function initArchetypes() {
  const wrap = document.querySelector("#archetypeScroll");
  if (!wrap) return;
  wrap.innerHTML = ARCHETYPES.map((a) => `
    <article class="flip-card">
      <div class="flip-inner">
        <div class="flip-front">
          <h3>${a.title}</h3>
          <p>${a.front}</p>
          <strong>${a.quote}</strong>
          <span class="flip-hint mono">Tap to flip</span>
        </div>
        <div class="flip-back">
          <p class="mono">Survival tip</p>
          <p>${a.tip}</p>
        </div>
      </div>
    </article>
  `).join("");
  wrap.querySelectorAll(".flip-card").forEach((card) => {
    card.addEventListener("click", () => card.classList.toggle("flipped"));
  });
}

export function initWall() {
  const wall = document.querySelector("#burnoutWall");
  if (!wall) return;
  wall.innerHTML = WALL_ENTRIES.map((t) => `<blockquote>${t}</blockquote>`).join("");
}

export function initQuiz(copyText) {
  const box = document.querySelector("#quizBox");
  if (!box) return;
  let step = 0;
  const scores = { monk: 0, warrior: 0, diplomat: 0, ninja: 0, criminal: 0, hustle: 0 };

  const render = () => {
    if (step >= QUIZ_QUESTIONS.length) {
      const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
      const r = QUIZ_RESULTS[winner];
      box.innerHTML = `
        <p class="mono">Registry result</p>
        <h3>${r.title}</h3>
        <p>${r.line}</p>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1.25rem;">
          <button type="button" class="btn btn-outline" id="quizRetry">Retake quiz</button>
          <button type="button" class="btn btn-linkedin" id="quizShareLinkedIn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 0.35rem;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            Share on LinkedIn
          </button>
        </div>
        <p class="copy-toast" id="quizToast" hidden style="margin-top: 0.75rem;">Template copied! Redirecting to LinkedIn...</p>
      `;

      document.querySelector("#quizShareLinkedIn")?.addEventListener("click", async () => {
        const text = `🚨 I just took the CMJP Corporate Archetype Quiz and got:
🏆 ${r.title.toUpperCase()}
"${r.line}"

Find your archetype and claim your Meleeium Resilience Certificate:
👉 https://corporate-majdoor-janta-party.vercel.app

✊ Republic of Corporate India · CMJP Satirical Secretariat
#CorporateMajdoor #CMJP #WorkCulture #Burnout`;

        const ok = await copyText(text);
        const toast = document.querySelector("#quizToast");
        if (ok && toast) {
          toast.hidden = false;
          setTimeout(() => {
            toast.hidden = true;
            window.open("https://www.linkedin.com/feed/", "_blank");
          }, 1800);
        } else {
          window.open("https://www.linkedin.com/feed/", "_blank");
        }
      });

      document.querySelector("#quizRetry")?.addEventListener("click", () => {
        step = 0;
        Object.keys(scores).forEach((k) => { scores[k] = 0; });
        render();
      });
      return;
    }
    const q = QUIZ_QUESTIONS[step];
    box.innerHTML = `
      <p class="mono">Question ${step + 1} / ${QUIZ_QUESTIONS.length}</p>
      <h3>${q.q}</h3>
      <div class="quiz-opts">${q.opts.map((o, i) => `<button type="button" class="btn btn-outline quiz-opt" data-i="${i}">${o.t}</button>`).join("")}</div>
    `;
    box.querySelectorAll(".quiz-opt").forEach((btn) => {
      btn.addEventListener("click", () => {
        const opt = q.opts[Number(btn.dataset.i)];
        scores[opt.a] = (scores[opt.a] || 0) + 1;
        step += 1;
        render();
      });
    });
  };
  render();
}

export function initViolationForm() {
  const form = document.querySelector("#violationForm");
  const out = document.querySelector("#violationResult");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const id = `CMJP-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    out.hidden = false;
    out.innerHTML = `<p class="mono">Ticket ${id} filed</p><p>Violation logged: <strong>${fd.get("type")}</strong>. Ministry will pretend to review within 90 emotional days.</p>`;
  });
}

export function initChaiTimer() {
  const display = document.querySelector("#chaiDisplay");
  const startBtn = document.querySelector("#chaiStart");
  const copyBtn = document.querySelector("#chaiCopy");
  if (!display || !startBtn) return;
  let interval;
  let secs = 600;
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  display.textContent = fmt(secs);
  startBtn.addEventListener("click", () => {
    clearInterval(interval);
    secs = 600;
    startBtn.disabled = true;
    interval = setInterval(() => {
      secs -= 1;
      display.textContent = fmt(secs);
      if (secs <= 0) {
        clearInterval(interval);
        display.textContent = "BREAK OVER";
        startBtn.disabled = false;
      }
    }, 1000);
  });
  copyBtn?.addEventListener("click", async () => {
    const text = "🍵 CHAI BREAK IN PROGRESS — Do not schedule quick calls. — CMJP Ministry of Focus";
    try { await navigator.clipboard.writeText(text); } catch { /* noop */ }
  });
}

export function initTools(copyText) {
  let activeTool = "excuse";
  let toolIndex = 0;
  const toolButtons = [...document.querySelectorAll(".tool-tabs button")];
  const toolLabel = document.querySelector("#toolLabel");
  const toolTitle = document.querySelector("#toolTitle");
  const toolCopy = document.querySelector("#toolCopy");
  const toolRefresh = document.querySelector("#toolRefresh");
  const toolCopyBtn = document.querySelector("#toolCopyBtn");
  const copyToast = document.querySelector("#copyToast");

  const toolShareLinkedIn = document.querySelector("#toolShareLinkedIn");

  const render = () => {
    const tool = TOOL_DATA[activeTool];
    const item = tool.items[toolIndex % tool.items.length];
    toolLabel.textContent = tool.label;
    toolTitle.textContent = item[0];
    toolCopy.textContent = item[1];
  };

  toolButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTool = button.dataset.tool;
      toolIndex = 0;
      toolButtons.forEach((b) => b.classList.toggle("active", b === button));
      render();
    });
  });
  toolRefresh?.addEventListener("click", () => { toolIndex += 1; render(); });
  toolCopyBtn?.addEventListener("click", async () => {
    const ok = await copyText(`${toolTitle.textContent}\n\n${toolCopy.textContent}`);
    if (ok && copyToast) {
      copyToast.textContent = "Copied.";
      copyToast.hidden = false;
      setTimeout(() => { copyToast.hidden = true; }, 2200);
    }
  });
  toolShareLinkedIn?.addEventListener("click", async () => {
    const text = `🔥 CMJP Tools Lab - ${toolLabel.textContent}:
👉 ${toolTitle.textContent}
(${toolCopy.textContent})

Equip yourself with satirical workplace survival weapons:
👉 https://corporate-majdoor-janta-party.vercel.app

✊ Republic of Corporate India · CMJP Satirical Secretariat
#CorporateMajdoor #CMJP #WorkCulture #Burnout`;

    const ok = await copyText(text);
    if (ok && copyToast) {
      copyToast.textContent = "Template copied! Redirecting to LinkedIn...";
      copyToast.hidden = false;
      setTimeout(() => {
        copyToast.hidden = true;
        copyToast.textContent = "Copied.";
        window.open("https://www.linkedin.com/feed/", "_blank");
      }, 1800);
    } else {
      window.open("https://www.linkedin.com/feed/", "_blank");
    }
  });
  render();
}

export function initDiagnosis(copyText) {
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
  const badge = document.querySelector("#severityBadge");

  const diagnoses = [
    ["M0: Functional Optimism", "Still believes the retro will fix culture."],
    ["M1: Mild Drift", "Forgets why the meeting started but remains optimistic."],
    ["M2: Calendar Anxiety", "Heart rate increases when a blank invite appears."],
    ["M3: Strategic Numbness", "Says 'let us circle back' to survive the moment."],
    ["M4: Acute Corporate Dissociation", "Typing 'noted' while spiritually absent."],
    ["M5: Founder Slide Syndrome", "Can now explain suffering through a 2x2 matrix."]
  ];

  let last = { score: 82, band: 4, title: diagnoses[4][0], text: diagnoses[4][1] };

  const update = () => {
    const raw = Number(ranges[0].value) * 2 + Number(ranges[1].value) * 3 + Number(ranges[2].value);
    const score = Math.min(99, Math.round(raw * 1.25));
    const band = Math.min(diagnoses.length - 1, Math.floor(score / 17));
    gaugeScore.textContent = score;
    gauge.style.background = `conic-gradient(from 20deg, var(--corp) 0%, var(--warn) ${score}%, rgba(248,244,232,0.12) ${score}%)`;
    diagnosisTitle.textContent = diagnoses[band][0];
    diagnosisText.textContent = diagnoses[band][1];
    severitySpans.forEach((span, i) => span.classList.toggle("active", i === band));
    if (badge) {
      badge.textContent = diagnoses[band][0].split(":")[0];
      badge.className = `severity-badge band-${band}`;
    }
    gauge?.classList.add("pulse");
    diagnosisOutput?.classList.add("updated");
    setTimeout(() => {
      gauge?.classList.remove("pulse");
      diagnosisOutput?.classList.remove("updated");
    }, 320);
    last = { score, band, title: diagnoses[band][0], text: diagnoses[band][1] };
    return last;
  };

  ranges.forEach((r) => r.addEventListener("input", update));
  update();

  document.querySelector("#shareDiagnosis")?.addEventListener("click", async () => {
    const s = update();
    const text = `CMJP Meleeium Index: ${s.score}/99 — ${s.title}\n${s.text}\nhttps://corporate-majdoor-janta-party.vercel.app`;
    await copyText(text);
    const toast = document.querySelector("#diagnosisToast");
    if (toast) {
      toast.textContent = "Score copied. Deploy responsibly.";
      toast.hidden = false;
      setTimeout(() => { toast.hidden = true; }, 2500);
    }
  });

  document.querySelector("#shareDiagnosisLinkedIn")?.addEventListener("click", async () => {
    const s = update();
    const text = `📊 My CMJP Meleeium Index is ${s.score}/99 — ${s.title.toUpperCase()}
"${s.text}"

Check your own emotional bandwidth & download your Meleeium Resilience Certificate:
👉 https://corporate-majdoor-janta-party.vercel.app

✊ Republic of Corporate India · CMJP Satirical Secretariat
#CorporateMajdoor #CMJP #WorkCulture #Burnout`;

    const ok = await copyText(text);
    const toast = document.querySelector("#diagnosisToast");
    if (ok && toast) {
      toast.textContent = "LinkedIn template copied! Redirecting...";
      toast.hidden = false;
      setTimeout(() => {
        toast.hidden = true;
        toast.textContent = "Score copied. Deploy responsibly.";
        window.open("https://www.linkedin.com/feed/", "_blank");
      }, 1800);
    } else {
      window.open("https://www.linkedin.com/feed/", "_blank");
    }
  });

  document.querySelector("#downloadReport")?.addEventListener("click", () => {
    const s = update();
    const report = `CMJP WEEKLY MELEEIUM REPORT\n${"=".repeat(32)}\nScore: ${s.score}/99\nDiagnosis: ${s.title}\n${s.text}\nQuick calls: ${ranges[0].value}\nWeekend pings: ${ranges[1].value}\n\"Sure\" count: ${ranges[2].value}\n\nIssued by Ministry of Emotional Affairs.\nNot valid for actual HR.`;
    const blob = new Blob([report], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "cmjp-meleeium-report.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  });

  return () => last;
}

export function drawCertificate(name, score) {
  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 560;
  const ctx = canvas.getContext("2d");
  
  // Background
  ctx.fillStyle = "#080907";
  ctx.fillRect(0, 0, 800, 560);
  
  // Outer Border
  ctx.strokeStyle = "#f8f4e8";
  ctx.lineWidth = 1;
  ctx.strokeRect(40, 40, 720, 480);
  
  // Inner Border (Double Concentric Border effect)
  ctx.strokeStyle = "rgba(248, 244, 232, 0.35)";
  ctx.lineWidth = 1;
  ctx.strokeRect(46, 46, 708, 468);
  
  // Top header text
  ctx.fillStyle = "#f8f4e8";
  ctx.font = "bold 24px Georgia, serif";
  ctx.textAlign = "center";
  ctx.fillText("REPUBLIC OF CORPORATE INDIA", 400, 105);
  
  // Title: MELEEIUM RESILIENCE CERTIFICATE (fitted safely inside bounds to avoid [ELEEIUM clipping!)
  ctx.font = "bold 26px Georgia, serif";
  ctx.fillText("MELEEIUM RESILIENCE CERTIFICATE", 400, 160);
  
  // Name (with auto font shrink loop to avoid overflow)
  let fontSize = 36;
  ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
  let textWidth = ctx.measureText(String(name)).width;
  while (textWidth > 640 && fontSize > 16) {
    fontSize -= 2;
    ctx.font = `bold ${fontSize}px system-ui, sans-serif`;
    textWidth = ctx.measureText(String(name)).width;
  }
  ctx.fillStyle = "#b7ff37";
  ctx.fillText(String(name), 400, 260);
  
  // Subtitle / Score Details
  ctx.fillStyle = "#a8aaa0";
  ctx.font = "18px system-ui, sans-serif";
  ctx.fillText(`Meleeium score: ${score}/99 · Provisional CMJP cadre`, 400, 320);
  ctx.fillText("Emotionally valid 90 days", 400, 360);
  
  // Ministerial Red Seal (circular detailed seal)
  const sealY = 445;
  ctx.strokeStyle = "#ff3b30";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(400, sealY, 34, 0, Math.PI * 2);
  ctx.stroke();
  
  ctx.strokeStyle = "rgba(255, 59, 48, 0.4)";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.arc(400, sealY, 28, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]); // Reset line dash
  
  ctx.fillStyle = "#ff3b30";
  ctx.font = "bold 13px system-ui, sans-serif";
  ctx.fillText("CMJP", 400, sealY + 2);
  ctx.font = "bold 7px system-ui, sans-serif";
  ctx.fillText("OFFICIAL SEAL", 400, sealY + 14);
  
  return canvas;
}

export function initMembership(copyText, getScore) {
  const form = document.querySelector("#memberForm");
  const certificate = document.querySelector("#certificate");
  const certName = document.querySelector("#certName");
  const wallet = document.querySelector("#walletCard");
  const certDownload = document.querySelector("#certDownload");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = String(new FormData(form).get("name") || "Anonymous Cadre");
    const score = getScore?.().score ?? 82;
    certName.textContent = name;
    certificate.hidden = false;
    if (wallet) {
      wallet.hidden = false;
      document.querySelector("#walletName").textContent = name;
      document.querySelector("#walletScore").textContent = `${score}/99`;
      const qr = document.querySelector("#walletQr");
      if (qr) qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent("https://corporate-majdoor-janta-party.vercel.app")}`;
    }
    certificate.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  document.querySelector("#certCopy")?.addEventListener("click", async () => {
    await copyText(`MELEEIUM RESILIENCE CERTIFICATE\nIssued to: ${certName.textContent}\nRepublic of Corporate India · CMJP`);
  });

  certDownload?.addEventListener("click", () => {
    const canvas = drawCertificate(certName.textContent, getScore?.().score ?? 82);
    const a = document.createElement("a");
    a.download = "cmjp-certificate.png";
    a.href = canvas.toDataURL("image/png");
    a.click();
  });
}

export function initBottomNav() {
  const links = document.querySelectorAll(".bottom-nav a");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
  ["manifesto", "meleeium", "tools", "join"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}

export function initInteractiveFooter() {
  const btn = document.querySelector("#ventButton");
  const counter = document.querySelector("#ventCounter");
  const consoleEl = document.querySelector("#ventConsole");
  if (!btn || !counter || !consoleEl) return;

  const responses = [
    "Ministry of Burnout: Complaint successfully moved to a beautiful folder called 'Trash'.",
    "Secretariat Telemetry: Stress levels noted. Increasing Sunday Dread forecast by 2.4%.",
    "AI Empathy Engine: 'We hear you and appreciate your synergy-alignment.' Marking as resolved.",
    "HR Auto-Response: 'Have you tried attending our next Mandatory Wellness Webinar?'",
    "Stakeholder circular: Let us take this offline. (Never speak of it again.)",
    "Urgent Ping: Your boundary has been flagged as 'not team-player compliant'.",
    "Digital Secretariat: Provisional relief granted. Deploying 0.1mg of digital chai.",
    "HR Chatbot: Please complete a 2x2 slide expressing your spiritual exhaustion.",
    "Notification: Congratulations! You have unlocked a fresh, unprompted calendar invite.",
    "Empathy Telemetry: Provisional diagnosis confirmed. spirit_level: 0%."
  ];

  let currentVented = parseFloat(localStorage.getItem("cmjp-stress-vented") || "0");
  counter.textContent = currentVented.toFixed(1);

  btn.addEventListener("click", () => {
    btn.classList.add("shaking");
    setTimeout(() => btn.classList.remove("shaking"), 400);

    const increment = 0.5 + Math.random() * 0.5;
    currentVented += increment;
    localStorage.setItem("cmjp-stress-vented", currentVented.toFixed(1));
    counter.textContent = currentVented.toFixed(1);

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Typewriter effect in console
    consoleEl.innerHTML = `<span class="mono console-prompt success">&gt; Venting...</span>`;
    setTimeout(() => {
      consoleEl.innerHTML = `<span class="mono console-prompt hr-reply">&gt; ${randomResponse}</span>`;
    }, 450);
  });
}

export function initReveals() {
  document.querySelectorAll(".section, .stat-tile, .policy-card, .flip-card, .wall-section blockquote").forEach((el) => el.classList.add("reveal"));
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
}

export function initEmergencyTelemetry() {
  const statCritical = document.querySelector(".stat-tile.stat-critical");
  if (!statCritical) return;

  const meleeiumEl = statCritical.querySelector("h2 span[data-count]");
  const callsEl = document.querySelectorAll(".stat-tile h2")[1]?.querySelector("span[data-count]");
  const meterEl = statCritical.querySelector(".meter span");

  if (!meleeiumEl || !callsEl || !meterEl) return;

  let currentMeleeium = 82;
  let currentCalls = 1284;

  setInterval(() => {
    // 1. Fluctuate Meleeium by +/- 1 point (bound between 81 and 84)
    const mChange = Math.floor(Math.random() * 3) - 1; // -1, 0, +1
    currentMeleeium = Math.max(81, Math.min(84, currentMeleeium + mChange));
    meleeiumEl.textContent = currentMeleeium;
    meterEl.style.width = `${currentMeleeium}%`;

    // 2. Increment calls by a random amount (+1 to +3)
    const cChange = Math.floor(Math.random() * 3) + 1; // +1, +2, +3
    currentCalls += cChange;
    callsEl.textContent = currentCalls.toLocaleString();

    // Subtle neon-green glowing flash on increment
    callsEl.style.transition = "color 0.2s ease, text-shadow 0.2s ease";
    callsEl.style.color = "var(--toxic)";
    callsEl.style.textShadow = "0 0 10px var(--toxic)";
    setTimeout(() => {
      callsEl.style.color = "";
      callsEl.style.textShadow = "";
    }, 300);
  }, 4500);
}

export function initRogueGlitch() {
  const tileNotice = document.querySelector(".stat-tile.stat-notice");
  if (!tileNotice) return;

  tileNotice.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "rogue-glitch-overlay";
    overlay.innerHTML = `
      <div class="rogue-glitch-content">
        <p class="mono" style="color: var(--toxic); font-weight: bold; font-size: 1.1rem; margin: 0 0 0.5rem; letter-spacing: 0.08em; text-transform: uppercase;">ALERT: EMERGENCY DECREE 27-A ACTIVE</p>
        <h1 class="rogue-glitch-title">NO AGENDA.<br>NO ATTENDANCE.</h1>
        <p class="mono" style="color: var(--warn); font-weight: bold; font-size: 0.95rem; margin: 0.5rem 0 0; letter-spacing: 0.08em; text-transform: uppercase;">SIGNAL OVERRIDDEN BY CMJP SECRETARIAT</p>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.classList.add("fade-out");
      setTimeout(() => overlay.remove(), 250);
    }, 750);
  });
}
