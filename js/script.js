(function () {
  "use strict";

  /* ---------- Año dinámico en el footer ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Modo claro / oscuro ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("theme-toggle");
  var STORAGE_KEY = "portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
      themeToggle.setAttribute(
        "aria-label",
        theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
      );
    }
  }

  function getPreferredTheme() {
    var saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      window.localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ---------- Menú de navegación móvil ---------- */
  var navToggle = document.getElementById("nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Formulario de contacto (mailto) ---------- */
  var form = document.getElementById("contact-form");
  var status = document.getElementById("form-status");
  var CONTACT_EMAIL = "ocamposteven237@gmail.com";

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();

      if (!name || !email || !message) {
        status.textContent = "Por favor completa todos los campos.";
        return;
      }

      var subject = encodeURIComponent("Contacto desde el portafolio — " + name);
      var body = encodeURIComponent(
        message + "\n\n---\nNombre: " + name + "\nCorreo: " + email
      );

      window.location.href =
        "mailto:" + CONTACT_EMAIL + "?subject=" + subject + "&body=" + body;

      status.textContent = "Abriendo tu cliente de correo…";
      form.reset();
    });
  }
})();
