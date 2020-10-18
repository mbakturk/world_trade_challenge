import {Component, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {ContextMenuComponent} from "../context-menu/context-menu.component";
import {Operation} from "../../models/operation";

declare var $: any;
declare var jvm: any;

@Component({
  selector: 'world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.scss']
})
export class WorldMapComponent implements OnInit {

  @Output() countryOperation: EventEmitter<Operation> = new EventEmitter<Operation>();
  @ViewChild(ContextMenuComponent) contextMenu: ContextMenuComponent;
  private worldMap: any;
  private hoveredCountry: Set<string> = new Set();
  private selectedCountry: string;


  constructor() {
  }

  ngOnInit(): void {
    this.drawMap();
  }

  private drawMap() {
    const self = this;
    this.worldMap = new jvm.Map({
      container: $('#world-map'),
      map: 'world_mill_en',
      backgroundColor: "#3289a8",
      series: {
        regions: [{
          attribute: 'fill',
          scale: {
            exported: 'green',
            imported: 'red',
            none: 'white',
          },
          values: {}
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

  handleCountryOperation(operation: string) {
    this.countryOperation.emit({
      operation: operation,
      countryCode: this.selectedCountry
    })
  }

}
