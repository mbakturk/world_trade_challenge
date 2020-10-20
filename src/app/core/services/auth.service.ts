import {Injectable} from '@angular/core';

declare var gapi;

@Injectable()
export class AuthService {

  private auth2: any;
  private googleUser: any;
  private userReadyCb: any;

  getUser() {
    console.log("ali")
    return this.googleUser;
  }

  signIn(): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.auth2.signIn().then(result => {
        this.handleUserChanged(result);
        resolve(true);
      }).catch(reason => reject(reason)))
  }

  signOut(): Promise<any> {
    return new Promise<any>((resolve, reject) =>
      this.auth2.signOut().then(value => {
        this.googleUser = null;
        resolve(true);
      }).catch(reason => reject(reason)))
  }

  load() {
    return new Promise<Boolean>((resolve, reject) => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '530298631720-82hf75c4spu840la2fvvmcvi558f3u5k.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        this.auth2.currentUser.listen(this.handleUserChanged.bind(this))

        if (this.auth2.isSignedIn.get() == true) {
          this.signIn().then(value => resolve(true)).catch(reason => reject(reason));
        } else {
          this.userReadyCb = () => resolve(true)
        }
      });
    });
  }

  private handleUserChanged(user) {
    this.googleUser = user.getBasicProfile();
    if (this.userReadyCb) {
      this.userReadyCb();
      this.userReadyCb = null;
    }
  }

}
