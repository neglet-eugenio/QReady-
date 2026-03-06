document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".product-card");
  const overlay = document.getElementById("pageOverlay");

  let activeCard = null;

  function openCard(card) {

  if (activeCard && activeCard !== card)
    closeCard();

  activeCard = card;

  const img = card.querySelector(".product-image");

  overlay.classList.add("visible");

  if (img && img.dataset.zoom) {

    img.dataset.original = img.src;

    const zoomSrc = img.dataset.zoom;

    // preload image FIRST
    const preload = new Image();
    preload.src = zoomSrc;

    img.classList.add("fade-out");

    preload.onload = () => {

      img.src = zoomSrc;
      img.classList.remove("fade-out");

      // ✅ ONLY zoom AFTER image fully loads
      card.classList.add("revealed", "zoomed");
    };

  } else {
    card.classList.add("revealed", "zoomed");
  }
}

  function closeCard() {

    if (!activeCard) return;

    const img = activeCard.querySelector(".product-image");

    if (img && img.dataset.original) {

      img.classList.add("fade-out");

      setTimeout(() => {
        img.src = img.dataset.original;
        img.classList.remove("fade-out");
      }, 200);
    }

    activeCard.classList.remove("revealed", "zoomed");
    overlay.classList.remove("visible");

    activeCard = null;
  }

  cards.forEach(card => {

    card.addEventListener("click", e => {

      if (e.target.classList.contains("add-to-cart"))
        return;

      card.classList.contains("zoomed")
        ? closeCard()
        : openCard(card);
    });

  });

  overlay.addEventListener("click", closeCard);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeCard();
  });

});