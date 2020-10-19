import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CountryService} from "../core/services/country.service";

const CONTINENT_DICT = {
  'AF': 'Africa',
  'AS': 'Asia',
  'EU': 'Europe',
  'NA': 'North America',
  'SA': 'South America',
  'OC': 'Australia'
}

const OPERATION_DICT = {
  export: 'Export',
  import: 'Import'
}

interface CountryViewModel {
  flag: string,
  country: string,
  note?: string,
  operation?: string
}

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss']
})
export class ContinentComponent implements OnInit {

  title: string;
  countryViewModel: CountryViewModel[] = []
  exportCount = 0;
  importCount = 0;

  private continentCode: string

  constructor(private route: ActivatedRoute, private countryService: CountryService) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.continentCode = params.get('continentCode');
      this.title = CONTINENT_DICT[this.continentCode];
      const operationalCountries = this.countryService.getOperationalCountryData();
      const countryList = this.countryService.getCountriesByContinent(this.continentCode);
      countryList.forEach(country => {
          const viewData: CountryViewModel = {
            flag: country.flag,
            country: country.name,
          };

          const operationalData = operationalCountries[country.code];
          if (operationalData) {
            viewData.note = operationalCountries[country.code].note.join(', ');
            viewData.operation = OPERATION_DICT[operationalData.operation];
            this.countExportImport(operationalData.operation);
          }
          this.countryViewModel.push(viewData);
        }
      )
      console.log(this.countryViewModel)
    });
  }

  private countExportImport(operation) {
    if (operation === 'export') {
      this.exportCount++;
    } else if (operation === 'import') {
      this.importCount++;
    }
  }

}
