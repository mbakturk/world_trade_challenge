import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country, CountryDict, Operation} from '../models/country';
import {Observable} from 'rxjs';

@Injectable()
export class CountryService {
  private countriesUrl = 'assets/countries.json';
  private countryDict: CountryDict = {};
  private operationalCountryData: CountryDict = {};

  constructor(private http: HttpClient) {

  }

  load(): Promise<any> {
    this.operationalCountryData = this.getLocalStorageData();
    return this.fetchCountryList().toPromise().then((data: any) => {
        this.countryDict = data;
      }
    );
  }

  saveCountyOperation(countryCode: string, operation: Operation): void {
    const data = this.getOperationalDataOfCountry(countryCode);
    data.operation = operation;
    this.pushToLocalStorage();
  }

  addNoteToCountry(countryCode: string, note: string): void {
    const data = this.getOperationalDataOfCountry(countryCode);
    data.note.push(note.trim());
    this.pushToLocalStorage();
  }

  deleteCountryData(countryCode: string): void {
    delete this.operationalCountryData[countryCode];
    this.pushToLocalStorage();
  }

  getCountriesByContinent(continentCode: string): Country[] {
    return Object.values(this.countryDict).filter(country => country.continent === continentCode);
  }

  private getOperationalDataOfCountry(countryCode: string): Country {
    if (!this.operationalCountryData[countryCode]) {
      this.operationalCountryData[countryCode] = {note: [], code: countryCode} as any;
    }
    return this.operationalCountryData[countryCode];
  }

  public getOperationalCountryData(): CountryDict {
    return this.operationalCountryData;
  }

  public getCountyList(): Country[] {
    return Object.values(this.countryDict);
  }

  public getCountyDict(): CountryDict {
    return this.countryDict;
  }

  public getCountryByCode(countryCode: string): Country {
    return this.countryDict[countryCode] || {} as any;
  }

  private fetchCountryList(): Observable<any> {
    return this.http.get(this.countriesUrl);
  }

  private pushToLocalStorage(): void {
    const serializedData = JSON.stringify(this.operationalCountryData);
    localStorage.setItem('app-data', serializedData);
  }

  private getLocalStorageData(): CountryDict {
    const initialData = localStorage.getItem('app-data');
    if (initialData) {
      return JSON.parse(initialData);
    }
    return {};
  }
}
