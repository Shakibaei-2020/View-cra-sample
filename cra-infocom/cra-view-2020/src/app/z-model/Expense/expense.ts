import { TypeExpense } from "./type-expense";

export class Expense {
    
    public  id!:number;
	public  collaboratorId!:number;
	public  dateRequest!:Date;
	public  dateExpense!:Date;
	public  billable!:boolean;
	public  costHT!:number;
	public  costTVA!:number;
	public  costTTC!:number;
	public  status!:string;

	public typeExpense = new TypeExpense();

}
