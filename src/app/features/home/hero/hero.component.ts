import { Component } from '@angular/core';
import { AnimatedTextComponent } from '../../../shared/animated-text/animated-text.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [AnimatedTextComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  name = 'Ranjan Prasad';
  title = 'Full-Stack Developer · Backend & System Design';
  bio = 'I design and ship production web apps end-to-end with Angular, Node.js, Express.js, and MongoDB. At IIEST Federation I built live platforms serving thousands of SMEs and cut API response times by 70% — with a focus on REST API design, JWT security, and real-time WebSockets.';
  githubUrl = 'https://github.com/Ranjan-Prasad-rp';
  linkedinUrl = 'https://www.linkedin.com/in/ranjan-prasad-dev/';
  isAvailableForWork = true;
  cvDownloaded = false;

  downloadCV(): void {
    const link = document.createElement('a');
    link.href = 'Ranjan_Prasad_Resume.pdf';
    link.download = 'Ranjan_Prasad_Resume.pdf';
    link.click();
    this.cvDownloaded = true;
  }
}
