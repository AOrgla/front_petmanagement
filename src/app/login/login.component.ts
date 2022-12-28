import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginInfo: any = {
    id: 0,
    username: ""
  };

  username: string = ""
  password: string = ""

  constructor(private http: HttpClient) {

  }

  getLoginInfo(username: string, password: string) {
    this.http.post("http://localhost:8080/login",
      {password: password, username: username})
      .subscribe((data) => {
        this.loginInfo = data
        sessionStorage.setItem('userId', this.loginInfo.id)
        console.log(data);
      });
  }
}
