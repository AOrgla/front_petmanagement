import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  typeValues: any;
  colorValues: any;
  countryValues: any;
  selectedType: any;
  petName: string = "";
  petCode: any;
  codeCheck: boolean = false;
  petType: number = 0;
  petColor: any;
  petCountry: any;
  inputCheck: boolean = false;
  errorResponse: any = {
    message: "",
    errorCode: ""
  }
  codeExistsError: string = "006"
  codeLengthError: string = "007"
  codeValueCheck: boolean = false;



  constructor(private http: HttpClient, private _router: Router) {

  }

  ngOnInit() {
    this.getTypeValues();
    this.getCountryValues();
    this.getColorValues()
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

  addPet() {
    if (this.petName.length === 0 || this.petType === 0 || this.petCode.length === 0 || this.petCountry === 0
      || this.petColor === 0) {
      this.inputCheck = true;
    } else if (this.petCode.value < 10000) {
      this.codeValueCheck = true;
    } else {
      this.http.post("http://localhost:8080/pet", {
        userId: sessionStorage.getItem('userId'),
        petColorId: Number(this.petColor),
        petTypeId: Number(this.petType),
        petCountryId: Number(this.petCountry),
        name: this.petName,
        code: Number(this.petCode)
      }).subscribe({
        next: () => {
          this._router.navigateByUrl('/list')
        },
        error: err => {
          this.errorResponse = err.error;
        }
      });
    }
  }
}
