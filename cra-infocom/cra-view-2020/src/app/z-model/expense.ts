export class Expense {
    
    public  id!:number;
	public  collaboratorId!:number;
	public  dateRequest!:Date;
	public  dateExpense!:Date;
	public  billable!:boolean;
	public  costHT!:number;
	public  costTVA!:number;
	public  status!:String;
	public type!: String;
}
