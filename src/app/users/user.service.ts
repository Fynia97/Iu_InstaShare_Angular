import { Injectable } from '@angular/core';
import { AbstractService } from '../common/abstract.service';
import { User } from './user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {
  protected name = "UserProfile";

  public getByEmail(email: string): Observable<User> {
    return this.client.get<User>(AbstractService.baseUrl + this.name + '/getByEmail?email=' + email, AbstractService.Authorize());
  }
}
