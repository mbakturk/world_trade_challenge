import {NgModule} from '@angular/core';
import {SearchService} from './services/search.service';
import {HeaderComponent} from "./header/header.component";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CountryService} from "./services/country.service";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [SearchService, CountryService],
  exports: [HeaderComponent],
})
export class CoreModule {
}
