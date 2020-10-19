import {Component, EventEmitter, Output} from '@angular/core';
import {SearchService} from '../services/search.service';
import {Country} from "../models/country";


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  search = '';
  resultList = [];

  @Output() selectedCountry: EventEmitter<Country> = new EventEmitter<Country>();

  constructor(private searchService: SearchService) {
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
