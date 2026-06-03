import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectModel } from '../../../models/project.model';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  // Trigger rebuild to fix cached compiler error
  @Input() project!: ProjectModel;
  //  ↑ "parent will pass ONE project to me"

  @Output() githubClicked = new EventEmitter<ProjectModel>();
  //  ↑ "when button clicked, I notify the parent"

  onGithubClick(): void {
    this.githubClicked.emit(this.project);
    //  ↑ fires event, sends project data up to parent
  }
}
