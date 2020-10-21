import {Injectable} from '@angular/core';
import {CountryService} from './country.service';
import {Country} from '../models/country';

@Injectable()
export class SearchService {
  constructor(private countryService: CountryService) {

  }

  findCountries(name: string): any {
    return this.countryService.getCountyList().filter((item: Country) => {
      return item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase());
    });
  }
}
