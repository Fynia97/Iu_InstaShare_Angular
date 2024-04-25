import { Injectable } from '@angular/core';
import { AbstractService } from '../common/abstract.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<User> {
  protected name = "UserProfile";
}
