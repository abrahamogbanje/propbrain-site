/* PropBrain site settings and small page behaviours. The pages still work without this file. */
var PROPBRAIN = {
  // Checkout link for one lease. Leave empty to send the Single button to email instead.
  singleCheckoutUrl: "",
  // Checkout link for the 5-lease pack. Leave empty to send the Pack button to email instead.
  packCheckoutUrl: "",
  // Shown on the Pack card. Only say "Most popular" once real sales show it.
  packBadge: "Best value",
  email: "propbrainai@gmail.com",

  // Real data only: leave these empty and the page shows nothing in their place.
  // Testimonial: { quote: "...", name: "...", role: "..." } with the customer's permission.
  testimonials: [],
  // Metric: { value: "...", label: "..." } taken from docs/validation_log.md.
  metrics: []
};

(function () {
  var C = PROPBRAIN;

  function mailto(subject) {
    return "mailto:" + C.email + "?subject=" + encodeURIComponent(subject);
  }

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("nav-links");
  if (toggle && links) {
    var closeMenu = function () {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // Pricing buttons
  var single = document.getElementById("buy-single");
  if (single) {
    if (C.singleCheckoutUrl) {
      single.href = C.singleCheckoutUrl;
    } else {
      single.href = mailto("PropBrain single lease report order");
      single.textContent = "Order by email";
      document.getElementById("single-note").textContent = "We will reply with next steps.";
    }
  }
  var pack = document.getElementById("buy-pack");
  if (pack) {
    if (C.packCheckoutUrl) {
      pack.href = C.packCheckoutUrl;
    } else {
      pack.href = mailto("PropBrain 5-lease pack order");
      pack.textContent = "Order the 5-lease pack by email";
      document.getElementById("pack-note").textContent = "We will reply with next steps.";
    }
  }
  var badge = document.getElementById("pack-badge");
  if (badge) badge.textContent = C.packBadge;

  // Payment success overlay: closes by itself, or with Continue, a click or Escape
  var overlay = document.getElementById("pay-overlay");
  if (overlay) {
    var closed = false;
    var timer;
    var closeOverlay = function () {
      if (closed) return;
      closed = true;
      clearTimeout(timer);
      document.removeEventListener("keydown", onOverlayKey);
      overlay.classList.add("closing");
      document.body.style.overflow = "";
      setTimeout(function () { overlay.hidden = true; }, 400);
    };
    var onOverlayKey = function (e) {
      if (e.key === "Escape") closeOverlay();
    };
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    overlay.addEventListener("click", closeOverlay);
    document.addEventListener("keydown", onOverlayKey);
    timer = setTimeout(closeOverlay, 3500);
  }

  // Copy the order email
  var copy = document.getElementById("copy-email");
  var email = document.getElementById("order-email");
  if (copy && email) {
    copy.hidden = false;
    copy.addEventListener("click", function () {
      function done() {
        copy.textContent = "Copied";
        setTimeout(function () { copy.textContent = "Copy"; }, 1500);
      }
      function select() {
        var range = document.createRange();
        range.selectNodeContents(email);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(C.email).then(done, select);
      } else {
        select();
      }
    });
  }

  // Social proof: stays hidden until real entries are added above
  function make(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }
  var metrics = document.getElementById("metrics");
  if (metrics && C.metrics.length) {
    C.metrics.forEach(function (m) {
      var box = make("div", "metric");
      box.appendChild(make("b", "", m.value));
      box.appendChild(make("span", "", m.label));
      metrics.appendChild(box);
    });
    metrics.hidden = false;
  }
  var testimonials = document.getElementById("testimonials");
  if (testimonials && C.testimonials.length) {
    C.testimonials.forEach(function (t) {
      var fig = make("figure", "testimonial");
      fig.appendChild(make("blockquote", "", t.quote));
      fig.appendChild(make("figcaption", "", t.name + (t.role ? ", " + t.role : "")));
      testimonials.appendChild(fig);
    });
    testimonials.hidden = false;
  }
})();
