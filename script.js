(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const screens = [...document.querySelectorAll(".screen")];
  const stars = [...document.querySelectorAll(".star-point")];
  const modal = $("#star-modal");
  const messages = [
    {title:"Your kind of magic", message:"You have a way of making ordinary conversations feel a little less ordinary. That's a pretty lovely thing."},
    {title:"A little reminder", message:"You don't have to be the loudest person in the room to make a difference. Your presence counts, exactly as it is."},
    {title:"The tiny details", message:"I hope you know that the little things you do — the way you laugh, the things you notice — can make someone's day."},
    {title:"Main-character energy", message:"May you always find reasons to be curious, things that make you laugh until your cheeks hurt, and people who cheer you on."},
    {title:"A wish for you", message:"I hope something unexpectedly good happens to you soon. The kind of good that makes you smile to yourself on the way home."},
    {title:"Keep being you", message:"You don't need to have everything figured out. You're allowed to grow, change your mind, and take life one little adventure at a time."},
    {title:"The rarest star", message:"Out of all the stars in this tiny galaxy, this one says: I'm glad our paths crossed. Here's to finding more reasons to smile. ♡"}
  ];
  const found = new Set();
  let currentStar = 0;
  let toastTimer;

  function showScreen(id) {
    screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
    window.scrollTo({top: 0, behavior: "smooth"});
  }
  function updateProgress() {
    $("#progress-label").textContent = `${found.size} / 7 stars`;
    $("#progress-bar").style.width = `${found.size / 7 * 100}%`;
    $("#discovery-hint").textContent = found.size === 0
      ? "Your first little star is waiting."
      : found.size === 7
        ? "Every star is glowing. Your constellation is ready. ✧"
        : `${found.size} little ${found.size === 1 ? "star" : "stars"} found. Keep wandering.`;
    $("#ending-shortcut").hidden = found.size < 7;
  }
  function showToast(message) {
    const toast = $("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2300);
  }
  function openStar(index) {
    currentStar = index;
    found.add(index);
    stars[index].classList.add("found");
    updateProgress();
    $("#modal-star").textContent = index === 6 ? "✧" : "✦";
    $("#modal-title").textContent = messages[index].title;
    $("#modal-message").textContent = messages[index].message;
    $("#modal-count").textContent = `STAR ${index + 1} OF 7`;
    $("#next-star").textContent = found.size === 7 ? "See constellation →" : "Next star →";
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (found.size === 7) showToast("All seven stars are yours ✨");
  }
  function goNext() {
    if (found.size === 7) {
      closeModal();
      showScreen("constellation");
      return;
    }
    let next = (currentStar + 1) % 7;
    while (found.has(next)) next = (next + 1) % 7;
    closeModal();
    // Guide the visitor toward the next undiscovered star.
    const target = stars[next];
    target.animate([{transform:"scale(1)"},{transform:"scale(1.55)"},{transform:"scale(1)"}],{duration:650});
    showToast("A new star is twinkling for you ↗");
  }

  $("#begin-btn").addEventListener("click", () => showScreen("explore"));
  stars.forEach(star => star.addEventListener("click", () => openStar(Number(star.dataset.star))));
  $("#modal-close").addEventListener("click", closeModal);
  $("#next-star").addEventListener("click", goNext);
  modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeModal(); });
  $("#ending-shortcut").addEventListener("click", () => showScreen("constellation"));
  $("#secret-btn").addEventListener("click", () => showScreen("secret"));
  $("#again-btn").addEventListener("click", () => {
    found.clear();
    stars.forEach(star => star.classList.remove("found"));
    updateProgress();
    showScreen("explore");
  });
  updateProgress();

  // Lightweight animated starfield: no libraries and no image assets required.
  const canvas = $("#sky");
  const ctx = canvas.getContext("2d");
  let width = 0, height = 0, dpr = 1, particles = [];
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(150, Math.floor(width * height / 5200));
    particles = Array.from({length: count}, () => ({
      x: Math.random() * width, y: Math.random() * height,
      r: Math.random() * 1.35 + .25, phase: Math.random() * Math.PI * 2,
      speed: Math.random() * .018 + .004,
      tint: Math.random() > .8 ? 1 : 0
    }));
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, width, height);
    frame++;
    for (const p of particles) {
      const alpha = .26 + (Math.sin(frame * p.speed + p.phase) + 1) * .28;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.tint ? `rgba(255,168,226,${alpha})` : `rgba(226,215,255,${alpha})`;
      ctx.fill();
      if (p.r > 1.25 && alpha > .72) {
        ctx.strokeStyle = `rgba(255,220,250,${alpha * .55})`;
        ctx.lineWidth = .5;
        ctx.beginPath(); ctx.moveTo(p.x - 3, p.y); ctx.lineTo(p.x + 3, p.y);
        ctx.moveTo(p.x, p.y - 3); ctx.lineTo(p.x, p.y + 3); ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  window.addEventListener("resize", resize, {passive:true});
  resize();
  draw();
})();