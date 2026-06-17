import { Component, AfterViewInit, ElementRef, inject } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
  private el = inject(ElementRef);

  photo = 'ranjan.jpg';

  highlights = [
    { value: '3+', label: 'Months Learning', num: 3, suffix: '+' },
    { value: '20+', label: 'Projects Built', num: 10, suffix: '+' },
    { value: '15+', label: 'Technologies', num: 15, suffix: '+' },
  ];

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;

    /* Scroll reveal for section */
    const revealEls = host.querySelectorAll('.reveal');
    const revealObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          revealObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach((el: Element) => revealObs.observe(el));

    /* Counter animation on stat cards */
    const counters = host.querySelectorAll('.counter-value');
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          this.animateCounter(e.target as HTMLElement);
          counterObs.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((el: Element) => counterObs.observe(el));
  }

  private animateCounter(el: HTMLElement): void {
    const target = Number(el.dataset['target'] ?? 0);
    const suffix = el.dataset['suffix'] ?? '';
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
}
