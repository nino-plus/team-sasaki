import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeroComponent } from './hero/hero.component';
import { UsageComponent } from './usage/usage.component';


@NgModule({
  declarations: [WelcomeComponent, HeroComponent, UsageComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ]
})
export class WelcomeModule { }
