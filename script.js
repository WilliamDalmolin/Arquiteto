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

  document.querySelectorAll("[data-copy-email]").forEach(link => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      const email = link.getAttribute("data-copy-email");
      const feedback = link.parentElement.querySelector(".copy-feedback");
      let copied = false;
      try {
        await navigator.clipboard.writeText(email);
        copied = true;
      } catch (error) {
        const field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        copied = document.execCommand("copy");
        field.remove();
      }
      if (feedback) feedback.textContent = copied ? "E-mail copiado!" : "Não foi possível copiar automaticamente.";
      link.title = copied ? "E-mail copiado!" : "Clique para copiar o e-mail";
      window.setTimeout(() => {
        if (feedback) feedback.textContent = "";
        link.title = "Clique para copiar o e-mail";
      }, 2200);
    });
  });
});
