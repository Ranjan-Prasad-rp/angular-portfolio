import { Component, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { GsapService } from '../../core/gsap.service';
import gsap from 'gsap';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private _gsap = inject(GsapService);
  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    this.ctx = gsap.context(() => {
      gsap.from('.footer-brand, .footer-nav, .footer-socials', {
        y: 20, opacity: 0, duration: 0.7, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: '.site-footer', start: 'top 95%', once: true },
      });
    }, host);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
