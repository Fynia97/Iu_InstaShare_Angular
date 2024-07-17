import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
 
@Injectable({
    providedIn: 'root'
})
export class AppConfigService {
  public apiEndpoint: string = '';
 
  constructor(private http: HttpClient) {}
 
    load() :Observable<any>  {
 
      const obs = this.http.get('/assets/config.json')
        .pipe(
          map(x => x as Config),
          map(x => this.apiEndpoint = x.api)
        );
 
      return obs;
  }
}
 
interface Config {
  api: string
}

