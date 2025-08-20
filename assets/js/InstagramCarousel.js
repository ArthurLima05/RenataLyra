class InstagramCarousel {
    constructor() {
        this.track = document.getElementById("carouselTrack");
        this.dotsContainer = document.getElementById("dotsContainer");
        this.currentIndex = 0;
        this.items = document.querySelectorAll(".instagram-item");
        this.totalItems = this.items.length;

        this.init();
    }

    init() {
        this.loadInstagramPosts();
        this.createDots();
        this.bindEvents();
        this.updateCarousel();

        window.addEventListener("resize", () => {
            this.updateCarousel();
        });
    }

    loadInstagramPosts() {
        this.items.forEach((item, index) => {
            const instagramUrl = item.dataset.instagram;
            if (instagramUrl) {
                setTimeout(() => {
                    const blockquote = document.createElement("blockquote");
                    blockquote.className = "instagram-media";
                    blockquote.setAttribute("data-instgrm-permalink", instagramUrl);
                    blockquote.setAttribute("data-instgrm-version", "14");
                    blockquote.setAttribute("data-instgrm-captioned", "");

                    blockquote.style.cssText = `
                        max-width: 100% !important;
                        width: 100% !important;
                        height: auto !important;
                        display: block !important;
                        margin: 0 auto !important;
                    `;

                    item.appendChild(blockquote);
                    item.classList.add("loaded");

                    // Reprocessa o embed do Instagram
                    if (window.instgrm) {
                        window.instgrm.Embeds.process();
                    }
                }, index * 400);
            }
        });
    }

    createDots() {
        this.dotsContainer.innerHTML = "";
        for (let i = 0; i < this.totalItems; i++) {
            const dot = document.createElement("div");
            dot.className = "dot";
            if (i === 0) dot.classList.add("active");

            dot.addEventListener("click", () => {
                this.currentIndex = i;
                this.updateCarousel();
            });

            this.dotsContainer.appendChild(dot);
        }
    }

    bindEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;

        this.track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        });

        this.track.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
            e.preventDefault();
        });

        this.track.addEventListener("touchend", () => {
            if (!isDragging) return;
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
            isDragging = false;
        });
    }

    prevSlide() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.totalItems - 1;
        this.updateCarousel();
    }

    nextSlide() {
        this.currentIndex = this.currentIndex < this.totalItems - 1 ? this.currentIndex + 1 : 0;
        this.updateCarousel();
    }

    updateCarousel() {
        const itemWidth = this.track.clientWidth; // Largura do carrossel visível
        const offset = -this.currentIndex * itemWidth;
        this.track.style.transform = `translateX(${offset}px)`;

        document.querySelectorAll(".dot").forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
    }
}

// Inicializa o carrossel
document.addEventListener("DOMContentLoaded", () => {
    new InstagramCarousel();
});
