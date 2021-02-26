import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShellComponent } from './shell/shell.component';

const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./signup/signup.module').then((m) => m.SignupModule),
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'setting',
        loadChildren: () =>
          import('./setting/setting.module').then((m) => m.SettingModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
      {
        path: 'create',
        loadChildren: () =>
          import('./create/create.module').then((m) => m.CreateModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
