import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DetailModule} from './detail/detail.module';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './core/core.module';
import {ContinentModule} from './continent/continent.module';
import {SignInModule} from './sign-in/sign-in.module';
import {SignOutModule} from './sign-out/sign-out.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    CoreModule,
    DetailModule,
    ContinentModule,
    SignInModule,
    SignOutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
