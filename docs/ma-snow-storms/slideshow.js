/**
 * Massachusetts Snow Storm Explorer - Photo Slideshow
 * Immersive photo gallery with Ken Burns effect and auto-play
 */

class Slideshow {
    constructor() {
        this.currentIndex = 0;
        this.isPlaying = false;
        this.autoPlayInterval = null;
        this.slideDuration = 6000; // 6 seconds per slide
        this.progressInterval = null;
        this.photos = [];
        this.filteredPhotos = [];

        this.init();
    }

    init() {
        this.photos = StormsDatabase.photos;
        this.filteredPhotos = [...this.photos];

        this.cacheElements();
        this.bindEvents();
        this.renderThumbnails();
        this.showSlide(0);
    }

    cacheElements() {
        this.slideshowImage = document.getElementById('slideshow-image');
        this.photoTitle = document.getElementById('photo-title');
        this.photoDate = document.getElementById('photo-date');
        this.photoLocation = document.getElementById('photo-location');
        this.photoCredit = document.getElementById('photo-credit');
        this.slideCounter = document.getElementById('slide-counter');
        this.progressBar = document.getElementById('progress-bar');
        this.thumbnailsContainer = document.getElementById('slideshow-thumbnails');
        this.playPauseBtn = document.getElementById('play-pause');
        this.prevBtn = document.querySelector('.slideshow-nav.prev');
        this.nextBtn = document.querySelector('.slideshow-nav.next');
        this.filterBtns = document.querySelectorAll('.gallery-filter-btn');
    }

    bindEvents() {
        // Navigation
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());

        // Play/Pause
        this.playPauseBtn?.addEventListener('click', () => this.togglePlay());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isGalleryVisible()) {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
                if (e.key === ' ') {
                    e.preventDefault();
                    this.togglePlay();
                }
            }
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filterPhotos(btn.dataset.filter);
            });
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        const slideshowMain = document.querySelector('.slideshow-main');
        slideshowMain?.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        slideshowMain?.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }

    handleSwipe(startX, endX) {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
        }
    }

    isGalleryVisible() {
        const gallery = document.getElementById('gallery');
        if (!gallery) return false;
        const rect = gallery.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }

    filterPhotos(category) {
        this.filteredPhotos = StormsDatabase.getPhotosByCategory(category);
        this.currentIndex = 0;
        this.renderThumbnails();
        this.showSlide(0);
    }

    renderThumbnails() {
        if (!this.thumbnailsContainer) return;

        this.thumbnailsContainer.innerHTML = this.filteredPhotos.map((photo, index) => `
            <div class="slideshow-thumbnail ${index === 0 ? 'active' : ''}"
                 data-index="${index}"
                 style="background-image: url('${photo.url}'); background-size: cover; background-position: center;">
            </div>
        `).join('');

        // Bind click events to thumbnails
        this.thumbnailsContainer.querySelectorAll('.slideshow-thumbnail').forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.dataset.index);
                this.showSlide(index);
            });
        });
    }

    showSlide(index) {
        if (this.filteredPhotos.length === 0) return;

        // Wrap around
        if (index >= this.filteredPhotos.length) index = 0;
        if (index < 0) index = this.filteredPhotos.length - 1;

        this.currentIndex = index;
        const photo = this.filteredPhotos[index];

        // Update image with Ken Burns effect
        if (this.slideshowImage) {
            // Set the actual image URL
            this.slideshowImage.style.backgroundImage = `url('${photo.url}')`;
            this.slideshowImage.style.transform = 'scale(1)';

            // Apply Ken Burns effect
            requestAnimationFrame(() => {
                this.slideshowImage.style.transform = 'scale(1.1)';
            });
        }

        // Update photo info
        if (this.photoTitle) this.photoTitle.textContent = photo.title;
        if (this.photoDate) this.photoDate.textContent = photo.date;
        if (this.photoLocation) this.photoLocation.textContent = photo.location;
        if (this.photoCredit) this.photoCredit.textContent = `Photo: ${photo.credit}`;

        // Update counter
        if (this.slideCounter) {
            this.slideCounter.textContent = `${index + 1} / ${this.filteredPhotos.length}`;
        }

        // Update active thumbnail
        const thumbnails = this.thumbnailsContainer?.querySelectorAll('.slideshow-thumbnail');
        thumbnails?.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        // Scroll thumbnail into view
        const activeThumbnail = this.thumbnailsContainer?.querySelector('.slideshow-thumbnail.active');
        activeThumbnail?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });

        // Reset progress bar
        this.resetProgress();
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        this.updatePlayPauseButton();
        this.startProgress();

        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
            this.startProgress();
        }, this.slideDuration);
    }

    pause() {
        this.isPlaying = false;
        this.updatePlayPauseButton();

        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }

        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
    }

    updatePlayPauseButton() {
        if (!this.playPauseBtn) return;

        const playIcon = this.playPauseBtn.querySelector('.play-icon');
        const pauseIcon = this.playPauseBtn.querySelector('.pause-icon');

        if (this.isPlaying) {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
        } else {
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
        }
    }

    startProgress() {
        if (!this.progressBar) return;

        this.progressBar.style.width = '0%';

        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }

        const increment = 100 / (this.slideDuration / 100);
        let progress = 0;

        this.progressInterval = setInterval(() => {
            progress += increment;
            this.progressBar.style.width = `${Math.min(progress, 100)}%`;

            if (progress >= 100) {
                clearInterval(this.progressInterval);
            }
        }, 100);
    }

    resetProgress() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }

        if (this.isPlaying) {
            this.startProgress();
        }
    }
}

// Initialize slideshow when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.slideshow = new Slideshow();
});
