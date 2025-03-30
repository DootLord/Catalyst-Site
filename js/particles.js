/**
 * Pixel Particle Animation for Catalyst RP
 * A subtle retro-style particle effect for the background
 */

document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    // Call once to initialize and set up resize listener
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Particle configuration
    const particleConfig = {
        count: 50,             // Number of particles
        size: {
            min: 2,            // Minimum size of particles
            max: 4             // Maximum size of particles
        },
        speed: {
            min: 0.2,          // Minimum speed
            max: 0.6           // Maximum speed
        },
        colors: [              // Pixel art style colors
            '#39ff14',         // Neon green
            '#ff3399',         // Neon pink
            '#00ffff',         // Cyan
            '#ffff00',         // Yellow
            '#ff00ff'          // Magenta
        ],
        opacity: {
            min: 0.1,          // Minimum opacity
            max: 0.5           // Maximum opacity
        }
    };
    
    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            // Position
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            
            // Size (integer pixel sizes for retro feel)
            this.size = Math.floor(Math.random() * 
                (particleConfig.size.max - particleConfig.size.min + 1) + 
                particleConfig.size.min);
            
            // Speed and direction
            this.speedX = (Math.random() * 
                (particleConfig.speed.max - particleConfig.speed.min) + 
                particleConfig.speed.min) * (Math.random() > 0.5 ? 1 : -1);
            this.speedY = (Math.random() * 
                (particleConfig.speed.max - particleConfig.speed.min) + 
                particleConfig.speed.min) * (Math.random() > 0.5 ? 1 : -1);
            
            // Appearance
            this.color = particleConfig.colors[
                Math.floor(Math.random() * particleConfig.colors.length)
            ];
            this.opacity = Math.random() * 
                (particleConfig.opacity.max - particleConfig.opacity.min) + 
                particleConfig.opacity.min;
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            
            // Draw as perfect squares for pixel art style
            ctx.fillRect(
                Math.floor(this.x), 
                Math.floor(this.y), 
                this.size, 
                this.size
            );
        }
        
        update() {
            // Move the particle
            this.x += this.speedX;
            this.y += this.speedY;
            
            // Reset if out of bounds
            if (this.x < -this.size || this.x > canvas.width || 
                this.y < -this.size || this.y > canvas.height) {
                this.reset();
            }
        }
    }
    
    // Create particles
    const particles = [];
    for (let i = 0; i < particleConfig.count; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    function animate() {
        // Clear canvas with slight alpha for trail effect
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = 'rgb(22, 25, 27)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Update and draw particles
        ctx.globalAlpha = 1;
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Continue animation
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
});
