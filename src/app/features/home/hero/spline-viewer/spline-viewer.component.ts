import { Component, Input, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-spline-viewer',
  standalone: true,
  imports: [],
  template: `<canvas #splineCanvas class="spline-canvas"></canvas>`,
  styles: [`
    :host {
      display: block;
      position: absolute;
      inset: 0;
      z-index: 0;
      pointer-events: none;
    }
    .spline-canvas {
      width: 100%;
      height: 100%;
      display: block;
      pointer-events: auto;
    }
  `]
})
export class SplineViewerComponent implements AfterViewInit, OnDestroy {
  @Input() scene!: string;
  @ViewChild('splineCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private app: any;

  async ngAfterViewInit(): Promise<void> {
    const { Application } = await import('@splinetool/runtime');
    this.app = new Application(this.canvasRef.nativeElement);
    await this.app.load(this.scene);
  }

  ngOnDestroy(): void {
    this.app?.dispose();
  }
}
