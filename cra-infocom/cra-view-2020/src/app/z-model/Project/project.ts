import { Mission } from "../Mission/mission";

export class Project {

    public  id!: number;
	public  collaboratorId!: number;
	public projectTitle!: string;
	public  mission = new Mission();


	public missionTitle!: string;
	public prenomCollab!: string;
}
