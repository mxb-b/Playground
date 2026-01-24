/**
 * Massachusetts Snow Storm Explorer - Snowfall Animation
 * Atmospheric canvas-based snow effect
 */

class SnowfallEffect {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.snowflakes = [];
        this.maxSnowflakes = 100;
        this.isRunning = false;
        this.animationFrame = null;

        this.init();
    }

    init() {
        this.canvas = document.getElementById('snowfall-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createSnowflakes();
        this.start();

        // Handle resize
        window.addEventListener('resize', () => this.resize());

        // Reduce intensity when user scrolls down
        window.addEventListener('scroll', () => this.adjustIntensity());
    }

    resize() {
        if (!this.canvas) return;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSnowflakes() {
        this.snowflakes = [];

        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.snowflakes.push(this.createSnowflake());
        }
    }

    createSnowflake() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            wind: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.3,
            swing: Math.random() * Math.PI * 2,
            swingSpeed: Math.random() * 0.02 + 0.01
        };
    }

    update() {
        this.snowflakes.forEach(flake => {
            // Update position
            flake.y += flake.speed;
            flake.x += flake.wind + Math.sin(flake.swing) * 0.5;
            flake.swing += flake.swingSpeed;

            // Reset if off screen
            if (flake.y > this.canvas.height) {
                flake.y = -flake.radius;
                flake.x = Math.random() * this.canvas.width;
            }

            if (flake.x > this.canvas.width) {
                flake.x = 0;
            } else if (flake.x < 0) {
                flake.x = this.canvas.width;
            }
        });
    }

    draw() {
        if (!this.ctx) return;

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw each snowflake
        this.snowflakes.forEach(flake => {
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            this.ctx.fill();

            // Add subtle glow
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity * 0.1})`;
            this.ctx.fill();
        });
    }

    animate() {
        if (!this.isRunning) return;

        this.update();
        this.draw();

        this.animationFrame = requestAnimationFrame(() => this.animate());
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.animate();
    }

    stop() {
        this.isRunning = false;
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
            this.animationFrame = null;
        }
    }

    adjustIntensity() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollY / (maxScroll * 0.3), 1);

        // Reduce opacity as user scrolls
        if (this.canvas) {
            this.canvas.style.opacity = Math.max(0.3, 1 - scrollPercent * 0.7);
        }
    }

    // Method to temporarily increase snowfall (e.g., during storm modal)
    intensify() {
        const originalMax = this.maxSnowflakes;
        this.maxSnowflakes = 200;

        // Add more snowflakes
        while (this.snowflakes.length < this.maxSnowflakes) {
            this.snowflakes.push(this.createSnowflake());
        }

        // Increase speed
        this.snowflakes.forEach(flake => {
            flake.speed *= 1.5;
        });

        // Reset after 5 seconds
        setTimeout(() => {
            this.maxSnowflakes = originalMax;
            this.snowflakes = this.snowflakes.slice(0, originalMax);
            this.snowflakes.forEach(flake => {
                flake.speed /= 1.5;
            });
        }, 5000);
    }

    // Toggle snow on/off
    toggle() {
        if (this.isRunning) {
            this.stop();
            if (this.canvas) {
                this.canvas.style.display = 'none';
            }
        } else {
            if (this.canvas) {
                this.canvas.style.display = 'block';
            }
            this.start();
        }
    }
}

// Initialize snowfall when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.snowfall = new SnowfallEffect();
});
