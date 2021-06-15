import { TypeExpense } from "./type-expense";

export class Expense {
    
    public  id!:number;
	public  collaboratorId!:number;
	public  dateRequest!:Date;
	public  dateExpense!:Date;
	public  billable!:boolean;
	public  costHT!:number;
	public  costTVA =0;
	public  costTTC = 0;
	public  status!:string;


	public nomCollab!: string;
	public prenomCollab!: string;
	
	public typeExpense = new TypeExpense();

}
