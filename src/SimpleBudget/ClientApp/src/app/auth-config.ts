import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { JwtConfig } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem("token");
}

export const socialAuthServiceConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '744377179855-of51ggua4sulmru09f7akraf2ab4l166.apps.googleusercontent.com',
        {
          oneTapEnabled: false,
        }
      )
    }
  ],
  onError: (err) => {
    console.error(err);
  }
}

export const jwtConfig: JwtConfig = {
  tokenGetter: tokenGetter,
  allowedDomains: ["localhost:44428"],
  disallowedRoutes: []
}
