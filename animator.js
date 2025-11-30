/**
 * Animator - GSAP Animation Controller
 * Handles all smooth animations, transitions, and number line/number bonds updates
 * Uses GSAP for professional-grade animation timing
 */

class Animator {
    constructor() {
        this.numberLineInitialized = false;
        this.currentPosition = 0;
    }

    /**
     * Initialize the number line with tick marks
     */
    initNumberLine() {
        const svg = document.getElementById('numberLineSvg');
        const ticksGroup = document.getElementById('numberLineTicks');

        // Clear existing ticks
        ticksGroup.innerHTML = '';

        // Create tick marks for 0-20
        const lineStart = 50;
        const lineEnd = 550;
        const totalNumbers = 21; // 0 to 20 inclusive
        const spacing = (lineEnd - lineStart) / (totalNumbers - 1);

        for (let i = 0; i < totalNumbers; i++) {
            const x = lineStart + i * spacing;

            // Create tick mark
            const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            tick.setAttribute('x1', x);
            tick.setAttribute('y1', 55);
            tick.setAttribute('x2', x);
            tick.setAttribute('y2', 65);
            tick.setAttribute('class', 'number-line-tick');
            tick.setAttribute('stroke', '#34495e');
            tick.setAttribute('stroke-width', '2');
            ticksGroup.appendChild(tick);

            // Create number label (show every number for first grade)
            const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            label.setAttribute('x', x);
            label.setAttribute('y', 85);
            label.setAttribute('class', 'number-line-label');
            label.textContent = i;
            ticksGroup.appendChild(label);

            // Make multiples of 5 more prominent
            if (i % 5 === 0) {
                tick.setAttribute('y2', '70');
                tick.setAttribute('stroke-width', '3');
                label.setAttribute('font-size', '1.1rem');
                label.setAttribute('font-weight', '700');
            }
        }

        this.numberLineInitialized = true;
    }

    /**
     * Update number line position with hopping animation
     */
    updateNumberLine(targetNumber, animate = true) {
        if (!this.numberLineInitialized) {
            this.initNumberLine();
        }

        const character = document.getElementById('hopCharacter');
        const lineStart = 50;
        const lineEnd = 550;
        const totalNumbers = 21;
        const spacing = (lineEnd - lineStart) / (totalNumbers - 1);

        const targetX = lineStart + targetNumber * spacing;
        const targetY = 35; // Base Y position

        if (animate && window.gsap) {
            // Hopping animation with arc
            const currentX = this.currentPosition * spacing + lineStart;
            const distance = Math.abs(targetNumber - this.currentPosition);
            const hopHeight = Math.min(distance * 8, 40); // Higher hop for longer distances

            // Create hopping timeline
            const tl = gsap.timeline();

            if (distance > 0) {
                // Animate with multiple small hops
                const hops = Math.ceil(distance);
                const hopDuration = 0.3;

                for (let i = 0; i < hops; i++) {
                    const startPos = currentX + (i * (targetX - currentX) / hops);
                    const endPos = currentX + ((i + 1) * (targetX - currentX) / hops);
                    const midPos = (startPos + endPos) / 2;

                    tl.to(character, {
                        duration: hopDuration / 2,
                        attr: {
                            transform: `translate(${midPos}, ${targetY - hopHeight})`
                        },
                        ease: 'power1.out'
                    }, i * hopDuration);

                    tl.to(character, {
                        duration: hopDuration / 2,
                        attr: {
                            transform: `translate(${endPos}, ${targetY})`
                        },
                        ease: 'power1.in'
                    }, i * hopDuration + hopDuration / 2);
                }

                // Add squash and stretch
                tl.to(character.children[0], {
                    duration: 0.1,
                    attr: { r: 10 },
                    yoyo: true,
                    repeat: hops - 1,
                    ease: 'power1.inOut'
                }, 0);
            } else {
                // Just move to position
                gsap.to(character, {
                    duration: 0.3,
                    attr: {
                        transform: `translate(${targetX}, ${targetY})`
                    },
                    ease: 'power2.out'
                });
            }

            // Add happy bounce at the end
            tl.to(character, {
                duration: 0.2,
                scale: 1.2,
                yoyo: true,
                repeat: 1,
                ease: 'power1.inOut'
            });

        } else {
            // No animation, just set position
            character.setAttribute('transform', `translate(${targetX}, ${targetY})`);
        }

        this.currentPosition = targetNumber;
    }

    /**
     * Update number bonds visualization
     */
    updateNumberBonds(whole, part1, part2, animate = true) {
        // Update text values
        document.getElementById('bondWholeText').textContent = whole;
        document.getElementById('bondPart1Text').textContent = part1;
        document.getElementById('bondPart2Text').textContent = part2;

        if (animate && window.gsap) {
            // Animate circles with pulse
            gsap.fromTo('#bondWhole',
                { scale: 0.8, transformOrigin: 'center' },
                { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }
            );

            gsap.fromTo(['#bondPart1', '#bondPart2'],
                { scale: 0.8, transformOrigin: 'center' },
                {
                    scale: 1,
                    duration: 0.5,
                    delay: 0.2,
                    stagger: 0.1,
                    ease: 'elastic.out(1, 0.5)'
                }
            );

            // Animate lines
            gsap.fromTo(['#bondLine1', '#bondLine2'],
                { opacity: 0, strokeDasharray: '5,5', strokeDashoffset: 10 },
                {
                    opacity: 1,
                    strokeDashoffset: 0,
                    duration: 0.5,
                    delay: 0.15,
                    ease: 'power2.out'
                }
            );
        }
    }

