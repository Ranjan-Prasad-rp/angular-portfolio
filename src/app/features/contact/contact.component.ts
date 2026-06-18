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
    this.ctx = gsap.context(() => {
      gsap.from(['.section-title', '.section-sub'], {
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.14,
        scrollTrigger: { trigger: '.contact-page', start: 'top 85%', once: true },
      });
      gsap.from('.field', {
        y: 24, opacity: 0, duration: 0.65, ease: 'power2.out', stagger: 0.1, delay: 0.18,
        scrollTrigger: { trigger: '.contact-form', start: 'top 88%', once: true },
      });
      gsap.from('.submit-btn', {
        y: 16, opacity: 0, scale: 0.96, duration: 0.55, ease: 'back.out(1.6)', delay: 0.55,
        scrollTrigger: { trigger: '.contact-form', start: 'top 88%', once: true },
      });
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
