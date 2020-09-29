export class User {
    email: string; // primary key
    password: string;
    ownerId: string; // foreign key
    constructor(email: string, password: string, ownerId: string){
///...
    }
}