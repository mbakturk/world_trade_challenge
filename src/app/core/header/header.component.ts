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
    this.resultList = this.searchService.findCountries(name);
  }

  clearTextBox() {
    this.search = '';
    this.resultList = [];
  }
}
