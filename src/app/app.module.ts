import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalGuard, MsalInterceptor, MsalModule, MsalRedirectComponent } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AzureAdDemoService } from './azure-ad-demo.service';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication(
      {
              auth: {
                  clientId: 'fce2a9e4-64b7-4fa7-a902-0ac624609620',
                  redirectUri: 'http://localhost:4200', 
                  authority: 'https://login.microsoftonline.com/5cf8a49f-a8e9-4c42-a8c4-5e411666758f'
              },
              cache: {
                cacheLocation: 'localStorage',
                storeAuthStateInCookie: isIE
              }
      }
    ),
    {
      interactionType:InteractionType.Redirect,
      authRequest: {
        scopes: ['user.read']
      }
    },
    {
      interactionType:InteractionType.Redirect,
      protectedResourceMap:new Map([['https://graph.microsoft.com/v1.0/me', ['user.read']],['http://localhost:3000/api/*', ['api://c5f2e707-5600-43f3-b114-88fd7e8fcd2b/general']]])
    }
  ),
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass: MsalInterceptor, 
    multi:true
  },MsalGuard,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    AzureAdDemoService
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
