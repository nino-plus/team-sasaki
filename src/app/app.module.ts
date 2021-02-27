import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, REGION } from '@angular/fire/functions';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { FinishDialogComponent } from './finish-dialog/finish-dialog.component';
import { GiveupDialogComponent } from './giveup-dialog/giveup-dialog.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SheredModule } from './shered/shered.module';
import { HeaderComponent } from './shered/header/header.component';
import { FooterComponent } from './shered/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    FinishDialogComponent,
    GiveupDialogComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    SheredModule
  ],
  providers: [
    {
      provide: REGION,
      useValue: 'asia-northeast1',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
