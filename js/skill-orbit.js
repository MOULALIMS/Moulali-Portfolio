class SkillsOrbit {
  constructor() {
    this.canvas = document.getElementById('orbitCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.container = document.querySelector('.skill-orbit-container');
    this.labels = document.querySelectorAll('.label');
    this.tooltip = document.getElementById('tooltip');
    this.sound = document.getElementById('hoverSound');
    
    // Configuration
    this.orbitRadius = 280;
    this.orbitSpeed = 0.002;
    this.angle = 0;
    this.isPaused = false;
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    this.setupCanvas();
    this.setupEventListeners();
    this.animate();
  }
  
  setupCanvas() {
    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    
    window.addEventListener('resize', () => {
      this.canvas.width = this.container.offsetWidth;
      this.canvas.height = this.container.offsetHeight;
    });
  }
  
  setupEventListeners() {
    // Label hover effects
    this.labels.forEach(label => {
      label.addEventListener('mouseenter', (e) => {
        this.isPaused = true;
        this.showTooltip(label.dataset.description, e);
        this.playHoverSound();
      });
      
      label.addEventListener('mouseleave', () => {
        this.isPaused = false;
        this.hideTooltip();
      });
    });
    
    // Tooltip follows mouse
    document.addEventListener('mousemove', (e) => {
      if (this.tooltip.classList.contains('show')) {
        this.tooltip.style.left = `${e.clientX + 20}px`;
        this.tooltip.style.top = `${e.clientY + 20}px`;
      }
    });
  }
  
  showTooltip(text, event) {
    this.tooltip.textContent = text;
    this.tooltip.style.left = `${event.clientX + 20}px`;
    this.tooltip.style.top = `${event.clientY + 20}px`;
    this.tooltip.classList.add('show');
  }
  
  hideTooltip() {
    this.tooltip.classList.remove('show');
  }
  
  playHoverSound() {
    if (this.sound) {
      this.sound.currentTime = 0;
      this.sound.play().catch(e => console.log("Audio play failed:", e));
    }
  }
  
  drawConnectionLine(x1, y1, x2, y2) {
    const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
    gradient.addColorStop(0, '#00a8ff');
    gradient.addColorStop(0.5, '#ffffff');
    gradient.addColorStop(1, '#00a8ff');
    
    this.ctx.strokeStyle = gradient;
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }
  
  drawParticle(x, y) {
    const size = 2 + Math.random() * 3;
    const opacity = 0.5 + Math.random() * 0.3;
    
    this.ctx.fillStyle = `rgba(0, 168, 255, ${opacity})`;
    this.ctx.beginPath();
    this.ctx.arc(x, y, size, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  animate() {
    if (!this.isPaused) this.angle += this.orbitSpeed;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    
    this.labels.forEach((label, index) => {
      // Calculate position
      const angle = this.angle + (index * (2 * Math.PI / this.labels.length));
      const x = centerX + Math.cos(angle) * this.orbitRadius;
      const y = centerY + Math.sin(angle) * this.orbitRadius;
      
      // Update position
      label.style.left = `${x - label.offsetWidth / 2}px`;
      label.style.top = `${y - label.offsetHeight / 2}px`;
      
      // Draw connection line
      this.drawConnectionLine(centerX, centerY, x, y);
      
      // Draw particles (only for some items for performance)
      if (index % 2 === 0) {
        for (let i = 0; i < 3; i++) {
          const t = Math.random();
          const sparkX = centerX + t * (x - centerX);
          const sparkY = centerY + t * (y - centerY);
          this.drawParticle(sparkX, sparkY);
        }
      }
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    cancelAnimationFrame(this.animationId);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const skillsOrbit = new SkillsOrbit();
  
  // Clean up if needed
  window.addEventListener('beforeunload', () => {
    skillsOrbit.destroy();
  });
});