import {NgModule} from '@angular/core';
import {DetailComponent} from './detail.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {CoreModule} from "../core/core.module";
import { WorldMapComponent } from './components/world-map/world-map.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    DetailComponent,
    WorldMapComponent,
    ContextMenuComponent,
    AddNoteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    RouterModule
  ],
  exports: [DetailComponent],

})
export class DetailModule {
}
