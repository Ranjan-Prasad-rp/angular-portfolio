import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-animated-text',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './animated-text.component.html',
  styleUrl: './animated-text.component.scss'
})
export class AnimatedTextComponent implements OnInit {
  @Input() text = '';
  @Input() staggerDelay = 0.06;
  @Input() showUnderline = true;
  @Input() variant: 'brand' | 'label' = 'label';

  letters: string[] = [];

  ngOnInit(): void {
    this.letters = Array.from(this.text);
  }
}
