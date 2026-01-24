/**
 * Massachusetts Snow Storm Explorer - Main Application
 * Coordinates all components and handles global functionality
 */

class App {
    constructor() {
        this.currentSection = 'home';
        this.stormModal = null;
        this.learnModal = null;

        this.init();
    }

    init() {
        this.cacheElements();
        this.bindEvents();
        this.setHeroBackground();
        this.renderFeaturedStorm();
        this.renderStormsGrid();
        this.initScrollAnimations();
        this.initNavigation();
    }

    cacheElements() {
        this.stormModal = document.getElementById('storm-modal');
        this.learnModal = document.getElementById('learn-modal');
        this.modalBody = document.getElementById('modal-body');
        this.learnModalBody = document.getElementById('learn-modal-body');
        this.featuredStorm = document.getElementById('featured-storm');
        this.stormsGrid = document.getElementById('storms-grid');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinksContainer = document.querySelector('.nav-links');
        this.learnCards = document.querySelectorAll('.learn-card');
        this.heroSection = document.querySelector('.hero-section');
    }

    setHeroBackground() {
        if (this.heroSection && StormsDatabase.heroImages) {
            const heroUrl = StormsDatabase.heroImages.home;
            this.heroSection.style.setProperty('--hero-bg', `url('${heroUrl}')`);

            // Also set it directly on the hero background element
            const heroBg = this.heroSection.querySelector('.hero-background');
            if (heroBg) {
                heroBg.style.backgroundImage = `linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(26, 39, 68, 0.9) 100%), url('${heroUrl}')`;
                heroBg.style.backgroundSize = 'cover';
                heroBg.style.backgroundPosition = 'center';
            }
        }
    }

