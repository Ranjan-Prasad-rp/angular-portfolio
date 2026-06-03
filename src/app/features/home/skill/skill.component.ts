import { Component, inject } from '@angular/core';
import {SkillService} from "../../../core/skill.service";

@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss'
})
export class SkillComponent {

  private skillService = inject(SkillService);
  get skills() {
    return this.skillService.getSkills();
  }

get hasFeaturedSkills(): boolean {
  return this.skillService.getFeaturedSkills().length > 0;
}



 getBadgeClass(level: string): string {
    const map: Record<string, string> = {
      'Advanced':     'badge-advanced',
      'Intermediate': 'badge-intermediate',
      'Beginner':     'badge-beginner'
    };
    return map[level] ?? '';
  }
}
