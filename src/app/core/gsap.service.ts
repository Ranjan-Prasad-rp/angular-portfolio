import { Injectable } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Injectable({ providedIn: 'root' })
export class GsapService {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }
}
