import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private skills: Skill[] = [
  // ─── Languages ───────────────────────────────
  { name: 'JavaScript',    level: 'Advanced', category: 'Frontend', icon: '⚡', isFeatured: true  },
  { name: 'TypeScript',    level: 'Advanced', category: 'Frontend', icon: '📘', isFeatured: true  },
  { name: 'Java',          level: 'Intermediate', category: 'Backend',  icon: '☕', isFeatured: false },

  // ─── Frontend ────────────────────────────────
  { name: 'Angular',       level: 'Intermediate',     category: 'Frontend', icon: '🅰️', isFeatured: true  },
  { name: 'React',         level: 'Intermediate', category: 'Frontend', icon: '⚛️', isFeatured: true  },
  { name: 'Redux',         level: 'Beginner',     category: 'Frontend', icon: '🔄', isFeatured: false },
  { name: 'Tailwind CSS',  level: 'Intermediate', category: 'Frontend', icon: '🎨', isFeatured: false },
  { name: 'Bootstrap',     level: 'Beginner',     category: 'Frontend', icon: '🅱️', isFeatured: false },

  // ─── Backend ─────────────────────────────────
  { name: 'Node.js',       level: 'Intermediate', category: 'Backend',  icon: '🟩', isFeatured: true  },
  { name: 'Express.js',    level: 'Intermediate', category: 'Backend',  icon: '🚂', isFeatured: false },
  { name: 'Spring Boot',   level: 'Intermediate', category: 'Backend',  icon: '🍃', isFeatured: true  },
  { name: 'Spring Security',level: 'Beginner',    category: 'Backend',  icon: '🔒', isFeatured: false },

  // ─── Database ────────────────────────────────
  { name: 'MongoDB',       level: 'Intermediate', category: 'Backend',  icon: '🍃', isFeatured: true  },
  { name: 'MySQL',         level: 'Intermediate', category: 'Backend',  icon: '🐬', isFeatured: false },
  { name: 'JPA/Hibernate', level: 'Beginner',     category: 'Backend',  icon: '🗃️', isFeatured: false },

  // ─── Tools ───────────────────────────────────
  { name: 'Docker',        level: 'Beginner',     category: 'Tools',    icon: '🐳', isFeatured: false },
  { name: 'Git',           level: 'Intermediate', category: 'Tools',    icon: '🌿', isFeatured: true  },
  { name: 'Maven',         level: 'Beginner',     category: 'Tools',    icon: '📦', isFeatured: false },
  { name: 'Swagger',       level: 'Beginner',     category: 'Tools',    icon: '📋', isFeatured: false },
  { name: 'JUnit',         level: 'Beginner',     category: 'Tools',    icon: '🧪', isFeatured: false },
  { name: 'Mockito',       level: 'Beginner',     category: 'Tools',    icon: '🎭', isFeatured: false },
  {name: 'Postman',        level: 'Intermediate',     category: 'Tools',    icon: '📬', isFeatured: false },
];

getSkills(): Skill[] {
  return this.skills;
}

  getFeaturedSkills(): Skill[] {
    return this.skills.filter(skill => skill.isFeatured);
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.skills.filter(skill => skill.category === category);
  }

  getSkillCount(): number {
    return this.skills.length;
  }




}
