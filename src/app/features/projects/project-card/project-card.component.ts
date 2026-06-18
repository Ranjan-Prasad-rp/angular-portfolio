import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Githubrepo } from '../../../models/githuhrepo';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [TitleCasePipe, CommonModule],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() project!: Githubrepo;

  @Output() githubClicked = new EventEmitter<Githubrepo>();

  onGithubClick(): void {
    this.githubClicked.emit(this.project);
  }

  onLiveClick(): void {
    if (this.project.liveUrl) window.open(this.project.liveUrl, '_blank');
  }
}
