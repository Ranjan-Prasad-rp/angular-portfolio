import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnimatedTextComponent } from '../../../shared/animated-text/animated-text.component';

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  fadeStart: number;
  fadingOut: boolean;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AnimatedTextComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('particleCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  name = 'Ranjan Prasad';
  title = 'Full-Stack Developer · Backend & System Design';
  bio = 'I design and ship production web apps end-to-end with Angular, Node.js, Express.js, and MongoDB. At IIEST Federation I built live platforms serving thousands of SMEs and cut API response times by 70% — with a focus on REST API design, JWT security, and real-time WebSockets.';
  githubUrl = 'https://github.com/Ranjan-Prasad-rp';
  linkedinUrl = 'https://www.linkedin.com/in/ranjan-prasad-dev/';
  isAvailableForWork = true;
  cvDownloaded = false;

  private animFrameId = 0;
  private particles: Particle[] = [];
  private readonly onResize = () => this.resizeCanvas();

  ngAfterViewInit(): void {
    this.initParticles();
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'Ranjan_Prasad_Resume.pdf';
    link.download = 'Ranjan_Prasad_Resume.pdf';
    link.click();
    this.cvDownloaded = true;
  }

  private resizeCanvas(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.particles = this.makeParticles(canvas);
  }

  private makeParticles(canvas: HTMLCanvasElement): Particle[] {
    const n = Math.floor((canvas.width * canvas.height) / 9000);
    return Array.from({ length: n }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: Math.random() / 6 + 0.04,
      opacity: Math.random() * 0.5 + 0.1,
      fadeStart: Date.now() + Math.random() * 800 + 300,
      fadingOut: false
    }));
  }

  private reset(p: Particle, canvas: HTMLCanvasElement): void {
    p.x = Math.random() * canvas.width;
    p.y = canvas.height + 2;
    p.speed = Math.random() / 6 + 0.04;
    p.opacity = Math.random() * 0.5 + 0.1;
    p.fadeStart = Date.now() + Math.random() * 800 + 300;
    p.fadingOut = false;
  }

  private initParticles(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    this.particles = this.makeParticles(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of this.particles) {
        p.y -= p.speed;
        if (p.y < -4) { this.reset(p, canvas); continue; }
        if (!p.fadingOut && Date.now() > p.fadeStart) p.fadingOut = true;
        if (p.fadingOut) {
          p.opacity -= 0.004;
          if (p.opacity <= 0) { this.reset(p, canvas); continue; }
        }
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
        ctx.fillRect(p.x, p.y, 1, Math.random() * 2.5 + 0.5);
      }
      this.animFrameId = requestAnimationFrame(draw);
    };

    draw();
  }
}
