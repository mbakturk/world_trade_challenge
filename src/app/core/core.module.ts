import {APP_INITIALIZER, NgModule} from '@angular/core';
import {SearchService} from './services/search.service';
import {HeaderComponent} from "./header/header.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CountryService} from "./services/country.service";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./guard/auth.guard";
import {RouterModule} from "@angular/router";

function fetchDataAndInitAuth2(countryService: CountryService, authService: AuthService) {
  return () => countryService.load().then(() => (authService.load()));
}


@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  providers: [
    SearchService,
    CountryService,
    AuthService,
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: fetchDataAndInitAuth2,
      multi: true,
      deps: [CountryService, AuthService]
    }
  ],
  exports: [HeaderComponent],
})
export class CoreModule {
}
