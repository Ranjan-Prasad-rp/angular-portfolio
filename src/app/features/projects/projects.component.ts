import { Component, inject, OnInit } from '@angular/core';
import { ProjectCardComponent } from "./project-card/project-card.component";
import { GithubserviceService } from '../../core/githubservice.service';
import { Githubrepo } from '../../models/githuhrepo';
import { IndustryProject } from '../../models/industry-project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  private githubservice = inject(GithubserviceService);

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
      next: (data: any) => { this.githubRepos = data; }
    });
  }

  handleGithubClick(project: Githubrepo): void {
    window.open(project.html_url, '_blank');
  }

  openLive(url: string): void {
    window.open(url, '_blank');
  }
}
