document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll(".container ul li a");
    const sections = document.querySelectorAll(".page-container section");

    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = link.getAttribute("data-section");
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: "smooth" });
            links.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        });
    });

    window.addEventListener("scroll", function() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute("id");
            }
        });

        links.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("data-section") === current) {
                link.classList.add("active");
            }
        });
    });
});
