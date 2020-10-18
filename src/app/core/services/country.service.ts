import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Country, CountryDict, Operation} from "../models/country";

@Injectable()
export class CountryService {
  private countriesUrl = 'assets/countries.json';
  private countryDict: CountryDict = {};
  private readonly operationalCountryData: CountryDict = {};

  constructor(private http: HttpClient) {
    this.operationalCountryData = this.getLocalStorageData();
    this.fetchCountryList().subscribe((data: any) => {
        this.countryDict = data;
      }
    );
  }

  public saveCountyOperation(countryCode: string, operation: Operation) {
    const data = this.getOperationalDataOfCountry(countryCode);
    data.operation = operation
    this.pushToLocalStorage()
  }

  public addNoteToCountry(countryCode: string, note: string) {
    const data = this.getOperationalDataOfCountry(countryCode);
    data.note.push(note);
    this.pushToLocalStorage()
  }

  public deleteCountryData(countryCode: string) {
    delete this.operationalCountryData[countryCode];
    this.pushToLocalStorage()
  }

  public getOperationalCountryData(): CountryDict {
    return this.operationalCountryData;
  }

  private getOperationalDataOfCountry(countryCode: string): Country {
    if (!this.operationalCountryData[countryCode]) {
      this.operationalCountryData[countryCode] = {} as any;
    }
    return this.operationalCountryData[countryCode];
  }

  private pushToLocalStorage() {
    const serializedData = JSON.stringify(this.operationalCountryData)
    localStorage.setItem("app-data", serializedData)
  }

  private getLocalStorageData(): CountryDict {
    const initialData = localStorage.getItem("app-data")
    if (initialData) {
      return JSON.parse(initialData)
    }
    return {}
  }

  public getCountyList(): Country[] {
    return Object.values(this.countryDict);
  }

  public getCountyDict(): CountryDict {
    return this.countryDict;
  }

  private fetchCountryList() {
    return this.http.get(this.countriesUrl);
  }
}
