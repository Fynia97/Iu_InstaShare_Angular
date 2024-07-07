export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public password: string;
    public email: string;
    public street: string;
    public zip: string;
    public city: string;
    public friends: User[];
    public phoneNumber: string;

    constructor(
        id: number = 0,
        firstName: string = "",
        lastName: string = "",
        password: string = "",
        email: string = "",
        street: string = "",
        zip: string = "",
        city: string = "",
        friends: User[] = [],
        phoneNumber: string = ""
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.street = street;
        this.zip = zip;
        this.city = city;
        this.friends = friends;
        this.phoneNumber = phoneNumber;
    }
}
