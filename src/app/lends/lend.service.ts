import { Injectable } from '@angular/core';
import { Lend } from './lend.model';
import { AbstractService } from '../common/abstract.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LendService extends AbstractService<Lend> {
  protected name = "Lend";

  public getNextLendFrom(): Observable<Lend> {
    return this.client.get<Lend>(AbstractService.baseUrl + this.name + '/getNextLendFrom');
  }

  public countLendsWithStatus(status: number): Observable<number> {
    return this.client.get<number>(AbstractService.baseUrl + this.name + '/getLendsWithStatus?status=' + status);
  }
}
