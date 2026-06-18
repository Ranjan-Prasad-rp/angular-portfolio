import { Component, inject, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { ProjectCardComponent } from "./project-card/project-card.component";
import { GithubserviceService } from '../../core/githubservice.service';
import { Githubrepo } from '../../models/githuhrepo';
import { IndustryProject } from '../../models/industry-project.model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private githubservice = inject(GithubserviceService);
  private el = inject(ElementRef);
  private gsapCtx!: gsap.Context;

  industryProjects: IndustryProject[] = [
    {
      name: 'Connect Bharat',
      company: 'IIEST Federation',
      role: 'Junior Developer Intern',
      duration: '3 months · Ongoing',
      status: 'live',
      domain: 'connectbharat.org',
      metric: '70%',
      metricLabel: 'Faster API Response',
      description: 'National Single Window System platform simplifying government compliance and regulations for SMEs across India. Full-stack contribution spanning API development, performance optimization, and production deployment.',
      impact: [
        'Optimized backend APIs by 70% — cut response time significantly',
        'Built and shipped production-ready web application modules',
        'Integrated government compliance workflows for thousands of SME users'
      ],
      tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'REST API'],
      liveUrl: 'https://www.connectbharat.org/#/'
    },
    {
      name: 'CoWork IIEST',
      company: 'IIEST Federation',
      role: 'Junior Developer Intern',
      duration: 'Completed',
      status: 'shipped',
      domain: 'cowork.iiest.org',
      metric: 'E2E',
      metricLabel: 'Designed · Secured · Shipped',
      description: 'End-to-end platform connecting SMEs and startups with business resources. Owned the full delivery — from API design to frontend UI — under production constraints.',
      impact: [
        'Designed and integrated REST APIs end-to-end',
        'Implemented JWT-based authentication and route security',
        'Rebuilt UI from scratch — measurably improved user experience'
      ],
      tech: ['Angular', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST API'],
      liveUrl: 'https://cowork.iiest.org/'
    }
  ];

  githubRepos: Githubrepo[] = [];

  ngOnInit() {
    this.githubservice.githubRepos().subscribe({
      next: (data: any) => {
        this.githubRepos = data;
        // Refresh ScrollTrigger after github cards render
        setTimeout(() => ScrollTrigger.refresh(), 100);
      }
    });
  }

  ngAfterViewInit(): void {
    const host = this.el.nativeElement as HTMLElement;

    this.gsapCtx = gsap.context(() => {
      // Section headers
      gsap.utils.toArray<HTMLElement>('.section-header').forEach(header => {
        gsap.from(header, {
          y: 40, opacity: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: header, start: 'top 85%', once: true }
        });
      });

      // Industry cases — alternate left/right slide-in
      gsap.utils.toArray<HTMLElement>('.case').forEach((card, i) => {
        gsap.from(card, {
          x: i % 2 === 0 ? -80 : 80,
          opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 84%', once: true }
        });
      });

      // GitHub grid cards stagger
      gsap.from('.github-grid app-project-card', {
        y: 50, opacity: 0, scale: 0.94, duration: 0.7, ease: 'power3.out',
        stagger: { amount: 0.55, from: 'start' },
        scrollTrigger: { trigger: '.github-grid', start: 'top 82%', once: true }
      });
    }, host);
  }

  ngOnDestroy(): void {
    this.gsapCtx?.revert();
  }

  handleGithubClick(project: Githubrepo): void {
    window.open(project.html_url, '_blank');
  }

  openLive(url: string): void {
    window.open(url, '_blank');
  }
}
