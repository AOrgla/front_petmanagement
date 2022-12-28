import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  userId = sessionStorage.getItem('userId')
  userPets: any;

  constructor(private http: HttpClient) {

  }

  getPetInfo() {
    this.http.get("http://localhost:8080/pet?userId=" + this.userId).subscribe(response => {
      this.userPets = response;
    });
  }

  ngOnInit() {
    this.getPetInfo()
  }

  logOut() {
    sessionStorage.clear()
  }
}
