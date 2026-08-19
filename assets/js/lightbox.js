/**
 * Dependency-free lightbox for work-card images.
 *
 * Card media (.work-card > img) is decorative-looking but not a link --
 * card titles carry the real navigation. This file makes those images
 * clickable/keyboard-activatable to view the full, uncropped screenshot:
 * the card treatment crops tall shots (fit-top) and dims light-UI ones
 * (shot-light), but the overlay always shows the original image at its
 * natural aspect ratio via object-fit: contain, with no crop or filter.
 *
 * One overlay element is built lazily on first open and reused for every
 * card. Opening remembers the trigger element so closing (Esc, backdrop
 * click, or the close button) can restore focus to it.
 */
(function () {
  var overlay = null;
  var overlayImg = null;
  var closeButton = null;
  var lastTrigger = null;

  function buildOverlay() {
    overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Image viewer");
    overlay.hidden = true;

    closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "lightbox-close";
    closeButton.setAttribute("aria-label", "Close image viewer");
    closeButton.innerHTML = "&times;";
    closeButton.addEventListener("click", close);

    overlayImg = document.createElement("img");
    overlayImg.alt = "";
    overlayImg.addEventListener("click", function (event) {
      event.stopPropagation();
    });

    overlay.appendChild(closeButton);
    overlay.appendChild(overlayImg);
    overlay.addEventListener("click", close);

    document.body.appendChild(overlay);
  }

  function onKeydown(event) {
    if (event.key === "Escape" || event.keyCode === 27) {
      close();
    }
  }

  function open(trigger) {
    if (!overlay) {
      buildOverlay();
    }

    lastTrigger = trigger;
    overlayImg.src = trigger.currentSrc || trigger.src;
    overlayImg.alt = trigger.alt || "";

    overlay.hidden = false;
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("keydown", onKeydown);
    closeButton.focus();
  }

  function close() {
    if (!overlay || overlay.hidden) {
      return;
    }

    overlay.hidden = true;
    document.documentElement.style.overflow = "";
    document.removeEventListener("keydown", onKeydown);

    if (lastTrigger) {
      lastTrigger.focus();
    }
    lastTrigger = null;
  }

  function onTriggerKeydown(event) {
    if (event.key === "Enter" || event.key === " " || event.keyCode === 13 || event.keyCode === 32) {
      if (event.key === " " || event.keyCode === 32) {
        event.preventDefault();
      }
      open(event.currentTarget);
    }
  }

  function init() {
    var images = document.querySelectorAll(".work-card > img");
    if (!images.length) {
      return;
    }

    images.forEach(function (img) {
      img.classList.add("lightbox-zoom");
      img.setAttribute("tabindex", "0");
      img.setAttribute("role", "button");
      img.setAttribute(
        "aria-label",
        img.alt ? "View full size: " + img.alt : "View full size image"
      );

      img.addEventListener("click", function () {
        open(img);
      });
      img.addEventListener("keydown", onTriggerKeydown);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
