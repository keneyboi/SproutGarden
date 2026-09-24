// Sprout — small progressive-enhancement script for the landing page.
// Fades sections in as they scroll into view. If IntersectionObserver
// isn't available, or this script never runs, elements simply stay
// visible (see the .reveal / .reveal-init rules in wwwroot/css/app.css).
(function () {
    "use strict";

    function initReveal() {
        var items = document.querySelectorAll(".reveal");
        if (!items.length || !("IntersectionObserver" in window)) {
            return;
        }

        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.remove("reveal-init");
                        entry.target.classList.add("in-view");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
        );

        items.forEach(function (el) {
            // Only hide the element once we know we can observe it,
            // so a script error above never leaves content stuck at opacity: 0.
            el.classList.add("reveal-init");
            observer.observe(el);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initReveal);
    } else {
        initReveal();
    }
})();
