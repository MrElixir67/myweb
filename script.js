/* ========================================
   MrElixir — Scripts
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Scroll Spy
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

  // Single Cert Modal
  const modal = document.getElementById("certModal");
  const modalOverlay = modal.querySelector(".cert-modal-overlay");
  const modalClose = modal.querySelector(".cert-modal-close");
  const modalCloseBtn = modal.querySelector(".cert-modal-close-btn");
  const modalTitle = modal.querySelector(".cert-modal-title");
  const modalIssuer = modal.querySelector(".cert-modal-issuer");
  const modalDesc = modal.querySelector(".cert-modal-desc");
  const modalDoc = modal.querySelector(".cert-modal-doc");

  function openSingleModal(card) {
    const title = card.querySelector(".cert-title").textContent;
    const issuer = card.querySelector(".cert-issuer").textContent;
    const note = card.querySelector(".cert-note");
    modalTitle.textContent = title;
    modalIssuer.textContent = issuer;
    modalDesc.textContent = note ? note.textContent : "Certificate";
    modalDoc.href = "#";
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSingleModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  modalOverlay.addEventListener("click", closeSingleModal);
  modalClose.addEventListener("click", closeSingleModal);
  modalCloseBtn.addEventListener("click", closeSingleModal);

  // View All Certs Modal
  const certsAllModal = document.getElementById("certsAllModal");
  const certsAllOverlay = certsAllModal.querySelector(".certs-all-overlay");
  const certsAllClose = certsAllModal.querySelector(".certs-all-close");
  const viewAllBtn = document.getElementById("viewAllCerts");
  const allCertCards = certsAllModal.querySelectorAll(".cert-card");

  function openAllCerts() {
    certsAllModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeAllCerts() {
    certsAllModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  viewAllBtn.addEventListener("click", openAllCerts);
  certsAllOverlay.addEventListener("click", closeAllCerts);
  certsAllClose.addEventListener("click", closeAllCerts);

  // Click cert in View All modal → open single modal
  allCertCards.forEach(card => {
    card.addEventListener("click", () => {
      closeAllCerts();
      setTimeout(() => openSingleModal(card), 200);
    });
  });

  // ESC close both modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (certsAllModal.classList.contains("active")) {
        closeAllCerts();
      } else if (modal.classList.contains("active")) {
        closeSingleModal();
      }
    }
  });

  // Cert Auto-scroll (main view)
  const certScroll = document.querySelector(".cert-scroll");
  if (certScroll) {
    let autoScrollInterval;
    let userInteracting = false;

    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        if (!userInteracting) {
          certScroll.scrollTop += 1;
          if (certScroll.scrollTop >= certScroll.scrollHeight - certScroll.clientHeight) {
            certScroll.scrollTop = 0;
          }
        }
      }, 50);
    }

    certScroll.addEventListener("mouseenter", () => { userInteracting = true; });
    certScroll.addEventListener("mouseleave", () => { userInteracting = false; });
    certScroll.addEventListener("wheel", () => {
      userInteracting = true;
      clearTimeout(certScroll._resumeTimer);
      certScroll._resumeTimer = setTimeout(() => { userInteracting = false; }, 2000);
    }, { passive: true });
    certScroll.addEventListener("touchstart", () => {
      userInteracting = true;
      clearTimeout(certScroll._resumeTimer);
    }, { passive: true });
    certScroll.addEventListener("touchend", () => {
      certScroll._resumeTimer = setTimeout(() => { userInteracting = false; }, 2000);
    }, { passive: true });

    startAutoScroll();
  }

});
