import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class SearchService {
  private countriesUrl = 'assets/countries.json';
  private countryList = {};

  constructor(private http: HttpClient) {
    this.getCountries().subscribe(data => {
        this.countryList = data;
        console.log(data);
      }
    );
  }

  public findCountries(name: string): any {
    if (name.length < 3) {
      return [];
    }
    return Object.entries(this.countryList).filter((item: [string, string]) => {
      return item[1].toLocaleLowerCase().includes(name.toLocaleLowerCase());
    });
  }

  private getCountries() {
    return this.http.get(this.countriesUrl);
  }
}
