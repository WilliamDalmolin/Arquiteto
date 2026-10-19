document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".topbar");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  const updateHeader = () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 30);
  };
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
      menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menuToggle.textContent = open ? "×" : "☰";
    });
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
      });
    });
  }

  document.querySelectorAll("[data-copy-email]").forEach(button => {
    button.addEventListener("click", async () => {
      const email = button.getAttribute("data-copy-email");
      const feedback = button.parentElement.querySelector(".copy-feedback");
      try {
        await navigator.clipboard.writeText(email);
        if (feedback) feedback.textContent = "E-mail copiado!";
        button.textContent = "Copiado";
      } catch (error) {
        const field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (feedback) feedback.textContent = ok ? "E-mail copiado!" : "Selecione e copie o e-mail.";
        button.textContent = ok ? "Copiado" : "Copiar e-mail";
      }
      window.setTimeout(() => {
        button.textContent = "Copiar e-mail";
        if (feedback) feedback.textContent = "";
      }, 2400);
    });
  });
});