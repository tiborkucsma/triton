import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { firstValueFrom, mergeMap, Observable } from 'rxjs';
import { User, UserRole } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user?: User;

  userObservable: Observable<User | undefined>;

  constructor(private auth: AngularFireAuth, private userService: UserService) {
    let lsUser = localStorage.getItem('loggedInUser');

    this.userObservable = this.auth.user.pipe(
      mergeMap(e => e ? this.userService.getById(e.uid) : new Observable(_ => undefined))) as Observable<User | undefined>;

    if (lsUser)
      this.user = JSON.parse(lsUser);

    this.auth.user.subscribe(async cred => {
      if (cred) {
        this.user = await firstValueFrom(this.userService.getById(cred.uid));
        localStorage.setItem('loggedInUser', JSON.stringify(this.user));
      } else {
        this.user = undefined;
        localStorage.removeItem('loggedInUser');
      }
    });
  }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async signup(user: User, password: string) {
    let res = await this.auth.createUserWithEmailAndPassword(user.email, password);
    if (res.user) {
      user.id = res.user.uid;
      return await this.userService.create(user);
    }
    return undefined;
  }

  logout() {
    return this.auth.signOut();
  }

  isUserLoggedIn() {
    return this.user !== undefined;
  }

  userHasRole(role: UserRole) {
    return this.isUserLoggedIn() && this.user?.role === role;
  }

}
