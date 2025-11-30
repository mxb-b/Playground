# 🎨 Visual Calculator for First Graders

An engaging, educational web application designed to help first graders (ages 6-7) develop strong number sense through interactive visual representations.

## 🎯 Educational Goals

Based on current research in early mathematics education (2024-2025), this calculator helps students:

- **Develop Subitizing Skills**: Instantly recognize quantities without counting
- **Understand Part-Whole Relationships**: See how numbers combine and decompose through number bonds
- **Build Mental Math Foundations**: Use benchmark numbers (5 and 10) for computation
- **Visualize Number Relationships**: Understand continuity through the number line
- **Practice Flexible Thinking**: See the same number represented multiple ways

## 🌟 Features

### Multiple Visual Representations

1. **Ten Frames** - Classic 5×2 grids with animated, colorful dots
2. **Number Bonds** - Show part-whole relationships (e.g., 8 = 5 + 3)
3. **Number Line** - Interactive character that hops along from 0-20
4. **Counting Objects** - Draggable stars, hearts, and circles grouped for easy counting

### Interactive Elements

- **Large Touch-Friendly Buttons**: Perfect for small fingers and tablets
- **Draggable Objects**: Students can manipulate counting objects
- **Multiple Object Types**: Double-click counting area to cycle through stars, hearts, and circles
- **Keyboard Support**: Full keyboard navigation for accessibility

### Engaging Animations

- **Smooth Transitions**: Hardware-accelerated graphics via Pixi.js
- **Professional Timing**: GSAP-powered animations with perfect easing
- **Celebration Effects**: Confetti, fireworks, and star bursts for correct answers
- **Responsive Feedback**: Visual and animated feedback for all interactions

## 🛠️ Technology Stack

### Core Technologies
- **HTML5**: Semantic structure
- **CSS3**: Modern styling with CSS Grid and Flexbox
- **Vanilla JavaScript**: No framework dependencies

### Animation & Graphics Libraries
- **Pixi.js v8**: Hardware-accelerated 2D rendering engine
- **GSAP v3**: Professional animation library
- **tsParticles v3**: Celebration effects and confetti

### Educational Framework
Built following the **CRA (Concrete-Representational-Abstract)** framework:
- Concrete: Interactive manipulation of objects
- Representational: Visual models (ten frames, number bonds)
- Abstract: Numerals and symbols

## 📁 Project Structure

```
/
├── index.html          # Main application structure
├── styles.css          # Playful, kid-friendly styling
├── calculator.js       # Calculator logic (0-20 operations)
├── visualizer.js       # Pixi.js graphics engine
├── animator.js         # GSAP animation controller
├── particles.js        # tsParticles celebration effects
├── app.js              # Main application controller
└── README.md           # Documentation
```

## 🚀 Getting Started

### Simple Setup

1. Clone or download this repository
2. Open `index.html` in a modern web browser
3. Start calculating!

No build process, no dependencies to install. Everything loads from CDNs.

### Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

**Requirements:**
- JavaScript enabled
- WebGL support (for Pixi.js)

## 📚 How to Use

### Basic Operations

1. **Enter a number** (0-20) using the number pad or keyboard
2. **Choose an operation** (+ or −)
3. **Enter second number**
4. **Press equals** (=) to see the result with visual animations
5. **Watch the magic**: All four visualizations update simultaneously!

### Keyboard Shortcuts

- `0-9`: Enter numbers
- `+` / `-`: Operations
- `Enter` or `=`: Calculate
- `Backspace`: Remove last digit
- `Esc` or `C`: Clear all

### Interactive Features

- **Double-click** the counting objects area to change object types (star → heart → circle)
- **Drag** counting objects around the canvas (Pixi.js interactive mode)
- Watch the **number line character hop** to the answer
- See **number bonds** automatically decompose using educational benchmarks

## 🎓 Educational Research Foundation

This calculator is built on current best practices in mathematics education:

### Key Research Findings

1. **Ten Frames Effectiveness**
   - Students using ten frames significantly outperform traditional instruction
   - Develops subitizing and one-to-one correspondence
   - Research: Fuson & Briars (1990), Van de Walle (1988)

2. **CRA Framework**
   - 2025 meta-analysis shows effect size of 0.9965 (extremely strong)
   - Students progress: Concrete → Representational → Abstract
   - Research: Ebner, MacDonald, Grekov, Aspiranti (2025)

