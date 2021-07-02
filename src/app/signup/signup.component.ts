import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../service/auth-service.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  formGroup!: FormGroup;
  constructor( protected router: Router,
    private authService: AuthServiceService) { 
   
  }

  ngOnInit(): void {
    this.initForm();
  }
  
  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      name : new FormControl('',[Validators.required]),
      family_name : new FormControl('',[Validators.required]),
      address : new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])

    });
  }
 SignUp() {
    if (this.formGroup.valid) {
      this.authService.signup(this.formGroup.value).subscribe((result) => {
        if (result.bienvenido) {
          alert('Le llegará un email para que valide su cuenta');
          this.router.navigate(['/']);
        } else {
          alert(result.message);
        }
      });
    }
  }

}
