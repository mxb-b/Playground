/**
 * Massachusetts Snow Storm Explorer - Interactive Timeline
 * Navigable timeline showing 300 years of storm history
 */

class Timeline {
    constructor() {
        this.storms = [];
        this.activeStorm = null;
        this.zoomLevel = 1;
        this.minYear = 1717;
        this.maxYear = 2015;

        this.init();
    }

    init() {
        this.storms = StormsDatabase.getSortedByYear();
        this.cacheElements();
        this.renderTimeline();
        this.bindEvents();
    }

    cacheElements() {
        this.container = document.getElementById('timeline-container');
        this.eventsContainer = document.getElementById('timeline-events');
        this.detailContainer = document.getElementById('timeline-detail');
        this.rangeDisplay = document.getElementById('timeline-range');
        this.zoomBtns = document.querySelectorAll('.timeline-zoom');
    }

    bindEvents() {
        // Zoom controls
        this.zoomBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.zoom === 'in') {
                    this.zoomIn();
                } else {
                    this.zoomOut();
                }
            });
        });

        // Horizontal scroll with mouse wheel
        this.container?.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
                e.preventDefault();
                this.container.scrollLeft += e.deltaY;
            }
        }, { passive: false });

        // Touch scroll
        let isScrolling = false;
        let startX = 0;
        let scrollLeft = 0;

        this.container?.addEventListener('touchstart', (e) => {
            isScrolling = true;
            startX = e.touches[0].pageX - this.container.offsetLeft;
            scrollLeft = this.container.scrollLeft;
        });

        this.container?.addEventListener('touchmove', (e) => {
            if (!isScrolling) return;
            e.preventDefault();
            const x = e.touches[0].pageX - this.container.offsetLeft;
            const walk = (x - startX) * 2;
            this.container.scrollLeft = scrollLeft - walk;
        });

        this.container?.addEventListener('touchend', () => {
            isScrolling = false;
        });
    }

    renderTimeline() {
        if (!this.eventsContainer) return;

        this.eventsContainer.innerHTML = this.storms.map((storm, index) => {
            const categoryClass = this.getCategoryClass(storm);
            const position = this.getPosition(storm.year);

            return `
                <div class="timeline-event ${categoryClass}"
                     data-storm-id="${storm.id}"
                     style="left: ${position}%;">
                    <div class="timeline-marker"></div>
                    <div class="timeline-label">
                        <span class="timeline-year">${storm.year}</span>
                        <span class="timeline-name">${this.getShortName(storm.name)}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Bind click events
        this.eventsContainer.querySelectorAll('.timeline-event').forEach(event => {
            event.addEventListener('click', () => {
                const stormId = event.dataset.stormId;
                this.selectStorm(stormId);

                // Update active class
                this.eventsContainer.querySelectorAll('.timeline-event').forEach(e => {
                    e.classList.remove('active');
                });
                event.classList.add('active');
            });
        });

        this.updateRangeDisplay();
    }

    getPosition(year) {
        const range = this.maxYear - this.minYear;
        const position = ((year - this.minYear) / range) * 100;
        return Math.max(2, Math.min(98, position));
    }

    getCategoryClass(storm) {
        if (storm.nesisCategory === 'Cat 5' || storm.category === 'cat5') return 'cat5';
        if (storm.nesisCategory === 'Cat 4' || storm.category === 'cat4') return 'cat4';
        if (storm.nesisCategory === 'Cat 3' || storm.category === 'cat3') return 'cat3';
        return '';
    }

    getShortName(name) {
        // Shorten long names for display
        if (name.length > 20) {
            if (name.includes('1717')) return 'Great Snow';
            if (name.includes('1888')) return 'Great Blizzard';
            if (name.includes('Presidents')) return 'Presidents Day';
            if (name.includes('Winter of 2015')) return 'Winter 2015';
            return name.split(' ').slice(0, 2).join(' ');
        }
        return name;
    }

    selectStorm(stormId) {
        const storm = StormsDatabase.getStormById(stormId);
        if (!storm || !this.detailContainer) return;

        this.activeStorm = storm;

        this.detailContainer.innerHTML = `
            <div class="timeline-detail-content">
                <div class="timeline-detail-info">
                    <h3>${storm.name}</h3>
                    <p class="timeline-detail-date">${storm.dateRange}</p>
                    <p class="timeline-detail-description">${storm.shortDescription}</p>
                </div>
                <div class="timeline-detail-stats">
                    <div class="featured-stat">
                        <span class="featured-stat-value">${storm.bostonSnowfallDisplay}</span>
                        <span class="featured-stat-label">Boston Snow</span>
                    </div>
                    ${storm.nesisCategory ? `
                        <div class="featured-stat">
                            <span class="featured-stat-value">${storm.nesisCategory}</span>
                            <span class="featured-stat-label">NESIS</span>
                        </div>
                    ` : ''}
                    ${storm.deaths ? `
                        <div class="featured-stat">
                            <span class="featured-stat-value">${storm.deaths}</span>
                            <span class="featured-stat-label">Deaths</span>
                        </div>
                    ` : ''}
                    <div class="featured-stat">
                        <span class="featured-stat-value">${storm.duration}</span>
                        <span class="featured-stat-label">Duration</span>
                    </div>
                </div>
            </div>
            <button class="featured-cta view-storm-btn" data-storm-id="${storm.id}">
                View Full Details
            </button>
        `;

        // Bind click event to view button
        const viewBtn = this.detailContainer.querySelector('.view-storm-btn');
        viewBtn?.addEventListener('click', () => {
            window.app?.openStormModal(storm.id);
        });

        // Animate in
        gsap.fromTo(this.detailContainer,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        );
    }

    zoomIn() {
        if (this.zoomLevel < 3) {
            this.zoomLevel++;
            this.updateZoom();
        }
    }

    zoomOut() {
        if (this.zoomLevel > 1) {
            this.zoomLevel--;
            this.updateZoom();
        }
    }

    updateZoom() {
        if (!this.container) return;

        const baseWidth = 1200;
        const newWidth = baseWidth * this.zoomLevel;
        this.container.style.minWidth = `${newWidth}px`;

        this.updateRangeDisplay();
    }

    updateRangeDisplay() {
        if (this.rangeDisplay) {
            this.rangeDisplay.textContent = `${this.minYear} - ${this.maxYear}`;
        }
    }

    scrollToYear(year) {
        if (!this.container) return;

        const position = this.getPosition(year);
        const scrollPosition = (position / 100) * this.container.scrollWidth - this.container.clientWidth / 2;

        this.container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }

    scrollToStorm(stormId) {
        const storm = StormsDatabase.getStormById(stormId);
        if (storm) {
            this.scrollToYear(storm.year);
            this.selectStorm(stormId);

            // Highlight the event
            const event = this.eventsContainer?.querySelector(`[data-storm-id="${stormId}"]`);
            if (event) {
                this.eventsContainer.querySelectorAll('.timeline-event').forEach(e => {
                    e.classList.remove('active');
                });
                event.classList.add('active');
            }
        }
    }
}

// Initialize timeline when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.timeline = new Timeline();
});
