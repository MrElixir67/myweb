/* ========================================
   MrElixir — Scripts
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Scroll Spy — highlight active nav link
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".sidebar-nav a, .mobile-nav a");

  function onScroll() {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

});
