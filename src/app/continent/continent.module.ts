import {NgModule} from '@angular/core';
import {ContinentComponent} from './continent.component';
import {CoreModule} from "../core/core.module";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  declarations: [ContinentComponent],
  imports: [BrowserModule, CoreModule],
  exports: [ContinentComponent]
})
export class ContinentModule {
}
