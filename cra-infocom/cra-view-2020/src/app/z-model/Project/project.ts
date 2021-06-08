import { Mission } from "../Mission/mission";

export class Project {

    public  id!: number;
	public  collaboratorId!: number;
	public  mission = new Mission();
	public projectTitle!: string;
}
