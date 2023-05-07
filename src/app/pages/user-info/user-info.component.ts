import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User, UserRole } from '../../shared/models/user';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  user?: User;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.user = this.auth.user;
  }

  userRoleToString(role: UserRole): string {
    switch(role) {
      case UserRole.Student: return 'Diák';
      case UserRole.Teacher: return 'Tanár';
      case UserRole.Administrator: return 'Adminisztrátor';
    }
    return '';
  }

}
