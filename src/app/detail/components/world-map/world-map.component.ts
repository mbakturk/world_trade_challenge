import {Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef} from '@angular/core';
import {ContextMenuComponent} from '../context-menu/context-menu.component';
import {MapEvent} from '../../models/map-event';
import {MapData} from '../../models/map-data';
import {Position} from '../../models/position';

declare var $: any;
declare var jvm: any;

const POSITION_CALIBRATIONS = {
  US: {ratioX: 0.6, ratioY: 1.1},
  FR: {ratioX: 1.2, ratioY: 0.4},
  DEFAULT: {ratioX: 1, ratioY: 1}
};

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  @Output() countryOperation: EventEmitter<MapEvent> = new EventEmitter<MapEvent>();
  @ViewChild(ContextMenuComponent) contextMenu: ContextMenuComponent;
  private worldMap: any;
  private hoveredCountry: Set<string> = new Set();
  private selectedCountry: string;
  private series = {};

  @Input()
  set mapData(data: MapData) {
    this.series = data;
    if (this.worldMap) {
      const oldSeries = this.worldMap.series.regions[0].values;
      Object.keys(oldSeries).forEach(key => {
        if (!this.series[key]) {
          this.series[key] = 'none';
        }
      });
      this.worldMap.series.regions[0].setValues(this.series);
    }
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.drawMap();
  }

  selectCountryByCode(code): void {
    this.worldMap.setFocus({region: code});
    const position = this.getPositionOfCountryByCode(code);
    if (position) {
      this.selectedCountry = code;
      setTimeout(() => this.openContextMenu(code, position), 100);
    }
  }

  selectCountry(event): boolean {
    if (this.hoveredCountry.size === 0) {
      return false;
    }
    this.selectedCountry = this.hoveredCountry.values().next().value;
    this.openContextMenu(this.selectedCountry, {x: event.pageX, y: event.pageY});
    return false;
  }

  handleCountryOperation(operation: any): void {
    this.countryOperation.emit({
      operation,
      countryCode: this.selectedCountry
    });
  }

  private openContextMenu(code: string, position: Position): void {
    this.contextMenu.show(this.getCountryNameByCode(code), position);
  }

  private getCountryNameByCode(code: string): string {
    return this.worldMap.regions[code].config.name;
  }

  private getPositionOfCountryByCode(code: string): Position {
    const pathEl = this.el.nativeElement.querySelector(`[data-code=${code}]`);
    if (pathEl) {
      const rect = pathEl.getClientRects()[0];
      const calibration = POSITION_CALIBRATIONS[code] || POSITION_CALIBRATIONS.DEFAULT;
      return {x: (rect.x + rect.width / 2) * calibration.ratioX, y: (rect.y + rect.height / 2) * calibration.ratioY};
    }
    return null;
  }

  private drawMap(): void {
    const self = this;
    this.worldMap = new jvm.Map({
      container: $('#world-map'),
      map: 'world_mill_en',
      backgroundColor: '#b8daff',
      series: {
        regions: [{
          attribute: 'fill',
          scale: {
            export: 'green',
            import: 'red',
            none: 'white',
          },
          values: this.series
        }]
      },
      onRegionOver(e, countryCode): void {
        self.hoveredCountry.add(countryCode);
      },

      onRegionOut(e, countryCode): void {
        self.hoveredCountry.delete(countryCode);
      }
    });
  }

}
