import { Component, inject } from '@angular/core';
import { ProjectCardComponent } from "./project-card/project-card.component";
import { ProjectServiceService } from "../../core/project-service.service";
import { ProjectModel } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectCardComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  private projectService = inject(ProjectServiceService)
  project: ProjectModel[] = [];
  constructor() {
    this.project = this.projectService.getProject();
    console.log(this.project)
  }

  handleGithubClick(project: ProjectModel): void {
    window.open(project.githubUrl, '_blank');
  }
}
