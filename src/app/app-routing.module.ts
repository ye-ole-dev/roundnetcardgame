import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { IngameComponent } from './ingame/ingame.component';
import { AuthGuard } from './auth/auth.guard';
import { LobbyComponent } from './lobby/lobby.component';


const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'About the Roundnet Card Game' }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'lobby',
    component: LobbyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingame/:gameId/:team',
    component: IngameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingame/:gameId',
    component: IngameComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    /** TODO: May add a page-not-found-component
     * (or handle redirecting otherways) with
     * fun 'lobster-trab'/'missed'/'rim'/ texts
     */
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
