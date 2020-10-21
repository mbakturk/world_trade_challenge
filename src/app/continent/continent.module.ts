import {NgModule} from '@angular/core';
import {ContinentComponent} from './continent.component';
import {CoreModule} from '../core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [ContinentComponent],
  imports: [BrowserModule, CoreModule,  RouterModule],
  exports: [ContinentComponent]
})
export class ContinentModule {
}
