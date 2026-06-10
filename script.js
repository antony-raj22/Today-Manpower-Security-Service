const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("[data-menu]");

if (menuButton && navMenu) {
  menuButton.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const counters = document.querySelectorAll("[data-count]");

const animateCounter = (counter) => {
  const target = Number(counter.dataset.count || 0);
  const duration = 1300;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${Math.floor(eased * target)}+`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = `${target}+`;
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const quoteForm = document.querySelector("#quoteForm");

if (quoteForm) {
  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(quoteForm);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const note = quoteForm.querySelector(".form-note");

    const whatsappText = encodeURIComponent([
      "New quote request for Today Manpower and Security Service",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Message: ${message || "Not provided"}`
    ].join("\n"));

    if (note) {
      note.textContent = "Opening WhatsApp with your request...";
    }

    window.open(`https://wa.me/918825919171?text=${whatsappText}`, "_blank", "noopener,noreferrer");
    quoteForm.reset();
  });
}
