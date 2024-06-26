import { Injectable } from '@angular/core';
import { AbstractService } from '../common/abstract.service';
import { Friend } from './friend.model';
import { User } from '../users/user.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FriendService extends AbstractService<Friend> {
  protected name = "Friends"

  public getAllPossibleFriends(userId: number): Observable<User[]> {
    return this.client.get<User[]>(AbstractService.baseUrl + this.name + '/getAllPossibleFriends?userId=' + userId, AbstractService.Authorize());
  }
}
