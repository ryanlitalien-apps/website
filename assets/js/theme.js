/**
 * Three-state theme toggle: system -> light -> dark -> system.
 *
 * The no-flash part happens in _includes/head.html via a tiny inline,
 * blocking script that reads localStorage and sets data-theme before the
 * stylesheet paints. This file only has to run after that: it wires up the
 * visible toggle button, cycles state, persists the choice, and keeps the
 * button label in sync.
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
         session-only state; the toggle still works, it just will not
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

  function label(state) {
    return state.toUpperCase();
  }

  function init() {
    var button = document.querySelector("[data-theme-toggle]");
    if (!button) {
      return;
    }

    var state = currentState();
    button.textContent = label(state);
    button.setAttribute("aria-label", "Theme: " + state + ". Activate to change.");

    button.addEventListener("click", function () {
      var next = STATES[(STATES.indexOf(state) + 1) % STATES.length];
      state = next;
      apply(state);
      setStored(state);
      button.textContent = label(state);
      button.setAttribute("aria-label", "Theme: " + state + ". Activate to change.");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
