import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from "@angular/forms";
import { AnimatedInputComponent } from '../../shared/animated-input/animated-input.component';
import { GsapService } from '../../core/gsap.service';
import gsap from 'gsap';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, AnimatedInputComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  submitted: boolean = false;
  private fb = inject(FormBuilder);
  private el = inject(ElementRef);
  private _gsap = inject(GsapService);
  private ctx!: gsap.Context;
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;
    // No ScrollTrigger — contact is a full-page route, all content visible on load
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.section-title', { y: 30, opacity: 0, duration: 0.75 })
        .from('.section-sub',   { y: 20, opacity: 0, duration: 0.6 }, '-=0.45')
        .from('.field',         { y: 22, opacity: 0, duration: 0.55, stagger: 0.09 }, '-=0.3')
        .from('.submit-btn',    { y: 14, opacity: 0, scale: 0.95, duration: 0.5, ease: 'back.out(1.6)' }, '-=0.15');
    }, host);
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log("contact form data when valid", this.contactForm.value);
      this.contactForm.reset();
      this.submitted = true;
    } else {
      this.contactForm.markAllAsTouched();
      console.log("contact form data by markAll", this.contactForm.value);
    }
  }
}
