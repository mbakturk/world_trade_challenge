import {APP_INITIALIZER, NgModule} from '@angular/core';
import {SearchService} from './services/search.service';
import {HeaderComponent} from "./header/header.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CountryService} from "./services/country.service";

function dataInit(countryService: CountryService) {
  return () => countryService.load();
}

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [
    SearchService,
    CountryService,
    {
      provide: APP_INITIALIZER,
      useFactory: dataInit,
      multi: true,
      deps: [CountryService]
    }
  ],
  exports: [HeaderComponent],
})
export class CoreModule {
}
