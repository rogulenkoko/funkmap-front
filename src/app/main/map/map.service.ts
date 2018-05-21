import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MapType, ProfileMarker, NearestRequest } from "./models";
import { Http } from "@angular/http";
import { ConfigurationProvider, ServiceType } from "app/core/configuration/configuration-provider";
import { GoogleLocation } from "app/main/map/models/location";
import { TranslateService } from "@ngx-translate/core";
import { LanguageService } from "app/core";
import { SearchFilterService } from 'app/main/search/search-filter/search-filter.service';
import { EventMarker } from './models/event-marker';

@Injectable()
export abstract class MapService {

  constructor(protected http: Http, private translateService: LanguageService) { }

  abstract getAll(): Observable<Array<ProfileMarker>>;

  abstract getNearest(request: NearestRequest): Observable<Array<ProfileMarker>>;

  abstract getSpecific(logins: Array<string>): Observable<Array<ProfileMarker>>;

  abstract getFiltered(): Observable<Array<ProfileMarker>>;

  abstract getFilteredEvents(): Observable<Array<EventMarker>>;

  public getLocation(): Observable<GoogleLocation> {
    return this.http.post("https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyBAe2vqNwz-pbrU2cp1nCWiz1yOAozPfps", {}).map(x => {
      var location = x.json().location;
      return new GoogleLocation(location.lat, location.lng, x.json().accuracy);
    })
  }

  public getAddress(lat: number, lon: number):Observable<string>{
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&sensor=true&language=${this.translateService.language}`).map(x=>{
      return x.json().results[0] ? x.json().results[0].formatted_address : "";
    })
  }

}

  

@Injectable()
export class MapServiceHttp extends MapService {

  constructor(http: Http, translateService: LanguageService, private searchFilterService: SearchFilterService) {
    super(http, translateService);
  }

  getAll(): Observable<Array<ProfileMarker>> {
    return this.http.get(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/all`).map(x => ProfileMarker.ToMarkerArray(x.json()));
  }

  getNearest(request: NearestRequest): Observable<Array<ProfileMarker>> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/nearest/markers`, request).map(x => ProfileMarker.ToMarkerArray(x.json()));
  }

  getSpecific(logins: Array<string>): Observable<Array<ProfileMarker>> {
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/specific/markers`, logins).map(x => ProfileMarker.ToMarkerArray(x.json()));
  }

  getFiltered(): Observable<Array<ProfileMarker>>{
    var filter = this.searchFilterService.buildFilter(0, ConfigurationProvider.entitiesLimit);
    return this.http.post(`${ConfigurationProvider.apiUrl(ServiceType.Funkmap)}base/filtered/markers`, filter).map(x => ProfileMarker.ToMarkerArray(x.json()));
  }

  getFilteredEvents(): Observable<Array<EventMarker>>{
    //todo 
    return Observable.of([]);
  }
}



