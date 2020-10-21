import {Component, OnInit, ViewChild} from '@angular/core';
import {MapEvent, MapEventConst} from './models/map-event';
import {CountryService} from '../core/services/country.service';
import {MapData} from './models/map-data';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AddNoteComponent} from './components/add-note/add-note.component';
import {WorldMapComponent} from './components/world-map/world-map.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  mapData: MapData;
  countryCount: number;
  exportCount: number;
  importCount: number;
  @ViewChild(WorldMapComponent) worldMap: WorldMapComponent;

  constructor(private route: ActivatedRoute, private countryService: CountryService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.countryCount = this.countryService.getCountyList().length;
    this.updateData();
    this.route.paramMap.subscribe(params => {
      const countryCode = params.get('countryCode');
      if (countryCode) {
        setTimeout(() => this.selectCountryOnTheMap(countryCode), 500);
      }
    });
  }

  selectCountryOnTheMap(countryCode: string): void {
    this.worldMap.selectCountryByCode(countryCode);
  }

  handleOperation(event: MapEvent): void {
    if (event.operation === MapEventConst.EXPORT || event.operation === MapEventConst.IMPORT) {
      this.countryService.saveCountyOperation(event.countryCode, event.operation as any);
      this.updateData();
    } else if (event.operation === MapEventConst.DELETE) {
      this.countryService.deleteCountryData(event.countryCode);
      this.updateData();
    } else {
      this.openAddNoteModal(event.countryCode);
    }
  }

  private updateData(): void {
    const mapData = {};
    let exportCount = 0;
    let importCount = 0;
    Object.values(this.countryService.getOperationalCountryData())
      .forEach(country => {
          const operation = country.operation;
          if (operation) {
            if (operation === MapEventConst.EXPORT) {
              exportCount++;
            } else {
              importCount++;
            }
          }
          mapData[country.code] = operation;
        }
      );
    this.mapData = mapData;
    this.exportCount = exportCount;
    this.importCount = importCount;
  }

  private openAddNoteModal(countryCode: string): void {
    const modal = this.modalService.open(AddNoteComponent);
    const country = this.countryService.getCountryByCode(countryCode);
    modal.componentInstance.country = country.name;
    modal.result.then(note => note && this.countryService.addNoteToCountry(countryCode, note), reason => false);
  }

}
