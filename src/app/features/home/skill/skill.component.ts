import { Component, AfterViewInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent implements AfterViewInit, OnDestroy {
  private gsapCtx!: gsap.Context;

  constructor(private el: ElementRef) {}

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(e: PointerEvent): void {
    this.el.nativeElement.style.setProperty('--px', e.clientX.toFixed(2));
    this.el.nativeElement.style.setProperty('--py', e.clientY.toFixed(2));
  }

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;

    this.gsapCtx = gsap.context(() => {
      // Section header
      gsap.from('.skills-head', {
        y: 45, opacity: 0, duration: 0.85, ease: 'power3.out',
        scrollTrigger: { trigger: '.skills-head', start: 'top 88%', once: true }
      });

      // Category cards stagger
      gsap.from('.cat-card', {
        y: 65, opacity: 0, scale: 0.94, duration: 0.75, ease: 'power3.out',
        stagger: { amount: 0.5, from: 'start' },
        scrollTrigger: { trigger: '.cat-grid', start: 'top 82%', once: true },
        onComplete: () => {
          host.querySelectorAll<HTMLElement>('.cat-count').forEach(badge => this.countUp(badge));
        }
      });
    }, host);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }

  private countUp(el: HTMLElement): void {
    const target = parseInt(el.textContent ?? '0', 10);
    const duration = 0.9;
    gsap.fromTo(el,
      { textContent: 0 },
      {
        textContent: target,
        duration,
        ease: 'power2.out',
        snap: { textContent: 1 },
        onUpdate() { el.textContent = String(Math.round(Number(el.textContent))); }
      }
    );
  }

  marqueeRow1 = [
    { name: 'JavaScript',  icon: '⚡' },
    { name: 'TypeScript',  icon: '📘' },
    { name: 'Angular',     icon: '🅰️' },
    { name: 'React',       icon: '⚛️' },
    { name: 'Node.js',     icon: '🟩' },
    { name: 'Spring Boot', icon: '🍃' },
    { name: 'MongoDB',     icon: '🍃' },
    { name: 'MySQL',       icon: '🐬' },
    { name: 'Java',        icon: '☕' },
    { name: 'Tailwind CSS',icon: '🎨' },
    { name: 'Git',         icon: '🌿' },
    { name: 'Docker',      icon: '🐳' },
  ];

  marqueeRow2 = [
    { name: 'REST APIs',      icon: '🔌' },
    { name: 'WebSockets',     icon: '🔗' },
    { name: 'JWT Auth',       icon: '🔐' },
    { name: 'System Design',  icon: '🧩' },
    { name: 'Express.js',     icon: '🚂' },
    { name: 'Spring Security',icon: '🔒' },
    { name: 'JPA/Hibernate',  icon: '🗃️' },
    { name: 'Redux',          icon: '🔄' },
    { name: 'Maven',          icon: '📦' },
    { name: 'Swagger',        icon: '📋' },
    { name: 'JUnit',          icon: '🧪' },
    { name: 'Postman',        icon: '📬' },
  ];

  categoryGroups = [
    {
      name: 'Frontend',
      accent: '#06B6D4',
      dim: 'rgba(6,182,212,0.07)',
      border: 'rgba(6,182,212,0.22)',
      skills: [
        { name: 'JavaScript', icon: '⚡', level: 'Advanced' },
        { name: 'TypeScript',  icon: '📘', level: 'Advanced' },
        { name: 'Angular',     icon: '🅰️', level: 'Advanced' },
        { name: 'React',       icon: '⚛️', level: 'Intermediate' },
        { name: 'Tailwind CSS',icon: '🎨', level: 'Intermediate' },
        { name: 'Redux',       icon: '🔄', level: 'Beginner' },
        { name: 'Bootstrap',   icon: '🅱️', level: 'Beginner' },
      ],
    },
    {
      name: 'Backend',
      accent: '#22C55E',
      dim: 'rgba(34,197,94,0.07)',
      border: 'rgba(34,197,94,0.22)',
      skills: [
        { name: 'Node.js',        icon: '🟩',  level: 'Advanced' },
        { name: 'Java',           icon: '☕',  level: 'Intermediate' },
        { name: 'Spring Boot',    icon: '🍃',  level: 'Intermediate' },
        { name: 'Spring Data JPA',icon: '🗃️',  level: 'Intermediate' },
        { name: 'Express.js',     icon: '🚂',  level: 'Intermediate' },
        { name: 'REST APIs',      icon: '🔌',  level: 'Advanced' },
        { name: 'WebSockets',     icon: '🔗',  level: 'Intermediate' },
        { name: 'Microservices',  icon: '🧩',  level: 'Intermediate' },
        { name: 'JWT Auth',       icon: '🔐',  level: 'Intermediate' },
        { name: 'Spring Security',icon: '🔒',  level: 'Beginner' },
      ],
    },
    {
      name: 'Database',
      accent: '#F59E0B',
      dim: 'rgba(245,158,11,0.07)',
      border: 'rgba(245,158,11,0.22)',
      skills: [
        { name: 'MongoDB',      icon: '🍃', level: 'Intermediate' },
        { name: 'MySQL',        icon: '🐬', level: 'Intermediate' },
        { name: 'Redis',        icon: '🟥', level: 'Beginner' },
        { name: 'JPA/Hibernate',icon: '🗃️', level: 'Beginner' },
      ],
    },
    {
      name: 'Tools',
      accent: '#8B5CF6',
      dim: 'rgba(139,92,246,0.07)',
      border: 'rgba(139,92,246,0.22)',
      skills: [
        { name: 'Git',      icon: '🌿', level: 'Intermediate' },
        { name: 'Docker',   icon: '🐳', level: 'Beginner' },
        { name: 'Kafka',    icon: '📨', level: 'Beginner' },
        { name: 'IntelliJ', icon: '🧠', level: 'Intermediate' },
        { name: 'Maven',    icon: '📦', level: 'Beginner' },
        { name: 'Swagger',  icon: '📋', level: 'Beginner' },
        { name: 'JUnit',    icon: '🧪', level: 'Beginner' },
        { name: 'Mockito',  icon: '🎭', level: 'Beginner' },
        { name: 'Postman',  icon: '📬', level: 'Intermediate' },
      ],
    },
  ];
}
