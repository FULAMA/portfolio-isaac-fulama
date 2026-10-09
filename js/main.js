/* ===== Année dynamique ===== */
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Navigation : fond au scroll ===== */
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 40);
});

/* ===== Menu mobile ===== */
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  burger.classList.toggle("active");
});
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    burger.classList.remove("active");
  })
);

/* ===== Effet machine à écrire ===== */
const titles = [
  "Développeur Web",
  "Futur Architecte Logiciel",
  "Créateur d'applications",
  "Passionné de code propre"
];
const typedEl = document.getElementById("typed");
let titleIndex = 0, charIndex = 0, deleting = false;

function type() {
  const current = titles[titleIndex];
  typedEl.textContent = current.slice(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(type, 85);
  } else if (!deleting && charIndex === current.length) {
    deleting = true;
    setTimeout(type, 1500);
  } else if (deleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 40);
  } else {
    deleting = false;
    titleIndex = (titleIndex + 1) % titles.length;
    setTimeout(type, 350);
  }
}
type();

/* ===== Révélation au scroll + compteurs + barres ===== */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");

      // Compteurs
      entry.target.querySelectorAll("[data-count]").forEach(animateCount);
      if (entry.target.matches("[data-count]")) animateCount(entry.target);

      // Barres de compétences
      entry.target.querySelectorAll(".bar i").forEach((bar) => {
        bar.style.width = bar.dataset.fill + "%";
      });

      io.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();

  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ===== Formulaire de contact ===== */
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");

const sendBtn = document.getElementById("sendBtn");
// Service d'envoi d'email (FormSubmit) : les messages arrivent directement dans cette boîte mail.
const CONTACT_ENDPOINT = "https://formsubmit.co/ajax/fulamaantoine@gmail.com";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !emailOk || !message) {
    note.textContent = "Merci de remplir tous les champs avec un email valide.";
    note.classList.add("error");
    return;
  }

  sendBtn.disabled = true;
  sendBtn.textContent = "Envoi en cours...";
  note.classList.remove("error");
  note.textContent = "";

  try {
    const res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name,
        email,
        message,
        _honey: form._honey.value,
        _replyto: email,
        _subject: `Nouveau message du portfolio — ${name}`,
        _template: "table",
        _captcha: "false"
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === "false" || data.success === false) {
      throw new Error(data.message || "Erreur d'envoi");
    }
    note.textContent = `Merci ${name} ! Votre message a bien été envoyé.`;
    form.reset();
  } catch (err) {
    note.classList.add("error");
    note.textContent = "L'envoi a échoué. Écrivez-moi directement à fulamaantoine@gmail.com.";
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Envoyer le message";
  }
});
