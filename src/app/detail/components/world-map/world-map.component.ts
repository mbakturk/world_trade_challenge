import {Component, OnInit, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {ContextMenuComponent} from "../context-menu/context-menu.component";
import {MapEvent} from "../../models/map-event";
import {Country, CountryDict} from "../../../core/models/country";
import {MapData} from "../../models/map-data";

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
    console.log(data);
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

  ngOnInit(): void {
    this.drawMap();
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

  selectCountry(event) {
    if (this.hoveredCountry.size === 0) {
      return false
    }
    this.selectedCountry = this.hoveredCountry.values().next().value;
    this.contextMenu.show({x: event.pageX, y: event.pageY});
    return false;
  }

  handleCountryOperation(operation: any) {
    this.countryOperation.emit({
      operation: operation,
      countryCode: this.selectedCountry
    })
  }

}
