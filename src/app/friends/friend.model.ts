import { User } from "../users/user.model";

export class Friend {
    public id: number
    public userId: number
    public friendId: number
    public status: String
    public user: User
    public friend: User


    constructor(id = 0, userId: number, friendId: number, status: String = "", user: User, friend: User) {
        this.id = id;
        this.userId = userId;
        this.friendId = friendId;
        this.status = status;
        this.user = user;
        this.friend = friend;
    }
}