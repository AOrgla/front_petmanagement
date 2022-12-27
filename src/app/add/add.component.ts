import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

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


  constructor(private http: HttpClient) {

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

}
