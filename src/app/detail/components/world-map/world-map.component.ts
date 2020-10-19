import {Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef} from '@angular/core';
import {ContextMenuComponent} from "../context-menu/context-menu.component";
import {MapEvent} from "../../models/map-event";
import {Country, CountryDict} from "../../../core/models/country";
import {MapData} from "../../models/map-data";
import {Position} from "../../models/position";
import {ElementIdentifier} from "@angular/compiler-cli/src/ngtsc/indexer";

declare var $: any;
declare var jvm: any;

@Component({
  selector: 'world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  @Output() countryOperation: EventEmitter<MapEvent> = new EventEmitter<MapEvent>();
  @ViewChild(ContextMenuComponent) contextMenu: ContextMenuComponent;
  private worldMap: any;
  private hoveredCountry: Set<string> = new Set();
  private selectedCountry: string;
  private series = {}

  @Input()
  set mapData(data: MapData) {
    this.series = data;
    // TODO: Refactor
    if (this.worldMap) {
      const oldSeries = this.worldMap.series.regions[0].values;
      Object.keys(oldSeries).forEach(key => {
        if (!this.series[key]) {
          this.series[key] = 'none';
        }
      })
      this.worldMap.series.regions[0].setValues(this.series);
    }
  }

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.drawMap();
  }

  selectCountryByCode(code) {
    const position = this.getPositionOfCountryByCode(code);
    if (position) {
      setTimeout(() => this.openContextMenu(code, position), 100);
    }
  }

  selectCountry(event) {
    if (this.hoveredCountry.size === 0) {
      return false
    }
    this.selectedCountry = this.hoveredCountry.values().next().value;
    this.openContextMenu(this.selectedCountry, {x: event.pageX, y: event.pageY});
    return false;
  }

  handleCountryOperation(operation: any) {
    this.countryOperation.emit({
      operation: operation,
      countryCode: this.selectedCountry
    })
  }

  private openContextMenu(code: string, position: Position) {
    this.contextMenu.show(this.getCountryNameByCode(code), position);
  }

  private getCountryNameByCode(code: string): string {
    return this.worldMap.regions[code].config.name
  }

  private getPositionOfCountryByCode(code: string): Position {
    const pathEl = this.el.nativeElement.querySelector(`[data-code=${code}]`)
    if (pathEl) {
      const clientRects = pathEl.getClientRects()[0];
      return {x: clientRects.x + clientRects.width / 2, y: clientRects.y + clientRects.height / 2}
    }
    return null;
  }

  private drawMap() {
    const self = this;
    this.worldMap = new jvm.Map({
      container: $('#world-map'),
      map: 'world_mill_en',
      backgroundColor: "#b8daff",
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
      onRegionOver: function (e, countryCode) {
        self.hoveredCountry.add(countryCode)
      },

      onRegionOut: function (e, countryCode) {
        self.hoveredCountry.delete(countryCode)
      }
    });
  }

}
