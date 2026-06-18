import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { SkillComponent } from "./skill/skill.component";
import { AboutComponent } from "./about/about.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SkillComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
