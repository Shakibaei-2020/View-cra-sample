import { TypeCollaborator } from "./type-collaborator";

export class Collaborator {

    public id!:number;
    public lastName!:string;
    public firstName!:string;
    public email!:string;
    public passward!:string;
    public dateOfEntry!:Date;
    public dateOfRelease!:Date;
    public profileImagePath!: Blob;

    public typeCollaborator = new TypeCollaborator();

}
