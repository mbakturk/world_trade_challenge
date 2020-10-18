import {NgModule} from '@angular/core';
import {DetailComponent} from './detail.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CoreModule} from "../core/core.module";

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule
  ],
  exports: [DetailComponent],

})
export class DetailModule {
}
