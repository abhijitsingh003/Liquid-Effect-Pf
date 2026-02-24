document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar blur intensity on scroll
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Liquid WebGL Background
    import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.22/build/backgrounds/liquid1.min.js')
        .then(module => {
            const LiquidBackground = module.default;
            const canvas = document.getElementById('liquid-canvas');
            if (canvas) {
                const app = LiquidBackground(canvas);
                app.loadImage('Pf 3 hero img.png');
                app.liquidPlane.material.metalness = 0.75;
                app.liquidPlane.material.roughness = 0.25;
                app.liquidPlane.uniforms.displacementScale.value = 5;
                app.setRain(false);
            }
        })
        .catch(err => console.error("Failed to load LiquidBackground:", err));

    // 3. Cursor Glow on CTA Button
    const btnTouch = document.querySelector('.btn-touch');

    btnTouch.addEventListener('mousemove', (e) => {
        const rect = btnTouch.getBoundingClientRect();
        // Calculate cursor position relative to the button
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables mapped to cursor position
        btnTouch.style.setProperty('--x', `${x}px`);
        btnTouch.style.setProperty('--y', `${y}px`);
    });

    // 4. Mobile experience warning toast
    const mobileWarning = document.getElementById('mobile-warning');
    const closeWarning = document.getElementById('close-warning');

    if (mobileWarning && closeWarning) {
        // Only trigger popup if mobile CSS is active (display == flex)
        if (window.getComputedStyle(mobileWarning).display === 'flex') {
            setTimeout(() => {
                mobileWarning.classList.add('show');
            }, 1000); // Slide up 1 second after page loads
        }

        closeWarning.addEventListener('click', () => {
            mobileWarning.classList.remove('show');
        });
    }
});
