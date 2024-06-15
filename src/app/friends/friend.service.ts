import { Injectable } from '@angular/core';
import { AbstractService } from '../common/abstract.service';
import { Friend } from './friend.model';

@Injectable({
  providedIn: 'root'
})
export class FriendService extends AbstractService<Friend> {
  protected name = "Friends"
}
