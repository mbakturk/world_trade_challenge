import {Component, OnInit} from '@angular/core';
import {MapEvent} from "./models/map-event";
import {CountryService} from "../core/services/country.service";
import {Country, CountryDict} from "../core/models/country";
import {MapData} from "./models/map-data";

@Component({
  selector: 'detail-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  mapData: MapData;

  constructor(private countryService: CountryService) {
  }

  ngOnInit(): void {
    this.mapData = this.getMapData();
  }

  handleOperation(event: MapEvent) {
    switch (event.operation) {
      case 'export':
      case 'import':
        this.countryService.saveCountyOperation(event.countryCode, event.operation)
        break;
      case 'note':
        console.log(event)
        break;
      case 'delete':
        this.countryService.deleteCountryData(event.countryCode);
        break;
    }
    this.mapData = this.getMapData();
  }

  private getMapData(): MapData {
    const data = {}
    Object.entries(this.countryService.getOperationalCountryData())
      .forEach((item: [string, Country]) => data[item[0]] = item[1].operation ? item[1].operation : 'none');
    return data;
  }

}
