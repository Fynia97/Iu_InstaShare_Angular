import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './appConfig.service';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> {
  protected static baseUrl = "";
  protected abstract name: string;

  constructor(protected client: HttpClient, private appConfigService: AppConfigService) {
    AbstractService.baseUrl = appConfigService.apiEndpoint;
   }

  public getAll(): Observable<T[]> {
    return this.client.get<T[]>(AbstractService.baseUrl + this.name + '/getAll', AbstractService.Authorize());
  }

  public getAllByUserId(userId: number): Observable<T[]> {
    return this.client.get<T[]>(AbstractService.baseUrl + this.name + '/getAllByUserId?userId=' + userId, AbstractService.Authorize());
  }

  public getById(id: number): Observable<T> {
    return this.client.get<T>(AbstractService.baseUrl + this.name + '/getById?id=' + id, AbstractService.Authorize());
  }

  public getByIdAndUserId(id: number, userId: number): Observable<T> {
    return this.client.get<T>(AbstractService.baseUrl + this.name + '/getByIdAndUserId?id=' + id + "&userId=" + userId, AbstractService.Authorize());
  }

  public create(entity: T): Observable<T> {
    return this.client.post<T>(AbstractService.baseUrl + this.name + '/create', entity, AbstractService.Authorize());
  }

  public update(entity: T): Observable<T> {
    return this.client.post<T>(AbstractService.baseUrl + this.name + '/update', entity, AbstractService.Authorize())
  }

  public deleteById(id: number): Observable<T> {
    return this.client.delete<T>(AbstractService.baseUrl + this.name + '/deleteById?id=' + id, AbstractService.Authorize())
  }

  protected static Authorize() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token
      })
    }
  }
}
