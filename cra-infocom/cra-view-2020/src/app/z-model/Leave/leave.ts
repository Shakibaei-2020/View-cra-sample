import { Collaborator } from "../Collaborator/collaborator";
import { TypeLeave } from "./type-leave";

export class Leave {

	public  id!: number;
	
	public  collaboratorId!: number;
	public  dateOfDemand!:Date;
	public  dateOfStartLeave!:Date;
	public  dateOfEndLeave!:Date;
	public  status!:string;
	public  clientInformed!:boolean;
	public name!: string;
	public  statusDebut!: string;
	public  statusFin!: string;
	public  nbJours!: number;


	public nomCollab!: string;
	public prenomCollab!: string;

	

	public leaveType = new TypeLeave();

	

	
}





