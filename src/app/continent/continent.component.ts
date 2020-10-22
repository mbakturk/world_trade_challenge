import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '../core/services/country.service';
import {Country, CountryOpsConst} from '../core/models/country';

const CONTINENT_DICT = {
  AF: 'Africa',
  AS: 'Asia',
  EU: 'Europe',
  NA: 'North America',
  SA: 'South America',
  OC: 'Australia'
};

const OPERATION_DICT = {
  export: 'Export',
  import: 'Import'
};

interface CountryView {
  flag: string;
  country: string;
  note?: string;
  operation?: string;
}

@Component({
  selector: 'app-continent',
  templateUrl: './continent.component.html',
  styleUrls: ['./continent.component.scss']
})
export class ContinentComponent implements OnInit {

  title: string;
  countryViews: CountryView[] = [];
  exportCount = 0;
  importCount = 0;
  private continentCode: string;

  constructor(private route: ActivatedRoute, private countryService: CountryService, private router: Router) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.continentCode = params.get('continentCode');
      this.title = CONTINENT_DICT[this.continentCode];
      const operationalCountries = this.countryService.getOperationalCountryData();
      const countryList = this.countryService.getCountriesByContinent(this.continentCode);
      countryList.forEach(country => {
          const viewData: CountryView = {
            flag: country.flag,
            country: country.name,
          };

          const operationalData = operationalCountries[country.code];
          if (operationalData) {
            viewData.note = operationalCountries[country.code].note.join(', ');
            viewData.operation = OPERATION_DICT[operationalData.operation];
            this.countExportImport(operationalData.operation);
          }
          this.countryViews.push(viewData);
        }
      );

      this.countryViews = this.countryViews.sort((a, b) => a.country >= b.country ? 1 : -1);
    });
  }

  selectCountryOnTheMap(country: Country): void {
    this.router.navigate(['detail', country.code]);
  }

  private countExportImport(operation): void {
    if (operation === CountryOpsConst.EXPORT) {
      this.exportCount++;
    } else if (operation === CountryOpsConst.IMPORT) {
      this.importCount++;
    }
  }

}
