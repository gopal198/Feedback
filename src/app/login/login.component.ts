import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    
   }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;

        if(username == "employee@gmail.com" && password == "employee"){
          this.loginInvalid = false;
          this.router.navigate(['/employee',{"username":"John"}]);
        }else{
          this.loginInvalid = true;
        }
        
      }
  
  }

}
