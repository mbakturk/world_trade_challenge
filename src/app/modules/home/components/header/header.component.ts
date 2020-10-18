import {Component, Input} from '@angular/core';
import {SearchService} from '../../../../core/services/search.service';


@Component({
  selector: 'home-header',
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
