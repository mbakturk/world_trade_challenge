import {Component, OnInit, ViewChild} from '@angular/core';
import {MapEvent} from "./models/map-event";
import {CountryService} from "../core/services/country.service";
import {Country, CountryDict} from "../core/models/country";
import {MapData} from "./models/map-data";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddNoteComponent} from "./components/add-note/add-note.component";
import {ContextMenuComponent} from "./components/context-menu/context-menu.component";
import {WorldMapComponent} from "./components/world-map/world-map.component";

@Component({
  selector: 'detail-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  mapData: MapData;
  countryCount: number;
  exportCount: number;
  importCount: number;
  @ViewChild(WorldMapComponent) worldMap: WorldMapComponent;

  constructor(private countryService: CountryService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.countryCount = this.countryService.getCountyList().length;
    this.updateData();
  }

  selectCountryOnTheMap(country: Country) {
    this.worldMap.selectCountryByCode(country.code)
  }

  handleOperation(event: MapEvent) {
    switch (event.operation) {
      case 'export':
      case 'import':
        this.countryService.saveCountyOperation(event.countryCode, event.operation)
        break;
      case 'note':
        this.openAddNoteModal(event.countryCode);
        break;
      case 'delete':
        this.countryService.deleteCountryData(event.countryCode);
        break;
    }
    this.updateData();
  }

  private updateData() {
    const mapData = {}
    let exportCount = 0;
    let importCount = 0;
    Object.values(this.countryService.getOperationalCountryData())
      .forEach(country => {
          const operation = country.operation;
          if (operation) {
            if (operation === 'export') {
              exportCount++;
            } else {
              importCount++;
            }
          }
          mapData[country.code] = operation;
        }
      );
    console.log(mapData)
    this.mapData = mapData;
    this.exportCount = exportCount;
    this.importCount = importCount;
  }

  private openAddNoteModal(countryCode: string) {
    const modal = this.modalService.open(AddNoteComponent);
    const country = this.countryService.getCountryByCode(countryCode);
    modal.componentInstance.country = country.name;
    modal.result.then(note => note && this.countryService.addNoteToCountry(countryCode, note), reason => false);
  }

}
