(function () {
    "use strict";

    var root = document.documentElement;
    var toArray = function (list) { return Array.prototype.slice.call(list); };

    /* =========================
       Theme toggle
       ========================= */
    var toggle = document.querySelector("[data-theme-toggle]");
    var prefersLight = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;

    function currentTheme() {
        var chosen = root.getAttribute("data-theme");
        if (chosen === "light" || chosen === "dark") return chosen;
        return prefersLight && prefersLight.matches ? "light" : "dark";
    }

    function syncTheme() {
        var next = currentTheme() === "dark" ? "light" : "dark";
        if (toggle) {
            toggle.setAttribute("aria-label", "Switch to " + next + " theme");
            toggle.setAttribute("title", "Switch to " + next + " theme");
        }
        // Keep the mobile browser chrome in step with a manually chosen theme
        var bg = getComputedStyle(root).getPropertyValue("--bg").trim();
        toArray(document.querySelectorAll('meta[name="theme-color"]')).forEach(function (meta) {
            meta.setAttribute("content", bg);
        });
    }

    if (toggle) {
        toggle.addEventListener("click", function () {
            var next = currentTheme() === "dark" ? "light" : "dark";
            root.setAttribute("data-theme", next);
            try { localStorage.setItem("theme", next); } catch (e) { }
            syncTheme();
        });
        if (prefersLight && prefersLight.addEventListener) {
            prefersLight.addEventListener("change", syncTheme);
        }
        syncTheme();
    }

    /* =========================
       Highlight the section in view
       ========================= */
    var navList = document.querySelector(".site-nav ul");
    var navLinks = toArray(document.querySelectorAll('.site-nav a[href^="#"]'));
    var sections = navLinks
        .map(function (link) { return document.getElementById(link.hash.slice(1)); })
        .filter(Boolean);
    var activeId = null;
    var ticking = false;

    function setActive(id) {
        activeId = id;
        navLinks.forEach(function (link) {
            if (link.hash !== "#" + id) {
                link.removeAttribute("aria-current");
                return;
            }
            link.setAttribute("aria-current", "true");
            // On small screens the nav scrolls sideways: keep the active pill in view
            if (navList && navList.scrollWidth > navList.clientWidth) {
                var listBox = navList.getBoundingClientRect();
                var linkBox = link.getBoundingClientRect();
                var offset = (linkBox.left + linkBox.width / 2) - (listBox.left + listBox.width / 2);
                navList.scrollBy({ left: offset, behavior: "smooth" });
            }
        });
    }

    function updateActive() {
        ticking = false;
        var marker = window.innerHeight * 0.35;
        var current = null;
        sections.forEach(function (section) {
            if (section.getBoundingClientRect().top <= marker) current = section.id;
        });
        var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
        if (atBottom && sections.length) current = sections[sections.length - 1].id;
        if (current !== activeId) setActive(current);
    }

    function requestUpdate() {
        if (!ticking) {
            ticking = true;
            window.requestAnimationFrame(updateActive);
        }
    }

    if (sections.length) {
        window.addEventListener("scroll", requestUpdate, { passive: true });
        window.addEventListener("resize", requestUpdate);
        updateActive();
    }

    /* =========================
       Sideways-scrolling rows (mobile nav, filters):
       drop the edge fade once the row is scrolled to its end
       ========================= */
    toArray(document.querySelectorAll(".site-nav ul, .filters")).forEach(function (row) {
        function syncFade() {
            row.classList.toggle("is-scrolled-end", row.scrollLeft + row.clientWidth >= row.scrollWidth - 2);
        }
        row.addEventListener("scroll", syncFade, { passive: true });
        window.addEventListener("resize", syncFade);
        syncFade();
    });

    /* =========================
       Project filters
       ========================= */
    var filterButtons = toArray(document.querySelectorAll("[data-filter]"));
    var cards = toArray(document.querySelectorAll("[data-categories]"));
    var filterStatus = document.querySelector("[data-filter-status]");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            var filter = button.getAttribute("data-filter");
            var shown = 0;

            filterButtons.forEach(function (b) {
                b.setAttribute("aria-pressed", b === button ? "true" : "false");
            });
            cards.forEach(function (card) {
                var match = filter === "all" ||
                    card.getAttribute("data-categories").split(" ").indexOf(filter) !== -1;
                card.hidden = !match;
                if (match) shown++;
            });
            if (filterStatus) {
                filterStatus.textContent = "Showing " + shown + " project" + (shown === 1 ? "" : "s");
            }
        });
    });
})();
