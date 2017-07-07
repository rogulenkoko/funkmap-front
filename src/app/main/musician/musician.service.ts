import { Injectable } from '@angular/core';
import { Http } from "@angular/http"
import { Observable } from "rxjs/Observable";
import { Musician, MusicStyle, MusicianPreview, MusicianFilter } from "./models";
import { ConfigurationProvider } from "app/core/configuration/configuration-provider";
import { SearchItem } from "app/main/search/search-item";

@Injectable()
export abstract class MusicianService {

  constructor() { }

  abstract getMusicianPreview(id: string): Observable<Musician>;

  abstract getFiltered(request: MusicianFilter):Observable<Array<SearchItem>>;

}

@Injectable()
export class MusicianServiceHttp extends MusicianService {

  constructor(private http: Http) {
    super();
   }


   getMusicianPreview(id: string): Observable<MusicianPreview>{
     return this.http.get(ConfigurationProvider.apiUrl + "musician/get/" + id).map(x=>MusicianPreview.ToMusicianPreview(x.json()));
   }

   getFiltered(request: MusicianFilter):Observable<Array<SearchItem>>{
    return this.http.post(ConfigurationProvider.apiUrl + "musician/getfiltered", request).map(x=>SearchItem.ToSearchItems(x.json()));
   }

}
