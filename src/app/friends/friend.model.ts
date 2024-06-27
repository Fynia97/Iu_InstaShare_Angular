import { User } from "../users/user.model";
import { FriendStatusEnum } from "./friend.enum";

export class Friend {
    public id: number
    public userId: number
    public friendId: number
    public status: FriendStatusEnum
    public user: User
    public friend: User


    constructor(id: number = 0, userId: number = 0, friendId: number = 0, status: FriendStatusEnum = FriendStatusEnum.ASKED, user: User = new User(), friend: User = new User()) {
        this.id = id;
        this.userId = userId;
        this.friendId = friendId;
        this.status = status;
        this.user = user;
        this.friend = friend;
    }
}