    /**
     * Animate display number changes
     */
    animateDisplayNumber(element, newValue) {
        if (!window.gsap) {
            element.textContent = newValue;
            return;
        }

        // Bounce in animation
        const tl = gsap.timeline();

        tl.to(element, {
            scale: 0,
            duration: 0.2,
            ease: 'back.in(2)',
            onComplete: () => {
                element.textContent = newValue;
            }
        });

        tl.to(element, {
            scale: 1,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)'
        });

        // Add color flash
        tl.to(element, {
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
            duration: 0.2,
            yoyo: true,
            repeat: 1
        }, '-=0.2');
    }

    /**
     * Animate operation display
     */
    animateOperation(element, operation) {
        if (!window.gsap) {
            element.textContent = operation;
            return;
        }

        element.textContent = operation;

        gsap.fromTo(element,
            { scale: 0, rotation: -180 },
            {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: 'back.out(1.7)'
            }
        );
    }

    /**
     * Animate result with celebration
     */
    animateResult(element, result) {
        if (!window.gsap) {
            element.textContent = result;
            return;
        }

        const tl = gsap.timeline();

        // Show equals sign first
        const equalsElement = document.getElementById('displayEquals');
        equalsElement.textContent = '=';

        tl.fromTo(equalsElement,
            { scale: 0, rotation: -90 },
            {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: 'back.out(1.7)'
            }
        );

        // Then show result with big impact
        tl.fromTo(element,
            { scale: 0, y: -50, opacity: 0 },
            {
                scale: 1,
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'elastic.out(1, 0.5)',
                onStart: () => {
                    element.textContent = result;
                }
            }
        );

        // Pulsing glow effect
        tl.to(element, {
            textShadow: '0 0 30px rgba(149, 225, 211, 1)',
            duration: 0.3,
            yoyo: true,
            repeat: 3
        }, '-=0.3');

        return tl;
    }

    /**
     * Animate addition operation visually
     */
    animateAddition(num1, num2, result) {
        // This will coordinate with visualizations
        const tl = gsap.timeline();

        // Sequence: show first number → show operation → show second number → show result
        tl.call(() => {
            this.animateDisplayNumber(document.getElementById('displayNumber1'), num1);
        });

        tl.call(() => {
            this.animateOperation(document.getElementById('displayOperation'), '+');
        }, '+=0.3');

        tl.call(() => {
            this.animateDisplayNumber(document.getElementById('displayNumber2'), num2);
        }, '+=0.3');

        tl.call(() => {
            this.animateResult(document.getElementById('displayResult'), result);
        }, '+=0.5');

        return tl;
    }

    /**
     * Animate subtraction operation visually
     */
    animateSubtraction(num1, num2, result) {
        const tl = gsap.timeline();

        tl.call(() => {
            this.animateDisplayNumber(document.getElementById('displayNumber1'), num1);
        });

        tl.call(() => {
            this.animateOperation(document.getElementById('displayOperation'), '−');
        }, '+=0.3');

        tl.call(() => {
            this.animateDisplayNumber(document.getElementById('displayNumber2'), num2);
        }, '+=0.3');

        tl.call(() => {
            this.animateResult(document.getElementById('displayResult'), result);
        }, '+=0.5');

        return tl;
    }

    /**
     * Clear display with animation
     */
    clearDisplay() {
        if (!window.gsap) {
            document.getElementById('displayNumber1').textContent = '0';
            document.getElementById('displayNumber2').textContent = '';
            document.getElementById('displayOperation').textContent = '';
            document.getElementById('displayEquals').textContent = '';
            document.getElementById('displayResult').textContent = '';
            return;
        }

        const elements = [
            document.getElementById('displayNumber1'),
            document.getElementById('displayNumber2'),
            document.getElementById('displayOperation'),
            document.getElementById('displayEquals'),
            document.getElementById('displayResult')
        ];

        gsap.to(elements, {
            scale: 0,
            duration: 0.2,
            stagger: 0.05,
            ease: 'back.in(2)',
            onComplete: () => {
                document.getElementById('displayNumber1').textContent = '0';
                document.getElementById('displayNumber2').textContent = '';
                document.getElementById('displayOperation').textContent = '';
                document.getElementById('displayEquals').textContent = '';
                document.getElementById('displayResult').textContent = '';

                // Bounce back the zero
                gsap.to(document.getElementById('displayNumber1'), {
                    scale: 1,
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });
    }

    /**
     * Shake animation for errors or limits
     */
    shake(element) {
        if (!window.gsap) return;

        gsap.to(element, {
            x: -10,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: 'power1.inOut',
            onComplete: () => {
                gsap.set(element, { x: 0 });
            }
        });
    }
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.Animator = Animator;
}
