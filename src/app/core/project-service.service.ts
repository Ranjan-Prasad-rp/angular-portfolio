import { Injectable } from '@angular/core';
import { ProjectModel } from "../models/project.model";
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private projects: ProjectModel[] = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Personal portfolio built with Angular 19, showcasing projects and skills.',
      techStack: ['Angular', 'TypeScript', 'Bootstrap', 'SCSS'],
      githubUrl: 'https://github.com/Ranjan-Prasad-rp',
      featured: true
    },
    {
      id: 2,
      title: 'MEAN Stack App',
      description: 'Full stack application using MongoDB, Express, Angular and Node.js.',
      techStack: ['MongoDB', 'Express.js', 'Angular', 'Node.js'],
      githubUrl: 'https://github.com/Ranjan-Prasad-rp',
      featured: true
    }
  ];

  getProject(): ProjectModel[] {
    return this.projects;
  }


}
