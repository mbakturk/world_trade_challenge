import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailComponent} from './detail/detail.component';
import {ContinentComponent} from "./continent/continent.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {SignOutComponent} from "./sign-out/sign-out.component";

const routes: Routes = [
  {path: 'sign-in', component: SignInComponent},
  {path: '', component: DetailComponent, canActivate: [AuthGuard]},
  {path: 'continent/:continentCode', component: ContinentComponent, canActivate: [AuthGuard]},
  {path: 'sign-out', component: SignOutComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
