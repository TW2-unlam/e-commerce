import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(
    protected router: Router,
    private authService: AuthServiceService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('loggedUser')) {
      alert('Ya se encuentra logueado');
      this.router.navigate(['/']);
    }
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  Login() {
    this.showSpinner(true);
    if (this.formGroup.valid) {
      this.authService.login(this.formGroup.value).subscribe((result) => {
        if (result.jwt) {
          localStorage.setItem('loggedUser', JSON.stringify(result));
          alert('Login successfully');
          this.showSpinner(false);
          this.router.navigate(['/']);
        } else {
          alert(result.message);
        }
      });
    }
  }

  showSpinner(status: boolean) {
    if (status) {
      this.spinner.show(undefined, {
        type: 'pacman',
        size: 'medium',
        bdColor: 'rgba(0,0,0, .50)',
        color: 'white',
        fullScreen: true,
      });
    } else {
      // setTimeout(() => this.spinner.hide(), 2000);
      this.spinner.hide();
    }
  }
}
