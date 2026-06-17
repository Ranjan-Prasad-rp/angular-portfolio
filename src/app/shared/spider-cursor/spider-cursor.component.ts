import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-spider-cursor',
  standalone: true,
  template: `<canvas #canvas style="display:block;position:fixed;inset:0;"></canvas>`,
})
export class SpiderCursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private animFrame?: number;
  private pointerHandler?: (e: PointerEvent) => void;

  ngAfterViewInit(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    const { sin, cos, PI, hypot, min, max } = Math;
    let w = 0, h = 0;

    const rnd = (x = 1, dx = 0) => Math.random() * x + dx;
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const many = <T>(n: number, f: (i: number) => T): T[] => [...Array(n)].map((_, i) => f(i));
    const pt = (x: number, y: number) => ({ x, y });

    const noise = (x: number, y: number, t = 101) => {
      const w0 = sin(0.3 * x + 1.4 * t + 2.0 + 2.5 * sin(0.4 * y + -1.3 * t + 1.0));
      const w1 = sin(0.2 * y + 1.5 * t + 2.8 + 2.3 * sin(0.5 * x + -1.2 * t + 0.5));
      return w0 + w1;
    };

    const drawCircle = (x: number, y: number, r: number) => {
      ctx.beginPath();
      ctx.ellipse(x, y, r, r, 0, 0, PI * 2);
      ctx.fill();
    };

    const drawLine = (x0: number, y0: number, x1: number, y1: number) => {
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      many(100, (i) => {
        i = (i + 1) / 100;
        const x = lerp(x0, x1, i);
        const y = lerp(y0, y1, i);
        const k = noise(x / 5 + x0, y / 5 + y0) * 2;
        ctx.lineTo(x + k, y + k);
      });
      ctx.stroke();
    };

    const spawn = () => {
      const pts = many(333, () => ({ x: rnd(window.innerWidth), y: rnd(window.innerHeight), len: 0, r: 0, t: 0 }));
      const pts2 = many(9, (i) => ({ x: cos((i / 9) * PI * 2), y: sin((i / 9) * PI * 2) }));
      const seed = rnd(100);
      let tx = rnd(window.innerWidth), ty = rnd(window.innerHeight);
      let x = rnd(window.innerWidth), y = rnd(window.innerHeight);
      const kx = rnd(0.5, 0.5), ky = rnd(0.5, 0.5);
      const walkRadius = pt(rnd(50, 50), rnd(50, 50));
      const r = window.innerWidth / rnd(100, 150);

      const paintPt = (p: any) => {
        pts2.forEach((pt2) => {
          if (!p.len) return;
          drawLine(
            lerp(x + pt2.x * r, p.x, p.len * p.len),
            lerp(y + pt2.y * r, p.y, p.len * p.len),
            x + pt2.x * r, y + pt2.y * r,
          );
        });
        drawCircle(p.x, p.y, p.r);
      };

      return {
        follow(fx: number, fy: number) { tx = fx; ty = fy; },
        tick(t: number) {
          const fx = tx + cos(t * kx + seed) * walkRadius.x;
          const fy = ty + sin(t * ky + seed) * walkRadius.y;
          x += min(window.innerWidth / 100, (fx - x) / 10);
          y += min(window.innerWidth / 100, (fy - y) / 10);
          let i = 0;
          pts.forEach((p) => {
            const dx = p.x - x, dy = p.y - y;
            const len = hypot(dx, dy);
            let pr = min(2, window.innerWidth / len / 5);
            p.t = 0;
            const increasing = len < window.innerWidth / 10 && i++ < 8;
            if (increasing) pr *= 1.5;
            p.r = pr;
            p.len = max(0, min(p.len + (increasing ? 0.1 : -0.1), 1));
            paintPt(p);
          });
        },
      };
    };

    const spiders = many(2, spawn);

    this.pointerHandler = (e: PointerEvent) => spiders.forEach((s) => s.follow(e.clientX, e.clientY));
    window.addEventListener('pointermove', this.pointerHandler);

    const anim = (t: number) => {
      if (w !== window.innerWidth) w = canvas.width = window.innerWidth;
      if (h !== window.innerHeight) h = canvas.height = window.innerHeight;
      ctx.fillStyle = '#000';
      drawCircle(0, 0, w * 10);
      ctx.fillStyle = ctx.strokeStyle = '#fff';
      spiders.forEach((s) => s.tick(t / 1000));
      this.animFrame = requestAnimationFrame(anim);
    };

    this.animFrame = requestAnimationFrame(anim);
  }

  ngOnDestroy(): void {
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
    if (this.pointerHandler) window.removeEventListener('pointermove', this.pointerHandler);
  }
}
