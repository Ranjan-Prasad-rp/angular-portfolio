import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { AnimatedTextComponent } from '../../../shared/animated-text/animated-text.component';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Particle {
  x: number; y: number; speed: number; opacity: number; fadeStart: number; fadingOut: boolean;
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
  private el = inject(ElementRef);

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
  private gsapCtx!: gsap.Context;

  ngAfterViewInit(): void {
    this.initParticles();
    window.addEventListener('resize', this.onResize);
    this.runEntrance();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animFrameId);
    window.removeEventListener('resize', this.onResize);
    this.gsapCtx?.revert();
  }

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'Ranjan_Prasad_Resume.pdf';
    link.download = 'Ranjan_Prasad_Resume.pdf';
    link.click();
    this.cvDownloaded = true;
  }

  private runEntrance(): void {
    const host = this.el.nativeElement as HTMLElement;

    this.gsapCtx = gsap.context(() => {
      // ── Ambient loops ──────────────────────────────────────────────
      gsap.to('.hero-photo-ring', {
        rotation: 360, duration: 28, ease: 'none', repeat: -1, transformOrigin: '50% 50%',
      });

      gsap.to('.hero-photo-glow', {
        opacity: 0.55, scale: 1.18, duration: 2.8, ease: 'sine.inOut', yoyo: true, repeat: -1,
      });

      gsap.to('.scroll-indicator', {
        y: 7, duration: 1.15, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6,
      });

      // ── Parallax on scroll ─────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('.shape').forEach((shape, i) => {
        gsap.to(shape, {
          y: (i % 2 === 0 ? -1 : 1) * (55 + i * 20),
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero-section',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      });

      ScrollTrigger.create({
        trigger: '.hero-section',
        start: '18% top',
        end: '38% top',
        scrub: true,
        onUpdate: (self) => gsap.set('.scroll-indicator', { opacity: Math.max(0, 1 - self.progress * 1.8) }),
      });
    }, host);
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
