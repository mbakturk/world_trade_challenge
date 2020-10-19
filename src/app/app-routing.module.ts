import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {ContinentComponent} from "./continent/continent.component";

const routes: Routes = [
  {path: '', component: DetailComponent},
  {path: 'continent/:continentCode', component: ContinentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
