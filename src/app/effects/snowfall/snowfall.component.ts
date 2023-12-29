import { ChangeDetectionStrategy, Component } from '@angular/core';

export interface SnowFlakeConfig {
  depth: number;
  left: number;
  speed: number;
}

@Component({
  selector: 'app-snowfall',
  standalone: true,
  inputs: ["depth", "speed"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './snowfall.component.html',
  styleUrl: './snowfall.component.scss'
})
export class SnowfallComponent {

  public depth: number;
  public speed: number;

  public flakeOpacity: number;
  public flakeSize: number;
  public horizontalDuration: number;
  public horizontalDelay: number;
  public verticalDelay: number;
  public verticalDuration: number;

  constructor() {
    this.depth = 1;
    this.speed = 1;

    this.flakeOpacity = 1;
    this.flakeSize = 1;
    this.verticalDuration = 5;
    this.verticalDelay = 0;
    this.horizontalDuration = 3;
    this.horizontalDelay = 0;
  }

  public ngOnChanges(): void {
    const speedConfig: { [key: number]: { verticalDuration: number; horizontalDuration: number } } = {
      1: { verticalDuration: 5, horizontalDuration: 3 },
      2: { verticalDuration: 6, horizontalDuration: 3 },
      3: { verticalDuration: 8, horizontalDuration: 3.5 },
      4: { verticalDuration: 10, horizontalDuration: 4 },
      5: { verticalDuration: 15, horizontalDuration: 5 },
    };

    const depthConfig: { [key: number]: { flakeSize: number; flakeOpacity: number } } = {
      1: { flakeSize: 1, flakeOpacity: 1 },
      2: { flakeSize: 2, flakeOpacity: 1 },
      3: { flakeSize: 3, flakeOpacity: 0.9 },
      4: { flakeSize: 5, flakeOpacity: 0.5 },
      5: { flakeSize: 10, flakeOpacity: 0.2 },
    };

    this.verticalDuration = speedConfig[this.speed].verticalDuration;
    this.horizontalDuration = speedConfig[this.speed].horizontalDuration;
    this.verticalDelay = Math.random() * -this.verticalDuration;
    this.horizontalDelay = Math.random() * -this.horizontalDuration;
    this.flakeSize = depthConfig[this.depth].flakeSize;
    this.flakeOpacity = depthConfig[this.depth].flakeOpacity;
  }

  public static initSnowEffect(instances: number): Promise<any[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        let snowFlakes: any[] = [];
        for (let i = 0; i <= instances; i++) {
          snowFlakes.push({
            depth: this.randRange(1, 5),
            left: this.randRange(0, 100),
            speed: this.randRange(1, 5)
          });
        }
        resolve(snowFlakes);
      }, 100);
    });
  }

  public static randRange(min: number, max: number): number {
    let range = (max - min);
    return (min + Math.round(Math.random() * range));
  }

}
