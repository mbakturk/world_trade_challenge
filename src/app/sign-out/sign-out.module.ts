import { NgModule } from '@angular/core';
import { SignOutComponent } from './sign-out.component';
import {CoreModule} from "../core/core.module";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [SignOutComponent],
  imports: [
    BrowserModule,
    CoreModule,
    RouterModule
  ],
  exports: [SignOutComponent]
})
export class SignOutModule { }
