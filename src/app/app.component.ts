import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import {
  SnowfallComponent,
  SnowFlakeConfig,
} from './effects/snowfall/snowfall.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    CardComponent,
    SignupComponent,
    LoginComponent,
    SnowfallComponent,
  ],
})
export class AppComponent {
  public snowFlakes: SnowFlakeConfig[] | undefined;
  title = 'auth-app';

  constructor() {
    this.initSnowEffect();
  }

  async initSnowEffect() {
    this.snowFlakes = await SnowfallComponent.initSnowEffect(8);
  }
}
