import {Component} from '@angular/core';
import {AuthService} from '../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  constructor(private userService: AuthService, private router: Router) {
  }

  signIn(): void {
    this.userService.signIn().then(() => this.router.navigateByUrl('/'));
  }

}
