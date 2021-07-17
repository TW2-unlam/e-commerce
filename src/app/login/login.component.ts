import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;
  loggedUsername: string = '';
  isLogged: boolean = false;

  constructor(
    protected router: Router,
    private authService: AuthServiceService,
    private modal: NgbModal,
    private spinner: NgxSpinnerService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.data.isLogged.subscribe((state) => (this.isLogged = state));
    this.data.loggedUsername.subscribe((user) => (this.loggedUsername = user));

    if (this.isLogged) {
      this.data.showToastNotification('warning', 'Ya se encuentra logueado');
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
    if (this.formGroup.valid) {
      this.showSpinner(true);
      this.authService.login(this.formGroup.value).subscribe((result) => {
        if (result.jwt) {
          this.data.changeLoggedUsername(result.user.name);
          this.data.setIsLogged(true);
          localStorage.setItem('loggedUser', JSON.stringify(result));
          this.data.showToastNotification('success', 'Login exitoso');
          this.showSpinner(false);
          this.router.navigate(['/']);
        } else {
          setTimeout(() => this.spinner.hide(), 5000);
          this.data.showToastNotification('error', result.message);
          this.spinner.hide();
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
      this.spinner.hide();
    }
  }
}
