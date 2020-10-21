import {NgModule} from '@angular/core';
import {CoreModule} from '../core/core.module';
import {BrowserModule} from '@angular/platform-browser';
import {SignInComponent} from './sign-in.component';


@NgModule({
  declarations: [SignInComponent],
  imports: [BrowserModule, CoreModule],
  exports: [SignInComponent]
})
export class SignInModule {
}
