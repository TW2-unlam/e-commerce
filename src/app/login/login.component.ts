import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    protected router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  Login() {
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe((result) => {
        if (result.jwt) {
          localStorage.setItem('loggedUser', result);
          alert('Login successfully');
          this.router.navigate(['/']);
        } else {
          alert(result.message);
        }
      });
    }
  }
}
