import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  password: string = "";
  username: string = "";
  passwordConfirmation: string = "";
  firstname: string = "";
  lastname: string = "";
  email: string = "";
  response: any;
  passwordCheck: boolean = false;

  constructor(private http: HttpClient) {

  }

  registerUser() {
    if (this.password === this.passwordConfirmation &&
    this.email.includes('@')) {
      this.http.post("http://localhost:8080/register", {
        username: this.username,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email
      }).subscribe((data) => {
        this.response = data
      });
    } else {
      this.passwordCheck = true
    }
  }
}
