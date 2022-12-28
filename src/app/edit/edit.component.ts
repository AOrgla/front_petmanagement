import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {publish} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  typeValues: any;
  countryValues: any;
  colorValues: any;
  petInfo: any;

  constructor(private http: HttpClient, private _router: Router) {
  }

  petCode: any = sessionStorage.getItem('singlePetCode')

  getSinglePetInfo() {
    this.http.get('http://localhost:8080/petinfo?petCode=' + this.petCode).subscribe(
      {next: (data) => {
        this.petInfo = data
        }}
    )
  }

  deletePet() {
    this.http.delete('http://localhost:8080/pet?petCode=' + this.petCode).subscribe({
      next: () => {}
    }
    )
    this._router.navigateByUrl('/list')
    sessionStorage.removeItem('singlePetCode')
  }

  editPet() {
    this._router.navigateByUrl('/list')
    sessionStorage.removeItem('singlePetCode')
  }

  getTypeValues() {
    this.http.get('http://localhost:8080/pettype').subscribe(response => {
      this.typeValues = response;
    });
  }

  getCountryValues() {
    this.http.get('http://localhost:8080/petcountry').subscribe(response => {
      this.countryValues = response;
    });
  }

  getColorValues() {
    this.http.get('http://localhost:8080/petcolor').subscribe(response => {
      this.colorValues = response;
    });
  }

  ngOnInit() {
    this.getSinglePetInfo()
    this.getTypeValues();
    this.getColorValues();
    this.getCountryValues();
  }
}
