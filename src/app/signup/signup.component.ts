import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;
  constructor(
    protected router: Router,
    private authService: AuthServiceService,
    private toastr: ToastrService
  ) {}

  showToastNotification(type: string, message: string) {
    // Passed to ToastrService.success/error/warning/info/show()
    switch (type) {
      case 'success': {
        this.toastr.success(message, 'Success');
        break;
      }
      case 'error': {
        this.toastr.error(message, 'Error');
        break;
      }
      case 'warning': {
        this.toastr.warning(message, 'Warning');
        break;
      }
      case 'info': {
        this.toastr.info(message, 'Info');
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      family_name: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  SignUp() {
    if (this.formGroup.valid) {
      this.authService.signup(this.formGroup.value).subscribe((result) => {
        if (result.bienvenido) {
          this.showToastNotification(
            'success',
            'Le llegará un email para que valide su cuenta'
          );
          this.router.navigate(['/']);
        } else {
          this.showToastNotification('error', result.message);
        }
      });
    }
  }
}
