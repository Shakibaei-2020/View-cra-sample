import { TypeLeave } from "./type-leave";

export class Leave {

	public  id!: number;
	
	public  collaboratorId!: number;
	public  dateOfDemand!:Date;
	public  dateOfStartLeave!:Date;
	public  dateOfEndLeave!:Date;

	public leaveType = new TypeLeave;
	public  status!:String;
	public  clientInformed!:boolean;
}





