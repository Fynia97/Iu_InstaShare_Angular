import { Injectable } from '@angular/core';
import { Lend } from './lend.model';
import { AbstractService } from '../common/abstract.service';

@Injectable({
  providedIn: 'root'
})
export class LendService extends AbstractService<Lend> {
  protected name = "Lend"
}
