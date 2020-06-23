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
          const USER_TYPE_ID: number = data.user_type_id;
          if (USER_TYPE_ID === 1) {
            this.router.navigate(['/admin']);
          } else if (USER_TYPE_ID === 2) {
            this.router.navigate(['/blood-bank']);
          } else if (USER_TYPE_ID === 3) {
            this.router.navigate(['/hospital']);
          } else if (USER_TYPE_ID === 4) {
            this.router.navigate(['/doctor']);
          } else if (USER_TYPE_ID === 5) {
            this.router.navigate(['/donor']);
          }
        },
        err => { console.log(err); }
      );
    }

  }

}
