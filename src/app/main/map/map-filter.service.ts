import { Injectable, EventEmitter } from '@angular/core';
import { Marker } from "app/main/map/models";

@Injectable()
export class MapFilter {

  public isAllShown: boolean;

  public onOutItemsSelected: EventEmitter<Marker>;

  public onItemsFiltered: EventEmitter<Array<string>>;

  constructor() {
    this.isAllShown = false;
    this.onOutItemsSelected = new EventEmitter<Marker>();
    this.onItemsFiltered = new EventEmitter<Array<string>>();
   }

}
