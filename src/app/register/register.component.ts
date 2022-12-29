import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  usernameError: string = "002"
  emailError: string = "003"
  password: string = "";
  username: string = "";
  passwordConfirmation: string = "";
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  registerResponse: any;
  errorResponse: any = {
    message: "",
    errorCode: ""
  }
  passwordCheck: boolean = false;
  emailCheck: boolean = false;
  registerCheck: boolean = false;
  inputCheck: boolean = false;

  constructor(private http: HttpClient) {

  }

  registerUser() {
    this.registerCheck = false;
    this.passwordCheck = false;
    this.emailCheck = false;
    if (this.password === this.passwordConfirmation &&
      this.email.includes('@')) {
      this.http.post("http://localhost:8080/register", {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email
      }).subscribe({
        next: () => {
          this.registerCheck = true;
        },
        error: err => {
          this.errorResponse = err.error;
        }
      });
    } else if (this.username.length == 0 || this.password.length == 0 ||
      this.firstname.length == 0 || this.lastname.length == 0 || this.email.length == 0) {
      this.inputCheck = true;
    } else {
      this.passwordCheck = true;
    }
  }

  validateEmail() {
    if (this.email.includes('@')) {
      this.emailCheck = false;
    } else {
      this.emailCheck = true
    }
  }
}
