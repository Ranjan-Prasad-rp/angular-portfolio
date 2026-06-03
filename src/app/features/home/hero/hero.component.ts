import { Component } from '@angular/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  // YOUR DATA — fill in your real info!
  name = 'Ranjan Prasad';
  title = 'Angular Developer in the Making';
  bio = 'I build clean, fast web apps and love learning by doing.';
  githubUrl = 'https://github.com/Ranjan-Prasad-rp';
  linkedinUrl = 'https://www.linkedin.com/in/ranjan-prasad-dev/';
  isAvailableForWork = true;
  cvDownloaded = false;

  downloadCV(): void {
    this.cvDownloaded = true;
    console.log('CV download triggered!');
    // We'll wire up actual download in a later session
  }
}