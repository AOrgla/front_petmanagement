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
  sort: number = 1;
  sortField: string = "";

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

  order(fieldName: string) {
    if (this.sortField !== fieldName) {
      this.sort = 1;
    }

    if (this.sortField === fieldName) {

      if (this.sort === 1) {
        this.sort = -1;
      }
       else if (this.sort === -1) {
        this.sort = 1;
      }
    }

    this.sortField = fieldName;

    this.userPets = this.userPets.sort((a: any, b: any) => {

      if (a[this.sortField] < b[this.sortField]) {
        return -1 * this.sort;
      }
      if (a[this.sortField] > b[this.sortField]) {
        return this.sort;
      }
      return 0;
    });

  }

  orderDirection(name: string) {
    if (name !== this.sortField) {
      return;
    }
    if (this.sort === 1) {
      return 'arrow up';
    }
    return 'arrow down'
  }
}
