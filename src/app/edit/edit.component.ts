import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

interface Pet {
  id: number;
  userId: number;
  colorId: number;
  color: string;
  typeId: number;
  type: string;
  countryId: number;
  country: string;
  name: string;
  code: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  typeValues: any;
  countryValues: any;
  colorValues: any;
  petInfo?: Pet;
  name: string = "";
  code: number = 0;
  type: number = 0;
  color: number = 0;
  country: number = 0;

  constructor(private http: HttpClient, private _router: Router) {
  }

  petCode: any = sessionStorage.getItem('singlePetCode')


  getSinglePetInfo() {
    this.http.get('http://localhost:8080/petinfo?petCode=' + this.petCode).subscribe(
      {
        next: (data) => {
          this.petInfo = data as Pet;
          this.name = this.petInfo.name;
          this.code = this.petInfo.code;
          this.type = this.petInfo.typeId;
          this.color = this.petInfo.colorId
          this.country = this.petInfo.countryId
          console.log(this.petInfo)
        }
      }
    )
  }

  deletePet() {
    this.http.delete('http://localhost:8080/pet?petCode=' + this.petCode).subscribe({
        next: () => {
        }
      }
    )
    this._router.navigateByUrl('/list')
    sessionStorage.removeItem('singlePetCode')
  }

  editPet() {
    this.http.put("http://localhost:8080/pet", {
      petColorId: Number(this.color),
      petTypeId: Number(this.type),
      petCountryId: Number(this.country),
      name: this.name,
      code: Number(this.code)
    }).subscribe({
      next: () => {
        this._router.navigateByUrl('/list')
      },
      error: err => {
      }
    });
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
    this.getTypeValues();
    this.getColorValues();
    this.getCountryValues();
    this.getSinglePetInfo();
  }

}