    bindEvents() {
        // Storm filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterStorms(btn.dataset.filter);
            });
        });

        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => this.closeModals());
        });

        // Close modal on background click
        [this.stormModal, this.learnModal].forEach(modal => {
            modal?.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModals();
            });
        });

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModals();
        });

        // Mobile menu toggle
        this.mobileMenuBtn?.addEventListener('click', () => {
            this.navLinksContainer?.classList.toggle('active');
        });

        // Learn cards
        this.learnCards.forEach(card => {
            card.addEventListener('click', () => {
                const topic = card.dataset.topic;
                this.openLearnModal(topic);
            });
        });

        // Smooth scroll for nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                this.scrollToSection(targetId);

                // Close mobile menu if open
                this.navLinksContainer?.classList.remove('active');
            });
        });
    }

    renderFeaturedStorm() {
        if (!this.featuredStorm) return;

        // Feature the Blizzard of 1978 as the default
        const storm = StormsDatabase.getStormById('blizzard-1978');
        if (!storm) return;

        this.featuredStorm.innerHTML = `
            <div class="featured-image">
                <img src="${storm.heroImage}" alt="${storm.name}" loading="lazy">
            </div>
            <div class="featured-content">
                <h3>${storm.name}</h3>
                <p class="featured-date">${storm.dateRange}</p>
                <p class="featured-description">${storm.shortDescription}</p>
                <div class="featured-stats">
                    <div class="featured-stat">
                        <span class="featured-stat-value">${storm.bostonSnowfallDisplay}</span>
                        <span class="featured-stat-label">Boston Snow</span>
                    </div>
                    <div class="featured-stat">
                        <span class="featured-stat-value">${storm.nesisCategory || 'N/A'}</span>
                        <span class="featured-stat-label">NESIS</span>
                    </div>
                    <div class="featured-stat">
                        <span class="featured-stat-value">${storm.deaths || 'Unknown'}</span>
                        <span class="featured-stat-label">Deaths</span>
                    </div>
                </div>
                <button class="featured-cta" data-storm-id="${storm.id}">Explore This Storm</button>
            </div>
        `;

        // Bind click event
        const cta = this.featuredStorm.querySelector('.featured-cta');
        cta?.addEventListener('click', () => this.openStormModal(storm.id));
    }

    renderStormsGrid(storms = null) {
        if (!this.stormsGrid) return;

        const stormsToRender = storms || StormsDatabase.storms;

        this.stormsGrid.innerHTML = stormsToRender.map(storm => `
            <div class="storm-card" data-storm-id="${storm.id}">
                <div class="storm-card-image">
                    <img src="${storm.cardImage}" alt="${storm.name}" loading="lazy">
                    <span class="year-overlay">${storm.year}</span>
                    ${storm.nesisCategory ? `<span class="storm-category">${storm.nesisCategory}</span>` : ''}
                </div>
                <div class="storm-card-content">
                    <h3 class="storm-card-title">${storm.name}</h3>
                    <p class="storm-card-date">${storm.dateRange}</p>
                    <div class="storm-card-stats">
                        <div class="storm-card-stat">
                            <span class="storm-card-stat-value">${storm.bostonSnowfallDisplay}</span>
                            <span class="storm-card-stat-label">Boston Snow</span>
                        </div>
                        <div class="storm-card-stat">
                            <span class="storm-card-stat-value">${storm.keyImpact.split(' ')[0]}</span>
                            <span class="storm-card-stat-label">Key Impact</span>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        // Bind click events
        this.stormsGrid.querySelectorAll('.storm-card').forEach(card => {
            card.addEventListener('click', () => {
                const stormId = card.dataset.stormId;
                this.openStormModal(stormId);
            });
        });

        // Animate cards in
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.storm-card',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out'
                }
            );
        }
    }

    filterStorms(category) {
        const storms = StormsDatabase.getStormsByCategory(category);
        this.renderStormsGrid(storms);
    }

    openStormModal(stormId) {
        const storm = StormsDatabase.getStormById(stormId);
        if (!storm || !this.stormModal || !this.modalBody) return;

        // Build image gallery HTML
        const imageGalleryHtml = storm.images && storm.images.length > 0 ? `
            <div class="modal-section">
                <h3>Photo Gallery</h3>
                <div class="storm-image-gallery">
                    ${storm.images.map((img, idx) => `
                        <div class="gallery-image-item" data-index="${idx}">
                            <img src="${img.url}" alt="${img.caption}" loading="lazy">
                            <div class="gallery-image-caption">${img.caption}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        this.modalBody.innerHTML = `
            <div class="modal-hero" style="background-image: url('${storm.heroImage}');">
                <div class="modal-hero-overlay">
                    <h2>${storm.name}</h2>
                    <p class="storm-date">${storm.dateRange}</p>
                </div>
            </div>

            <div class="modal-stats-grid">
                <div class="modal-stat">
                    <span class="modal-stat-value">${storm.bostonSnowfallDisplay}</span>
                    <span class="modal-stat-label">Boston Snow</span>
                </div>
                ${storm.nesisCategory ? `
                    <div class="modal-stat">
                        <span class="modal-stat-value">${storm.nesisCategory}</span>
                        <span class="modal-stat-label">NESIS Category</span>
                    </div>
                ` : ''}
                <div class="modal-stat">
                    <span class="modal-stat-value">${storm.duration}</span>
                    <span class="modal-stat-label">Duration</span>
                </div>
                <div class="modal-stat">
                    <span class="modal-stat-value">${storm.peakWinds}</span>
                    <span class="modal-stat-label">Peak Winds</span>
                </div>
                ${storm.deaths ? `
                    <div class="modal-stat">
                        <span class="modal-stat-value">${storm.deaths}</span>
                        <span class="modal-stat-label">Deaths</span>
                    </div>
                ` : ''}
                ${storm.powerOutages ? `
                    <div class="modal-stat">
                        <span class="modal-stat-value">${this.formatNumber(storm.powerOutages)}</span>
                        <span class="modal-stat-label">Power Outages</span>
                    </div>
                ` : ''}
            </div>

            ${imageGalleryHtml}

            <div class="modal-section">
                <h3>Overview</h3>
                <p>${storm.fullDescription}</p>
            </div>

            <div class="modal-section">
                <h3>Meteorological Analysis</h3>
                <p>${storm.meteorologicalAnalysis}</p>
            </div>

            <div class="modal-section">
                <h3>Regional Snowfall Totals</h3>
                <div class="regional-snowfall">
                    ${Object.entries(storm.regionalSnowfall).map(([location, amount]) => `
                        <div class="regional-item">
                            <span class="regional-location">${location}</span>
                            <span class="regional-amount">${amount}</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${storm.personalStories && storm.personalStories.length > 0 ? `
                <div class="modal-section">
                    <h3>Personal Accounts</h3>
                    ${storm.personalStories.map(story => `
                        <blockquote class="story-quote">
                            <p>"${story.quote}"</p>
                            <footer>— ${story.author}${story.context ? `, ${story.context}` : ''}</footer>
                        </blockquote>
                    `).join('')}
                </div>
            ` : ''}

            <div class="modal-section">
                <h3>Legacy</h3>
                <p>${storm.legacy}</p>
            </div>
        `;

        // Add styles
        this.injectModalStyles();

        this.stormModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Intensify snowfall effect
        if (window.snowfall) {
            window.snowfall.intensify();
        }
    }

    openLearnModal(topic) {
        const content = StormsDatabase.educationalContent[topic];
        if (!content || !this.learnModal || !this.learnModalBody) return;

        this.learnModalBody.innerHTML = `
            <div class="modal-header">
                <h2>${content.title}</h2>
            </div>
            <div class="educational-content">
                ${content.content}
            </div>
        `;

        this.learnModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeModals() {
        this.stormModal?.classList.remove('active');
        this.learnModal?.classList.remove('active');
        document.body.style.overflow = '';
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const navHeight = document.querySelector('.main-nav')?.offsetHeight || 0;
        const targetPosition = section.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        // Update active nav link
        this.navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
    }

    initNavigation() {
        // Update active nav link on scroll
        const sections = document.querySelectorAll('section[id]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    this.navLinks.forEach(link => {
                        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -50% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    initScrollAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        // Animate section titles
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.fromTo(title,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: title,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Animate section subtitles
        gsap.utils.toArray('.section-subtitle').forEach(subtitle => {
            gsap.fromTo(subtitle,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    delay: 0.2,
                    scrollTrigger: {
                        trigger: subtitle,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Animate learn cards
        gsap.utils.toArray('.learn-card').forEach((card, index) => {
            gsap.fromTo(card,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    delay: index * 0.1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Parallax effect on hero
        gsap.to('.hero-background', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

    formatNumber(num) {
        if (!num) return 'Unknown';
        if (typeof num === 'string') return num;
        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
        if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
        return num.toString();
    }

    injectModalStyles() {
        if (document.getElementById('modal-extra-styles')) return;

        const style = document.createElement('style');
        style.id = 'modal-extra-styles';
        style.textContent = `
            .modal-hero {
                height: 300px;
                background-size: cover;
                background-position: center;
                position: relative;
                margin: -2rem -2rem 2rem -2rem;
                border-radius: var(--radius-xl) var(--radius-xl) 0 0;
            }

            .modal-hero-overlay {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 3rem 2rem 2rem;
                background: linear-gradient(transparent, rgba(10, 22, 40, 0.95));
            }

            .modal-hero-overlay h2 {
                font-family: var(--font-display);
                font-size: 2.5rem;
                margin-bottom: 0.5rem;
                color: var(--snow-white);
            }

            .modal-hero-overlay .storm-date {
                color: var(--ice-blue);
                font-size: 1.125rem;
            }

            .storm-image-gallery {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }

            .gallery-image-item {
                position: relative;
                border-radius: var(--radius-md);
                overflow: hidden;
                cursor: pointer;
                transition: transform var(--transition-fast);
            }

            .gallery-image-item:hover {
                transform: scale(1.02);
            }

            .gallery-image-item img {
                width: 100%;
                height: 180px;
                object-fit: cover;
                display: block;
            }

            .gallery-image-caption {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                padding: 0.75rem;
                background: linear-gradient(transparent, rgba(10, 22, 40, 0.9));
                color: var(--snow-white);
                font-size: 0.8125rem;
            }

            .regional-snowfall {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                gap: 0.75rem;
            }

            .regional-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem 0.75rem;
                background: rgba(168, 213, 229, 0.1);
                border-radius: 4px;
            }

            .regional-location {
                color: var(--silver);
                font-size: 0.875rem;
            }

            .regional-amount {
                color: var(--ice-blue);
                font-weight: 600;
            }

            .story-quote {
                margin: 1rem 0;
                padding: 1rem 1.5rem;
                border-left: 3px solid var(--ice-blue);
                background: rgba(168, 213, 229, 0.05);
                border-radius: 0 8px 8px 0;
            }

            .story-quote p {
                font-style: italic;
                color: var(--snow-white);
                margin-bottom: 0.5rem;
            }

            .story-quote footer {
                color: var(--silver);
                font-size: 0.875rem;
            }

            .educational-content h3 {
                color: var(--ice-blue);
                margin-top: 1.5rem;
                margin-bottom: 0.75rem;
            }

            .educational-content h4 {
                color: var(--frost);
                margin-top: 1rem;
                margin-bottom: 0.5rem;
            }

            .educational-content ul,
            .educational-content ol {
                margin: 0.75rem 0;
                padding-left: 1.5rem;
            }

            .educational-content li {
                margin-bottom: 0.5rem;
                color: var(--silver);
            }

            .educational-content p {
                color: var(--silver);
                line-height: 1.7;
                margin-bottom: 0.75rem;
            }

            .educational-content dt {
                color: var(--ice-blue);
                font-weight: 600;
                margin-top: 1rem;
            }

            .educational-content dd {
                color: var(--silver);
                margin-left: 0;
                margin-bottom: 0.75rem;
            }

            .educational-content table {
                width: 100%;
                margin: 1rem 0;
                border-collapse: collapse;
            }

            .educational-content th,
            .educational-content td {
                padding: 0.75rem;
                text-align: left;
                border: 1px solid rgba(168, 213, 229, 0.2);
            }

            .educational-content th {
                background: rgba(168, 213, 229, 0.1);
                color: var(--ice-blue);
            }

            .educational-content td {
                color: var(--silver);
            }

            @media (max-width: 768px) {
                .modal-hero {
                    height: 200px;
                }

                .modal-hero-overlay h2 {
                    font-size: 1.75rem;
                }

                .storm-image-gallery {
                    grid-template-columns: 1fr 1fr;
                }

                .gallery-image-item img {
                    height: 120px;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});
