import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [],
  template: `
    <div class="loading-overlay" [class.fade-out]="fading">
      <div class="loader-wrap">
        <div class="loader">
          <div class="box box-1">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-2">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-3">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
          <div class="box box-4">
            <div class="side-left"></div>
            <div class="side-right"></div>
            <div class="side-top"></div>
          </div>
        </div>
        <p class="loading-text">Loading</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      inset: 0;
      z-index: 10000;
      background: #0F172A;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 1;
      transition: opacity 0.8s ease;
      pointer-events: all;
    }
    .loading-overlay.fade-out {
      opacity: 0;
      pointer-events: none;
    }
    .loader-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }
    .loading-text {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      margin: 0;
      animation: blink-text 1.4s ease-in-out infinite;
    }
    @keyframes blink-text {
      0%, 100% { opacity: 0.35; }
      50%       { opacity: 0.8; }
    }

    /* ── 3D isometric box loader ── */
    .loader {
      position: relative;
      width: 75px;
      height: 80px;
    }

    .box {
      position: absolute;
      width: 56px;
      left: 0;
      top: 18px;
    }

    .side-left,
    .side-right,
    .side-top {
      position: absolute;
    }

    /* Left visible face */
    .side-left {
      width: 28px;
      height: 32px;
      background: #22C55E;
      left: 0;
      bottom: 0;
      transform: skewY(30deg);
      transform-origin: 100% 100%;
    }

    /* Right visible face */
    .side-right {
      width: 28px;
      height: 32px;
      background: #16A34A;
      left: 28px;
      bottom: 0;
      transform: skewY(-30deg);
      transform-origin: 0 100%;
    }

    /* Top face (rhombus) */
    .side-top {
      width: 40px;
      height: 23px;
      background: #4ADE80;
      left: 8px;
      top: 0;
      transform: rotate(-30deg) skewX(-30deg) scaleY(1.16);
    }

    /* Animation assignments — odd boxes from-left, even from-right */
    .box-1 { animation: from-left  2.4s ease-in-out infinite;           }
    .box-2 { animation: from-right 2.4s ease-in-out infinite; animation-delay: 0.6s; }
    .box-3 { animation: from-left  2.4s ease-in-out infinite; animation-delay: 1.2s; }
    .box-4 { animation: from-right 2.4s ease-in-out infinite; animation-delay: 1.8s; }
  `],
})
export class LoadingScreenComponent implements OnInit {
  @Output() done = new EventEmitter<void>();
  fading = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.fading = true;
      setTimeout(() => this.done.emit(), 800);
    }, 2800);
  }
}
