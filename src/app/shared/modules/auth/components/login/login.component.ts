import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      // Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}')
      password: [null, Validators.required]
    });
  }
  get username() { return this.loginForm.get('username'); }
  get password() { return this.loginForm.get('password'); }

  onSingIn() {
    const formValue = this.loginForm.value;
    if (formValue.username && formValue.password) {
      this.authService.login(formValue).subscribe(
        data => {
          const USER_ID: number = data.user_type_id;
          const ACCESS_TOKEN: NavigationExtras = {
            fragment: data.token
          };
          if (USER_ID === 1) {
            this.router.navigate(['/admin'], ACCESS_TOKEN);
          } else if (USER_ID === 2) {
            this.router.navigate(['/blood-bank'], ACCESS_TOKEN);
          } else if (USER_ID === 3) {
            this.router.navigate(['/hospital'], ACCESS_TOKEN);
          } else if (USER_ID === 4) {
            this.router.navigate(['/doctor'], ACCESS_TOKEN);
          }
        },
        err => { console.log(err); }
      );
    }

  }

}
