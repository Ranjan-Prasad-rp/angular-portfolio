import { Component, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private gsapCtx!: gsap.Context;

  photo = 'ranjan.jpg';

  highlights = [
    { value: '3+', label: 'Months Learning', num: 3, suffix: '+' },
    { value: '20+', label: 'Projects Built', num: 10, suffix: '+' },
    { value: '15+', label: 'Technologies', num: 15, suffix: '+' },
  ];

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;

    this.gsapCtx = gsap.context(() => {
      const trigger = { start: 'top 82%', once: true };

      // Photo column — slides in from left
      gsap.from('.photo-col', {
        x: -60, opacity: 0, scale: 0.92, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-container', ...trigger }
      });

      // Content cascade
      gsap.from(['.section-label', '.about-title'], {
        y: 35, opacity: 0, duration: 0.8, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.content-col', ...trigger }
      });

      gsap.from('.about-text', {
        y: 25, opacity: 0, duration: 0.7, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.content-col', start: 'top 78%', once: true }
      });

      gsap.from('.edu-card', {
        y: 30, opacity: 0, duration: 0.65, ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.education', start: 'top 85%', once: true }
      });

      // Highlight cards + counter
      gsap.from('.highlight-card', {
        y: 30, opacity: 0, scale: 0.92, duration: 0.65, ease: 'back.out(1.4)',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '.highlights', start: 'top 88%', once: true,
          onEnter: () => this.runCounters(host)
        }
      });
    }, host);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }

  private runCounters(host: HTMLElement): void {
    host.querySelectorAll<HTMLElement>('.counter-value').forEach(el => {
      const target = Number(el.dataset['target'] ?? 0);
      const suffix = el.dataset['suffix'] ?? '';
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.round(obj.val) + suffix; }
      });
    });
  }
}
