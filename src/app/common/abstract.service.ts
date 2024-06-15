import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class AbstractService<T> {
  protected static baseUrl = 'https://localhost:7092/api/';
  protected abstract name: string;

  constructor(protected client: HttpClient) { }

  public getAll(): Observable<T[]> {
    return this.client.get<T[]>(AbstractService.baseUrl + this.name + '/getAll');
  }

  public getById(id: number): Observable<T> {
    return this.client.get<T>(AbstractService.baseUrl + this.name + '/getById?id=' + id);
  }

  public create(entity: T): Observable<T> {
    return this.client.post<T>(AbstractService.baseUrl + this.name + '/create', entity);
  }

  public update(entity: T): Observable<T> {
    return this.client.post<T>(AbstractService.baseUrl + this.name + '/update', entity)
  }

  public deleteById(id: number): Observable<T> {
    return this.client.delete<T>(AbstractService.baseUrl + this.name + '/deleteById?id=' + id)
  }
}
