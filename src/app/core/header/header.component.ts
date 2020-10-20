import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Country} from "../models/country";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username;
  search;
  resultList = [];

  @Output() selectedCountry: EventEmitter<Country> = new EventEmitter<Country>();

  constructor(private searchService: SearchService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.username = this.authService.getUser().getName();
    console.log("detail", this.username);
  }

  searchCountries(name) {
    this.search = name;
    if (name.length >= 3) {
      this.resultList = this.searchService.findCountries(name);
    }
  }

  clearTextBox() {
    this.search = '';
    this.resultList = [];
  }

  selectCountry(country: Country) {
    this.selectedCountry.emit(country);
    this.clearTextBox()
  }


}
