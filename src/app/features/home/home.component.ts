import { Component } from '@angular/core';
import {HeroComponent} from "./hero/hero.component";
import {SkillComponent} from "./skill/skill.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, SkillComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
