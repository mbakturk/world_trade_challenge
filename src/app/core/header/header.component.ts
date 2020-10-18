import {Component} from '@angular/core';
import {SearchService} from '../services/search.service';


@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  search = '';
  resultList = [];

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
}
