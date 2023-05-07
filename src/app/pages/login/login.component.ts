import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { take, takeWhile } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {}

  async login() {
    this.loading = true;
    this.auth.login(this.loginForm.get('email')?.value, this.loginForm.get('password')?.value).then(cred => {
      this.snackBar.open('Sikeres bejelentkezés!', '', {duration: 2000});
      this.auth.userObservable.pipe(take(1)).subscribe(_ => {
        this.router.navigateByUrl('/messages')
        this.loading = false;
      });
    }, err => {
      this.snackBar.open('Bejelentkezés sikertelen: ' + err, '', {duration: 2000});
      this.loading = false;
    });
  }
}
