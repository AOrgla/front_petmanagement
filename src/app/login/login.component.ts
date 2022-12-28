import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginInfo: any = {
    id: 0,
    username: ""
  }
  errorResponse: any = {
    message: "",
    errorCode: ""
  }
  username: string = ""
  password: string = ""

  constructor(private http: HttpClient, private _router: Router) {
  }

  getLoginInfo(username: string, password: string) {
    this.http.post("http://localhost:8080/login",
      {password: password, username: username})
      .subscribe({
        next: (data) => {
          this.loginInfo = data
          sessionStorage.setItem('userId', this.loginInfo.id)
          console.log(data);
          this._router.navigateByUrl('/list')
        },
        error: err => {
          this.errorResponse = err.error;
          console.log(this.errorResponse)
        }
      });
  }
}
