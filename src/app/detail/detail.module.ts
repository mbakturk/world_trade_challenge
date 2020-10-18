import {NgModule} from '@angular/core';
import {DetailComponent} from './detail.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CoreModule} from "../core/core.module";
import { WorldMapComponent } from './components/world-map/world-map.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';

@NgModule({
  declarations: [
    DetailComponent,
    WorldMapComponent,
    ContextMenuComponent
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
