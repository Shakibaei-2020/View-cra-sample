import { Project } from "../Project/project";
import { TypeCollaborator } from "./type-collaborator";

export class Collaborator {
    [x: string]: any;

    public id!:number;
    public lastName!:string;
    public firstName!:string;
    public email!:string;
    public password!:string;
    public dateOfEntry!:Date;
    public dateOfRelease!:Date;
    public profileImagePath!: Blob;


    public projects!: Project[];
    
    public oldDateOfEntry!: string;
    public oldDateOfRelease!: string;
    
    public typeCollaborator = new TypeCollaborator();

}
