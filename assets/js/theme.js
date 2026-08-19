/**
 * Segmented three-state theme control: system / light / dark, one button
 * each, in the floating .dock.
 *
 * The no-flash part happens in _includes/head.html via a tiny inline,
 * blocking script that reads localStorage and sets data-theme before the
 * stylesheet paints. This file only has to run after that: it wires up the
 * three [data-set-theme] buttons, applies the chosen state, persists the
 * choice, and keeps aria-pressed in sync across all three buttons.
 *
 * "system" means: no explicit choice stored, follow the OS via the
 * prefers-color-scheme media query in site.css. That state is represented
 * here by having NO data-theme attribute on <html> at all.
 */
(function () {
  var STORAGE_KEY = "theme";
  var STATES = ["system", "light", "dark"];

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      if (value === "system") {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, value);
      }
    } catch (e) {
      /* Storage unavailable (private mode, disabled cookies) -- degrade to
         session-only state; the control still works, it just will not
         persist across a reload. */
    }
  }

  function currentState() {
    var stored = getStored();
    return STATES.indexOf(stored) === -1 ? "system" : stored;
  }

  function apply(state) {
    var root = document.documentElement;
    if (state === "system") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", state);
    }
  }

  function reflect(buttons, state) {
    buttons.forEach(function (button) {
      var pressed = button.getAttribute("data-set-theme") === state;
      button.setAttribute("aria-pressed", pressed ? "true" : "false");
    });
  }

  function init() {
    var buttons = Array.prototype.slice.call(
      document.querySelectorAll("[data-set-theme]")
    );
    if (!buttons.length) {
      return;
    }

    var state = currentState();
    reflect(buttons, state);

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        state = button.getAttribute("data-set-theme");
        apply(state);
        setStored(state);
        reflect(buttons, state);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
