import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserLoginComponent } from './components/user-login/user-login.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'fetch-data',
    component: FetchDataComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: UserLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
