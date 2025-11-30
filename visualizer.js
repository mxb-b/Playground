/**
 * Visualizer - Pixi.js Graphics Engine
 * Creates interactive visual representations using hardware-accelerated 2D graphics
 * Educational features: Ten frames, counting objects, interactive manipulation
 */

class Visualizer {
    constructor() {
        this.tenFramesApp = null;
        this.countingObjectsApp = null;
        this.tenFrameSprites = [];
        this.countingSprites = [];
        this.initialized = false;
    }

    /**
     * Initialize Pixi.js applications
     */
    async init() {
        try {
            // Initialize Ten Frames Canvas
            await this.initTenFrames();

            // Initialize Counting Objects Canvas
            await this.initCountingObjects();

            this.initialized = true;
            console.log('✅ Visualizer initialized successfully');
        } catch (error) {
            console.error('❌ Visualizer initialization error:', error);
        }
    }

    /**
     * Initialize Ten Frames visualization
     */
    async initTenFrames() {
        const container = document.getElementById('tenFramesContainer');

        // Create Pixi application
        this.tenFramesApp = new PIXI.Application();
        await this.tenFramesApp.init({
            width: 500,
            height: 200,
            backgroundColor: 0xf8f9fa,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        container.appendChild(this.tenFramesApp.canvas);

        // Create ten frame structure (2 frames of 5x2)
        this.createTenFrameStructure();

        // Make canvas responsive
        this.makeResponsive(this.tenFramesApp, container);
    }

    /**
     * Create the ten frame grid structure
     */
    createTenFrameStructure() {
        const app = this.tenFramesApp;
        const frameWidth = 45;
        const frameHeight = 45;
        const spacing = 10;
        const startX = 50;
        const startY = 50;

        // Create two frames (0-10 and 10-20)
        for (let frame = 0; frame < 2; frame++) {
            const frameX = startX + frame * (5 * (frameWidth + spacing) + 30);

            // Draw frame outline
            const graphics = new PIXI.Graphics();
            graphics.rect(
                frameX - 5,
                startY - 5,
                5 * (frameWidth + spacing) + 5,
                2 * (frameHeight + spacing) + 5
            );
            graphics.stroke({ width: 3, color: 0xbdc3c7 });
            app.stage.addChild(graphics);

            // Create 10 cell positions (5 columns x 2 rows)
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 5; col++) {
                    const index = frame * 10 + row * 5 + col;
                    const x = frameX + col * (frameWidth + spacing);
                    const y = startY + row * (frameHeight + spacing);

                    // Draw cell background
                    const cell = new PIXI.Graphics();
                    cell.rect(0, 0, frameWidth, frameHeight);
                    cell.fill({ color: 0xecf0f1 });
                    cell.stroke({ width: 2, color: 0xbdc3c7 });
                    cell.x = x;
                    cell.y = y;
                    app.stage.addChild(cell);

                    // Create dot sprite (initially hidden)
                    const dot = this.createDot(x + frameWidth / 2, y + frameHeight / 2, index);
                    dot.visible = false;
                    app.stage.addChild(dot);
                    this.tenFrameSprites.push(dot);
                }
            }
        }
    }

    /**
     * Create a dot sprite for ten frames
     */
    createDot(x, y, index) {
        const graphics = new PIXI.Graphics();
        graphics.circle(0, 0, 18);

        // Color by position for visual grouping
        const colors = [
            0xFF6B6B, // Coral red
            0x4ECDC4, // Turquoise
            0xFFE66D, // Yellow
            0x95E1D3, // Mint
            0x9B59B6, // Purple
        ];
        const color = colors[index % 5];
        graphics.fill({ color: color });
        graphics.stroke({ width: 2, color: 0xffffff });

        const container = new PIXI.Container();
        container.x = x;
        container.y = y;
        container.addChild(graphics);

        // Add interactive properties
        container.eventMode = 'static';
        container.cursor = 'pointer';
        container.scale.set(0);

        // Store original position for animations
        container.originalX = x;
        container.originalY = y;
        container.index = index;

        return container;
    }

    /**
     * Update ten frames to show a specific number (0-20)
     */
    updateTenFrames(number, animate = true) {
        const validNumber = Math.max(0, Math.min(20, number));

        for (let i = 0; i < this.tenFrameSprites.length; i++) {
            const dot = this.tenFrameSprites[i];
            const shouldShow = i < validNumber;

            if (shouldShow && !dot.visible) {
                // Show dot with animation
                dot.visible = true;
                if (animate && window.gsap) {
                    gsap.fromTo(dot.scale,
                        { x: 0, y: 0 },
                        {
                            x: 1,
                            y: 1,
                            duration: 0.4,
                            delay: i * 0.05,
                            ease: 'back.out(1.7)'
                        }
                    );
                } else {
                    dot.scale.set(1);
                }
            } else if (!shouldShow && dot.visible) {
                // Hide dot with animation
                if (animate && window.gsap) {
                    gsap.to(dot.scale, {
                        x: 0,
                        y: 0,
                        duration: 0.3,
                        ease: 'back.in(1.7)',
                        onComplete: () => {
                            dot.visible = false;
                        }
                    });
                } else {
                    dot.visible = false;
                    dot.scale.set(0);
                }
            }
        }
    }

    /**
     * Initialize Counting Objects canvas
     */
    async initCountingObjects() {
        const container = document.getElementById('countingObjectsContainer');

        // Create Pixi application
        this.countingObjectsApp = new PIXI.Application();
        await this.countingObjectsApp.init({
            width: 500,
            height: 200,
            backgroundColor: 0xf8f9fa,
            antialias: true,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
        });

        container.appendChild(this.countingObjectsApp.canvas);

        // Make canvas responsive
        this.makeResponsive(this.countingObjectsApp, container);
    }

