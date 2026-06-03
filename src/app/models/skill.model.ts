export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: 'Frontend' | 'Backend' | 'Tools';
  icon: string;        // emoji for now, e.g. '⚡'
  isFeatured: boolean;
}