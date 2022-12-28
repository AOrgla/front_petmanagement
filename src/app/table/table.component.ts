import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  userId = sessionStorage.getItem('userId')
  userPets: any;
  petCode: any;

  constructor(private http: HttpClient,
              private _router: Router) {

  }

  getPetInfo() {
    this.http.get("http://localhost:8080/pet?userId=" + this.userId)
      .subscribe(response => {
      this.userPets = response;
    });
  }

  ngOnInit() {
    this.getPetInfo()
  }

  logOut() {
    sessionStorage.clear()
  }

  editPet(petCode: string) {
    sessionStorage.setItem('singlePetCode', petCode)
    this._router.navigateByUrl('/edit')
  }
}
