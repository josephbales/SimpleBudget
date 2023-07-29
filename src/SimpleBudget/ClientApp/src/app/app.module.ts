import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { NavTopComponent } from './shared/components/nav-top/nav-top.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { BudgetItemTableComponent } from './components/budget/budget-item-table/budget-item-table.component';

import { JwtModule } from '@auth0/angular-jwt';
import { jwtConfig, socialAuthServiceConfig } from './auth-config';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    NavTopComponent,
    HomeComponent,
    FetchDataComponent,
    UserProfileComponent,
    UserDashboardComponent,
    UserLoginComponent,
    BudgetItemTableComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: jwtConfig
    }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: socialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
