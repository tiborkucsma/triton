import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserRole } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

  userRole = UserRole;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {}

  isUserLoggedIn() {
    return this.auth.isUserLoggedIn();
  }

  userHasRole(role: UserRole) {
    return this.auth.userHasRole(role);
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
