import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SocialLoginModule, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './shared/components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { UserLoginComponent } from './components/user-login/user-login.component';

import { JwtModule } from '@auth0/angular-jwt';
import { jwtConfig, socialAuthServiceConfig } from './auth-config';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    FetchDataComponent,
    UserProfileComponent,
    UserDashboardComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    SocialLoginModule,
    GoogleSigninButtonModule,
    JwtModule.forRoot({
      config: jwtConfig
    })
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
