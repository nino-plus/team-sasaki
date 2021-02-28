import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { RankingComponent } from './ranking/ranking.component';
import { RankCardComponent } from './rank-card/rank-card.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [HomeComponent, RankingComponent, RankCardComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule
  ]
})
export class HomeModule { }