3. **Number Bonds**
   - Critical for developing part-whole thinking
   - "Forge the number sense needed for early primary students"
   - Foundation for all arithmetic operations

4. **Multiple Representations**
   - Students benefit from seeing numbers in various formats simultaneously
   - Develops flexible thinking and deeper understanding
   - Interactive visualizations improve retention by 60%

### Age-Appropriate Design

- **Range 0-20**: Aligned with first-grade standards
- **Addition & Subtraction Only**: Grade-appropriate operations
- **Benchmark Numbers**: Uses 5 and 10 as visual anchors
- **No Negative Results**: Clamped to 0 minimum

## 🎨 Design Principles

### Visual Design
- **Bright, Primary Colors**: Coral red, turquoise, sunny yellow, mint green
- **Rounded Corners**: Playful, non-threatening aesthetic
- **Large Elements**: Easy to see and interact with
- **High Contrast**: Accessible for all learners

### Typography
- **Fredoka**: Display font (rounded, friendly)
- **Nunito**: Body font (clear, readable)
- **Large Sizes**: 2-4rem for key elements

### Responsive Design
- Desktop: Full grid layout
- Tablet: Optimized touch targets
- Mobile: Single-column stacking

## 🔧 Customization

### Change Number Range

In `calculator.js`, modify:
```javascript
this.maxNumber = 20; // Change to desired maximum
```

### Change Colors

In `styles.css`, update CSS variables:
```css
:root {
    --coral-red: #FF6B6B;
    --turquoise: #4ECDC4;
    /* ... etc ... */
}
```

### Change Object Types

In `app.js`, modify:
```javascript
this.objectTypes = ['star', 'heart', 'circle'];
```

## 🐛 Troubleshooting

### Animations Not Working
- Ensure JavaScript is enabled
- Check browser console for errors
- Verify GSAP is loading from CDN

### Pixi.js Canvas Blank
- Ensure WebGL is supported and enabled
- Check browser console for WebGL errors
- Try a different browser

### Confetti Not Appearing
- Check that tsParticles loaded successfully
- Look for console warnings about confetti
- Ensure the confetti canvas overlay is present

## 📖 Educational Usage Tips

### For Teachers
1. **Start with Ten Frames**: Help students see the benchmark of 5
2. **Introduce Number Bonds**: Show how numbers can be "friends"
3. **Use Number Line**: Demonstrate addition as "hopping forward"
4. **Encourage Exploration**: Let students discover patterns
5. **Celebrate Milestones**: The confetti is built-in motivation!

### For Parents
1. **Practice Daily**: 5-10 minutes of play builds number sense
2. **Ask Questions**: "How many more to make 10?"
3. **Make Connections**: "Can you show me 7 in different ways?"
4. **Encourage Independence**: Let them explore at their own pace

## 🔬 Research References

- Fuson, K. C., & Briars, D. J. (1990). Using a base-ten blocks learning/teaching approach for first- and second-grade place-value and multidigit addition and subtraction.
- Ebner, S., MacDonald, M. K., Grekov, P., & Aspiranti, K. B. (2025). A Meta-Analytic Review of the Concrete-Representational-Abstract Math Approach. Learning Disabilities Research & Practice.
- Van de Walle, J. A. (1988). The early development of number relations. Arithmetic Teacher.
- Bobis, J. (1988). Teacher intervention in the development of visual imagery strategies. Educational Studies in Mathematics.

## 📄 License

This project is open source and available for educational use.

## 🤝 Contributing

Contributions welcome! Ideas for improvement:
- [ ] Sound effects for interactions
- [ ] Progress tracking and achievements
- [ ] Multiplication/division for older grades
- [ ] Multi-language support
- [ ] Print worksheets feature
- [ ] Teacher dashboard
- [ ] Student progress reports

## 🎉 Credits

Built with love for first graders everywhere! 💙

**Libraries Used:**
- [Pixi.js](https://pixijs.com/) - 2D rendering engine
- [GSAP](https://greensock.com/gsap/) - Animation library
- [tsParticles](https://particles.js.org/) - Particle effects

**Fonts:**
- Fredoka (Google Fonts)
- Nunito (Google Fonts)

---

Made with 🎨 and ✨ to help kids fall in love with math!
