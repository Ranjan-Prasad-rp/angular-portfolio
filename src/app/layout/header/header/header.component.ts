import { Component, AfterViewInit, OnDestroy, ElementRef, inject, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  private el = inject(ElementRef);
  private gsapCtx!: gsap.Context;

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;

    this.gsapCtx = gsap.context(() => {
      // Slide down on page load
      gsap.from('.site-header', {
        y: -64, opacity: 0, duration: 0.75, ease: 'power3.out', delay: 0.05
      });

      // Backdrop blur appears on scroll
      ScrollTrigger.create({
        start: 'top -60',
        end: 99999,
        toggleClass: { targets: '.site-header', className: 'is-scrolled' }
      });
    }, host);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }
}
