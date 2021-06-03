import { TypeLeave } from "./type-leave";

export class Leave {

	public  id!: number;
	
	public  collaboratorId!: number;
	public  dateOfDemand!:Date;
	public  dateOfStartLeave!:Date;
	public  dateOfEndLeave!:Date;
	public  status!:String;
	public  clientInformed!:boolean;
	

	public leaveType = new TypeLeave;

}





