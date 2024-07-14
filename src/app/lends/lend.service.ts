import { Injectable } from '@angular/core';
import { Lend } from './lend.model';
import { AbstractService } from '../common/abstract.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LendService extends AbstractService<Lend> {
  protected name = "Lend";

  public getNextLendFrom(userId: number): Observable<Lend> {
    return this.client.get<Lend>(AbstractService.baseUrl + this.name + '/getNextLendFrom?userId=' + userId, AbstractService.Authorize());
  }

  public countLendsWithStatus(status: number, userId: number): Observable<number> {
    return this.client.get<number>(AbstractService.baseUrl + this.name + '/countLendsWithStatus?status=' + status + "&userId=" + userId, AbstractService.Authorize());
  }

  public getAllLendsOfUserByUserId(userId: number): Observable<Lend[]> {
    return this.client.get<Lend[]>(AbstractService.baseUrl + this.name + '/getAllLendsOfUserByUserId?userId=' + userId, AbstractService.Authorize());
  }

  public getAllLendsFromUserByUserId(userId: number): Observable<Lend[]> {
    return this.client.get<Lend[]>(AbstractService.baseUrl + this.name + '/getAllLendsFromUserByUserId?userId=' + userId, AbstractService.Authorize());
  }
}
