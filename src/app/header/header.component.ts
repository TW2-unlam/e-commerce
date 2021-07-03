import { RecursiveAstVisitor } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(protected router: Router, private toastr: ToastrService) {}

  loggedUserData: any = {};
  loggedUserName: string = '';
  isLoggedIn: boolean = false;

  ngOnInit(): void {
    this.loggedUserName = this.getLoggedUserName();
  }

  getLoggedUserName() {
    this.loggedUserData = JSON.parse(
      localStorage.getItem('loggedUser') || '{}'
    );
    if (this.loggedUserData.user) {
      this.isLoggedIn = true;
      return this.loggedUserData.user.name ? this.loggedUserData.user.name : '';
    }
  }

  deleteLocalStorage() {
    if (confirm('¿Esta seguro? ')) {
      localStorage.clear();
      this.router.navigate(['/']);
      this.showToastNotification('success', 'Deslogueo exitoso');
    }
  }

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
}