    /**
     * Create counting objects (stars, hearts, circles)
     */
    createCountingObjects(count, type = 'star') {
        // Clear existing objects
        this.countingSprites.forEach(sprite => sprite.destroy());
        this.countingSprites = [];

        const app = this.countingObjectsApp;
        const validCount = Math.max(0, Math.min(20, count));

        // Arrange objects in groups of 5 for easy subitizing
        const objectsPerRow = 5;
        const startX = 50;
        const startY = 50;
        const spacingX = 50;
        const spacingY = 60;

        for (let i = 0; i < validCount; i++) {
            const row = Math.floor(i / objectsPerRow);
            const col = i % objectsPerRow;
            const x = startX + col * spacingX;
            const y = startY + row * spacingY;

            const object = this.createCountingObject(x, y, type, i);
            app.stage.addChild(object);
            this.countingSprites.push(object);
        }
    }

    /**
     * Create a single counting object sprite
     */
    createCountingObject(x, y, type, index) {
        const graphics = new PIXI.Graphics();

        // Color variety
        const colors = [
            0xFF6B6B, 0x4ECDC4, 0xFFE66D, 0x95E1D3, 0x9B59B6
        ];
        const color = colors[index % colors.length];

        if (type === 'star') {
            this.drawStar(graphics, 0, 0, 5, 20, 10, color);
        } else if (type === 'heart') {
            this.drawHeart(graphics, 0, 0, 15, color);
        } else {
            graphics.circle(0, 0, 15);
            graphics.fill({ color: color });
            graphics.stroke({ width: 2, color: 0xffffff });
        }

        const container = new PIXI.Container();
        container.x = x;
        container.y = y;
        container.addChild(graphics);

        // Make interactive and draggable
        container.eventMode = 'static';
        container.cursor = 'pointer';
        container.on('pointerdown', (event) => this.onDragStart(event, container));

        // Store original position
        container.originalX = x;
        container.originalY = y;
        container.scale.set(0);

        return container;
    }

    /**
     * Draw a star shape
     */
    drawStar(graphics, x, y, points, outerRadius, innerRadius, color) {
        const step = Math.PI / points;
        graphics.moveTo(x, y - outerRadius);

        for (let i = 0; i < 2 * points; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = i * step - Math.PI / 2;
            graphics.lineTo(
                x + Math.cos(angle) * radius,
                y + Math.sin(angle) * radius
            );
        }

        graphics.closePath();
        graphics.fill({ color: color });
        graphics.stroke({ width: 2, color: 0xffffff });
    }

    /**
     * Draw a heart shape
     */
    drawHeart(graphics, x, y, size, color) {
        graphics.moveTo(x, y + size / 4);

        // Left curve
        graphics.bezierCurveTo(
            x, y - size / 4,
            x - size, y - size / 4,
            x - size, y + size / 4
        );
        graphics.bezierCurveTo(
            x - size, y + size / 2,
            x, y + size,
            x, y + size * 1.2
        );

        // Right curve
        graphics.bezierCurveTo(
            x, y + size,
            x + size, y + size / 2,
            x + size, y + size / 4
        );
        graphics.bezierCurveTo(
            x + size, y - size / 4,
            x, y - size / 4,
            x, y + size / 4
        );

        graphics.closePath();
        graphics.fill({ color: color });
        graphics.stroke({ width: 2, color: 0xffffff });
    }

    /**
     * Handle drag start for interactive objects
     */
    onDragStart(event, sprite) {
        sprite.data = event.data;
        sprite.dragging = true;
        sprite.alpha = 0.7;
        sprite.scale.set(1.2);

        sprite.on('pointermove', (e) => this.onDragMove(e, sprite));
        sprite.on('pointerup', () => this.onDragEnd(sprite));
        sprite.on('pointerupoutside', () => this.onDragEnd(sprite));
    }

    /**
     * Handle drag move
     */
    onDragMove(event, sprite) {
        if (sprite.dragging) {
            const newPosition = sprite.data.getLocalPosition(sprite.parent);
            sprite.x = newPosition.x;
            sprite.y = newPosition.y;
        }
    }

    /**
     * Handle drag end
     */
    onDragEnd(sprite) {
        sprite.alpha = 1;
        sprite.dragging = false;
        sprite.scale.set(1);
        sprite.data = null;
        sprite.off('pointermove');
        sprite.off('pointerup');
        sprite.off('pointerupoutside');
    }

    /**
     * Animate objects appearing
     */
    animateObjectsIn() {
        this.countingSprites.forEach((sprite, index) => {
            if (window.gsap) {
                gsap.to(sprite.scale, {
                    x: 1,
                    y: 1,
                    duration: 0.5,
                    delay: index * 0.08,
                    ease: 'elastic.out(1, 0.5)'
                });
            } else {
                sprite.scale.set(1);
            }
        });
    }

    /**
     * Make Pixi app responsive
     */
    makeResponsive(app, container) {
        const resize = () => {
            const parent = container;
            const ratio = app.screen.width / app.screen.height;
            const parentRatio = parent.clientWidth / parent.clientHeight;

            if (parentRatio > ratio) {
                app.renderer.canvas.style.width = 'auto';
                app.renderer.canvas.style.height = '100%';
            } else {
                app.renderer.canvas.style.width = '100%';
                app.renderer.canvas.style.height = 'auto';
            }
        };

        window.addEventListener('resize', resize);
        resize();
    }

    /**
     * Update all visualizations for a specific number
     */
    updateAll(number, objectType = 'star') {
        this.updateTenFrames(number);
        this.createCountingObjects(number, objectType);
        this.animateObjectsIn();
    }
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.Visualizer = Visualizer;
}
