const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

const submenuToggles = document.querySelectorAll(".submenu-toggle");

submenuToggles.forEach(toggle => {
  toggle.addEventListener("click", e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();

      const submenu = toggle.nextElementSibling;
      const arrow = toggle.querySelector(".arrow");

      document.querySelectorAll(".submenu-characters, .submenu-contents").forEach(s => s.classList.remove("show"));
      document.querySelectorAll(".submenu-toggle .arrow").forEach(a => a.classList.remove("rotate"));

      if (submenu && submenu.tagName === "UL" && !submenu.classList.contains("show")) {
        submenu.classList.add("show");
        if (arrow) arrow.classList.add("rotate");
      }
    }
  });
});
