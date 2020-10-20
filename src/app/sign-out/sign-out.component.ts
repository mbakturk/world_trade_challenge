import {Component, OnInit} from '@angular/core';
import {AuthService} from "../core/services/auth.service";

@Component({
  selector: 'sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

  isSignedOut = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.signOut().then(() => this.isSignedOut = true)
  }

}
