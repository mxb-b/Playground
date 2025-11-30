/**
 * Particles - tsParticles Celebration Effects
 * Creates engaging confetti and particle effects for correct answers
 * Maximum wow-factor for first graders!
 */

class ParticleEffects {
    constructor() {
        this.container = document.getElementById('confetti-canvas');
        this.initialized = false;
    }

    /**
     * Initialize tsParticles
     */
    async init() {
        try {
            // Check if tsParticles confetti is available
            if (typeof confetti !== 'undefined') {
                this.initialized = true;
                console.log('✅ Particle effects initialized');
            } else {
                console.warn('⚠️ tsParticles confetti not loaded');
            }
        } catch (error) {
            console.error('❌ Particle effects initialization error:', error);
        }
    }

    /**
     * Launch celebration confetti
     */
    celebrate(intensity = 'medium') {
        if (!this.initialized || typeof confetti === 'undefined') {
            console.warn('Confetti not available');
            return;
        }

        const configs = {
            small: this.getSmallConfettiConfig(),
            medium: this.getMediumConfettiConfig(),
            large: this.getLargeConfettiConfig()
        };

        const config = configs[intensity] || configs.medium;
        confetti(config);
    }

    /**
     * Small celebration (for simple operations)
     */
    getSmallConfettiConfig() {
        return {
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#9B59B6'],
            ticks: 200,
            gravity: 1,
            drift: 0,
            scalar: 0.8
        };
    }

    /**
     * Medium celebration (for correct answers)
     */
    getMediumConfettiConfig() {
        return {
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#9B59B6', '#3498DB'],
            ticks: 300,
            gravity: 1,
            drift: 1,
            scalar: 1
        };
    }

    /**
     * Large celebration (for milestones)
     */
    getLargeConfettiConfig() {
        return {
            particleCount: 150,
            spread: 120,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#9B59B6', '#3498DB'],
            ticks: 400,
            gravity: 0.8,
            drift: 2,
            scalar: 1.2,
            shapes: ['circle', 'square'],
            flat: false
        };
    }

    /**
     * Fireworks effect for special achievements
     */
    fireworks() {
        if (!this.initialized || typeof confetti === 'undefined') {
            return;
        }

        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 0,
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#9B59B6']
        };

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Fire from left
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });

            // Fire from right
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);
    }

    /**
     * Star burst effect
     */
    starBurst() {
        if (!this.initialized || typeof confetti === 'undefined') {
            return;
        }

        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ['star'],
            colors: ['#FFE66D', '#FFD700', '#FFA500']
        };

        const shoot = () => {
            confetti({
                ...defaults,
                particleCount: 40,
                scalar: 1.2,
                origin: { x: 0.5, y: 0.5 }
            });

            confetti({
                ...defaults,
                particleCount: 20,
                scalar: 0.75,
                origin: { x: 0.5, y: 0.5 }
            });
        };

        setTimeout(shoot, 0);
        setTimeout(shoot, 100);
        setTimeout(shoot, 200);
    }

    /**
     * Rainbow cascade effect
     */
    rainbowCascade() {
        if (!this.initialized || typeof confetti === 'undefined') {
            return;
        }

        const colors = [
            ['#FF6B6B', '#E74C3C'],
            ['#FFE66D', '#F39C12'],
            ['#95E1D3', '#1ABC9C'],
            ['#4ECDC4', '#16A085'],
            ['#9B59B6', '#8E44AD'],
            ['#3498DB', '#2980B9']
        ];

        let delay = 0;
        colors.forEach((colorPair) => {
            setTimeout(() => {
                confetti({
                    particleCount: 30,
                    spread: 70,
                    origin: { x: Math.random(), y: 0 },
                    colors: colorPair,
                    ticks: 300,
                    gravity: 1.2,
                    scalar: 1
                });
            }, delay);
            delay += 100;
        });
    }

    /**
     * Number celebration - confetti shaped like numbers
     */
    numberCelebration(number) {
        if (!this.initialized || typeof confetti === 'undefined') {
            return;
        }

        // Use emoji numbers if available
        const numberEmojis = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

        confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.6 },
            colors: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#9B59B6'],
            ticks: 250,
            gravity: 1,
            scalar: 1.2,
            drift: 0
        });

        // Add a second burst for extra impact
        setTimeout(() => {
            confetti({
                particleCount: 40,
                spread: 60,
                origin: { y: 0.6 },
                colors: ['#FFE66D', '#FFA500', '#FFD700'],
                ticks: 200,
                gravity: 0.8,
                scalar: 0.9
            });
        }, 200);
    }

    /**
     * Celebration based on result value
     * Larger numbers = bigger celebration!
     */
    celebrateByNumber(number) {
        if (number >= 15) {
            this.fireworks();
        } else if (number >= 10) {
            this.starBurst();
        } else if (number >= 5) {
            this.celebrate('medium');
        } else {
            this.celebrate('small');
        }
    }

    /**
     * Success celebration (for correct answers)
     */
    success() {
        this.celebrate('medium');

        // Add a delayed star burst for extra delight
        setTimeout(() => {
            this.starBurst();
        }, 300);
    }

    /**
     * Milestone celebration (for achievements like reaching 20)
     */
    milestone() {
        this.rainbowCascade();

        setTimeout(() => {
            this.fireworks();
        }, 500);
    }
}

// Helper function for random range
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.ParticleEffects = ParticleEffects;
}
