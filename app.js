/**
 * Main Application Controller
 * Ties together Calculator, Visualizer, Animator, and ParticleEffects
 * Handles user interactions and coordinates educational visualizations
 */

class VisualCalculatorApp {
    constructor() {
        this.calculator = new Calculator();
        this.visualizer = new Visualizer();
        this.animator = new Animator();
        this.particles = new ParticleEffects();

        this.currentObjectType = 'star'; // star, heart, or circle
        this.objectTypes = ['star', 'heart', 'circle'];
        this.objectTypeIndex = 0;
    }

    /**
     * Initialize the application
     */
    async init() {
        console.log('🚀 Initializing Visual Calculator...');

        try {
            // Initialize all modules
            await this.visualizer.init();
            await this.particles.init();
            this.animator.initNumberLine();

            // Set up event listeners
            this.setupEventListeners();

            // Initialize display
            this.updateDisplay();
            this.updateVisualizations(0);

            console.log('✅ Visual Calculator ready!');
        } catch (error) {
            console.error('❌ Initialization error:', error);
        }
    }

    /**
     * Set up event listeners for calculator buttons
     */
    setupEventListeners() {
        // Number buttons
        const numberButtons = document.querySelectorAll('.number-btn');
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                this.handleNumberInput(value);
            });
        });

        // Operation buttons
        const operationButtons = document.querySelectorAll('.operation-btn');
        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                const operation = button.getAttribute('data-operation');
                this.handleOperation(operation);
            });
        });

        // Equals button
        const equalsButton = document.querySelector('.equals-btn');
        equalsButton.addEventListener('click', () => {
            this.handleEquals();
        });

        // Clear button
        const clearButton = document.querySelector('.clear-btn');
        clearButton.addEventListener('click', () => {
            this.handleClear();
        });

        // Backspace button
        const backspaceButton = document.querySelector('.backspace-btn');
        backspaceButton.addEventListener('click', () => {
            this.handleBackspace();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });

        // Click on visualizations to cycle object types
        const countingContainer = document.getElementById('countingObjectsContainer');
        if (countingContainer) {
            countingContainer.addEventListener('dblclick', () => {
                this.cycleObjectType();
            });
        }
    }

    /**
     * Handle number input
     */
    handleNumberInput(value) {
        const number = this.calculator.inputNumber(value);

        // Animate button press
        this.animateButtonPress(event.target);

        // Update display
        this.animateNumberEntry(number);

        // Update visualizations
        this.updateVisualizations(number);
    }

    /**
     * Handle operation input (+, -)
     */
    handleOperation(operation) {
        const data = this.calculator.inputOperation(operation);

        // Animate button press
        if (event && event.target) {
            this.animateButtonPress(event.target);
        }

        // Show operation in display
        this.animator.animateOperation(
            document.getElementById('displayOperation'),
            operation
        );

        // Update visualizations to show first number
        if (data.firstNumber !== null) {
            this.updateVisualizations(data.firstNumber);
        }
    }

    /**
     * Handle equals button
     */
    handleEquals() {
        const result = this.calculator.calculate();

        if (result === null) {
            // No calculation to perform
            this.animator.shake(document.querySelector('.calculation-display'));
            return;
        }

        // Animate button press
        if (event && event.target) {
            this.animateButtonPress(event.target);
        }

        // Perform calculation animation
        this.performCalculation(result);
    }

    /**
     * Handle clear button
     */
    handleClear() {
        this.calculator.clear();

        // Animate button press
        if (event && event.target) {
            this.animateButtonPress(event.target);
        }

        // Clear display with animation
        this.animator.clearDisplay();

        // Reset visualizations
        this.updateVisualizations(0);
    }

    /**
     * Handle backspace
     */
    handleBackspace() {
        const number = this.calculator.backspace();

        // Animate button press
        if (event && event.target) {
            this.animateButtonPress(event.target);
        }

        // Update display
        this.animateNumberEntry(number);

        // Update visualizations
        this.updateVisualizations(number);
    }

    /**
     * Handle keyboard input
     */
    handleKeyboard(e) {
        // Numbers 0-9
        if (e.key >= '0' && e.key <= '9') {
            this.calculator.inputNumber(e.key);
            this.animateNumberEntry(this.calculator.getCurrentValue());
            this.updateVisualizations(this.calculator.getCurrentValue());
        }
        // Operations
        else if (e.key === '+' || e.key === '-') {
            this.handleOperation(e.key);
        }
        // Equals
        else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            this.handleEquals();
        }
        // Clear
        else if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') {
            this.handleClear();
        }
        // Backspace
        else if (e.key === 'Backspace') {
            e.preventDefault();
            this.handleBackspace();
        }
    }

    /**
     * Perform calculation with full animation sequence
     */
    performCalculation(calcData) {
        const { firstNumber, operation, secondNumber, result } = calcData;

        // Animate the calculation sequence
        if (operation === '+') {
            this.animateAddition(firstNumber, secondNumber, result);
        } else if (operation === '-') {
            this.animateSubtraction(firstNumber, secondNumber, result);
        }

        // Update all visualizations to show result
        setTimeout(() => {
            this.updateVisualizations(result);

            // Update number bonds to show decomposition
            if (operation === '+') {
                this.animator.updateNumberBonds(result, firstNumber, secondNumber);
            } else {
                this.animator.updateNumberBonds(firstNumber, secondNumber, result);
            }

            // Celebration!
            this.celebrate(result);
        }, 1500);
    }

    /**
     * Animate addition operation
     */
    animateAddition(num1, num2, result) {
        // Display animation
        this.animator.animateAddition(num1, num2, result);

        // Number line: hop from 0 to num1, then hop num2 more times
        setTimeout(() => {
            this.animator.updateNumberLine(num1, true);
        }, 300);

        setTimeout(() => {
            this.animator.updateNumberLine(result, true);
        }, 1000);
    }

    /**
     * Animate subtraction operation
     */
    animateSubtraction(num1, num2, result) {
        // Display animation
        this.animator.animateSubtraction(num1, num2, result);

        // Number line: start at num1, hop back num2 times
        setTimeout(() => {
            this.animator.updateNumberLine(num1, true);
        }, 300);

        setTimeout(() => {
            this.animator.updateNumberLine(result, true);
        }, 1000);
    }

    /**
     * Animate number entry in display
     */
    animateNumberEntry(number) {
        const displayElement = document.getElementById('displayNumber1');
        this.animator.animateDisplayNumber(displayElement, number);
    }

    /**
     * Update all visualizations
     */
    updateVisualizations(number) {
        // Update ten frames
        this.visualizer.updateTenFrames(number, true);

        // Update counting objects
        this.visualizer.createCountingObjects(number, this.currentObjectType);
        this.visualizer.animateObjectsIn();

        // Update number line
        this.animator.updateNumberLine(number, true);

        // Update number bonds (show number as sum of parts)
        // For educational value, decompose using benchmark 5 or 10
        const { part1, part2 } = this.decomposeNumber(number);
        this.animator.updateNumberBonds(number, part1, part2, true);
    }

    /**
     * Decompose number into educationally meaningful parts
     * Uses benchmarks of 5 and 10 (research-based)
     */
    decomposeNumber(number) {
        if (number === 0) {
            return { part1: 0, part2: 0 };
        } else if (number <= 5) {
            // Decompose into smaller parts
            const part1 = Math.floor(number / 2);
            const part2 = number - part1;
            return { part1, part2 };
        } else if (number <= 10) {
            // Use 5 as benchmark
            return { part1: 5, part2: number - 5 };
        } else {
            // Use 10 as benchmark
            return { part1: 10, part2: number - 10 };
        }
    }

    /**
     * Celebration with particles
     */
    celebrate(result) {
        // Choose celebration based on result
        if (result === 20) {
            // Maximum! Special celebration
            this.particles.milestone();
        } else if (result >= 15) {
            this.particles.fireworks();
        } else if (result >= 10) {
            this.particles.success();
        } else {
            this.particles.celebrate('medium');
        }
    }

    /**
     * Cycle through object types (star → heart → circle)
     */
    cycleObjectType() {
        this.objectTypeIndex = (this.objectTypeIndex + 1) % this.objectTypes.length;
        this.currentObjectType = this.objectTypes[this.objectTypeIndex];

        // Update counting objects with new type
        const currentNumber = this.calculator.getCurrentValue();
        this.visualizer.createCountingObjects(currentNumber, this.currentObjectType);
        this.visualizer.animateObjectsIn();

        console.log(`🎨 Switched to ${this.currentObjectType} objects`);
    }

    /**
     * Animate button press
     */
    animateButtonPress(button) {
        if (!button || !window.gsap) return;

        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });
    }

    /**
     * Update display (simple, no animation)
     */
    updateDisplay() {
        const state = this.calculator.getState();
        document.getElementById('displayNumber1').textContent = state.currentNumber;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const app = new VisualCalculatorApp();
    app.init();

    // Make app globally accessible for debugging
    window.app = app;
});
