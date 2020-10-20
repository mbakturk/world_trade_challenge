import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private userService: AuthService, private router: Router) {
  }

  signIn() {
    this.userService.signIn().then(() => this.router.navigateByUrl('/'));
  }

}
