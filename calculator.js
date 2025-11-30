/**
 * Calculator Logic
 * Handles state management and calculation operations for first-grade math (0-20)
 */

class Calculator {
    constructor() {
        this.currentNumber = 0;
        this.firstNumber = null;
        this.operation = null;
        this.result = null;
        this.isNewNumber = true;
        this.maxNumber = 20; // First grade appropriate range
    }

    /**
     * Handle number button press
     */
    inputNumber(num) {
        const digit = parseInt(num);

        if (this.isNewNumber) {
            this.currentNumber = digit;
            this.isNewNumber = false;
        } else {
            // Build two-digit number (max 20)
            const newNumber = this.currentNumber * 10 + digit;
            if (newNumber <= this.maxNumber) {
                this.currentNumber = newNumber;
            }
        }

        return this.currentNumber;
    }

    /**
     * Handle operation button press (+, -)
     */
    inputOperation(op) {
        if (this.firstNumber !== null && !this.isNewNumber) {
            // Complete previous operation first
            this.calculate();
        }

        this.firstNumber = this.currentNumber;
        this.operation = op;
        this.isNewNumber = true;

        return {
            firstNumber: this.firstNumber,
            operation: this.operation
        };
    }

    /**
     * Calculate the result
     */
    calculate() {
        if (this.firstNumber === null || this.operation === null) {
            return null;
        }

        const secondNumber = this.currentNumber;
        let result;

        switch (this.operation) {
            case '+':
                result = this.firstNumber + secondNumber;
                break;
            case '-':
                result = this.firstNumber - secondNumber;
                break;
            default:
                result = this.currentNumber;
        }

        // Ensure result stays within appropriate range
        // For first graders, we'll allow 0-20 for results
        // Negative numbers are typically introduced later
        if (result < 0) {
            result = 0; // Clamp to 0
        } else if (result > this.maxNumber) {
            result = this.maxNumber; // Clamp to 20
        }

        this.result = result;
        this.currentNumber = result;
        this.isNewNumber = true;

        const calculationData = {
            firstNumber: this.firstNumber,
            operation: this.operation,
            secondNumber: secondNumber,
            result: result
        };

        // Reset operation state
        this.firstNumber = null;
        this.operation = null;

        return calculationData;
    }

    /**
     * Clear all state
     */
    clear() {
        this.currentNumber = 0;
        this.firstNumber = null;
        this.operation = null;
        this.result = null;
        this.isNewNumber = true;

        return 0;
    }

    /**
     * Backspace - remove last digit
     */
    backspace() {
        if (this.isNewNumber) {
            return this.currentNumber;
        }

        const numStr = this.currentNumber.toString();
        if (numStr.length === 1) {
            this.currentNumber = 0;
            this.isNewNumber = true;
        } else {
            this.currentNumber = parseInt(numStr.slice(0, -1));
        }

        return this.currentNumber;
    }

    /**
     * Get current state
     */
    getState() {
        return {
            currentNumber: this.currentNumber,
            firstNumber: this.firstNumber,
            operation: this.operation,
            result: this.result,
            isNewNumber: this.isNewNumber
        };
    }

    /**
     * Get current display value
     */
    getCurrentValue() {
        return this.currentNumber;
    }

    /**
     * Check if a calculation is ready (has both numbers and operation)
     */
    isReadyToCalculate() {
        return this.firstNumber !== null && this.operation !== null && !this.isNewNumber;
    }
}

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.Calculator = Calculator;
}
