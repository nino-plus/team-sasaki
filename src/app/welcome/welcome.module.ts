import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeroComponent } from './hero/hero.component';
import { UsageComponent } from './usage/usage.component';
import { SheredModule } from '../shered/shered.module';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [WelcomeComponent, HeroComponent, UsageComponent],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    SheredModule,
    MatButtonModule
  ]
})
export class WelcomeModule { }
