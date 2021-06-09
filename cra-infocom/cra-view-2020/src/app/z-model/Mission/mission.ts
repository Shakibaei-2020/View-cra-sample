import { Client } from "../Client/client";

export class Mission {

	public  id!:number;
	public  missionTitle!: string;
	public  startDate!: Date;
	public  endDate!: Date;
	public  client= new Client();
	
}
