import { TypeActivity } from "./type-activity";

export class Activity {

	public  id!: number;
	public  collaboratorId!: number;
	public  projectId!:number;
	public  startDate!: Date;
	public  duration!: number;
	public  remote!: boolean;
	public typeActivity = new TypeActivity();

}
