import {NgModule} from '@angular/core';
import {HeaderComponent} from './components/header/header.component';
import {HomePage} from './pages/home/home.page';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    HomePage,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  exports: [HeaderComponent, HomePage],

})
export class HomeModule {
}
