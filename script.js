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

  // Cert Modal
  const modal = document.getElementById("certModal");
  const modalOverlay = modal.querySelector(".cert-modal-overlay");
  const modalClose = modal.querySelector(".cert-modal-close");
  const modalCloseBtn = modal.querySelector(".cert-modal-close-btn");
  const modalTitle = modal.querySelector(".cert-modal-title");
  const modalIssuer = modal.querySelector(".cert-modal-issuer");
  const modalDesc = modal.querySelector(".cert-modal-desc");
  const modalBanner = modal.querySelector(".cert-modal-banner");
  const modalDoc = modal.querySelector(".cert-modal-doc");
  const certCards = document.querySelectorAll(".cert-track .cert-card");

  function openModal(card) {
    const title = card.querySelector(".cert-title").textContent;
    const issuer = card.querySelector(".cert-issuer").textContent;
    const note = card.querySelector(".cert-note").textContent;

    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    modalDesc.textContent = note;
    modalDoc.href = "#";

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  certCards.forEach(card => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => openModal(card));
  });

  modalOverlay.addEventListener("click", closeModal);
  modalClose.addEventListener("click", closeModal);
  modalCloseBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });

});
