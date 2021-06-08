import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgserviceService } from 'src/app/y-service/ngservice-service';
import { Leave } from 'src/app/z-model/Leave/leave';
import { TypeLeave } from 'src/app/z-model/Leave/type-leave';

@Component({
  selector: 'app-conge-demande',
  templateUrl: './conge-demande.component.html',
  styleUrls: ['./conge-demande.component.css']
})
export class CongeDemandeComponent implements OnInit {

  public leave = new Leave();
  public leaves!: Leave[];

  constructor(private _route: Router, private _service: NgserviceService) { }
 
  aujourdhui !: string;

  dateStartLeave = new Date();
  dateEndLeave = new Date();

  public allLeaveType!: TypeLeave[];

  leaveType = new TypeLeave();







  ngOnInit(): void {

    this.aujourdhui = this.formatageDate()
    this._service.selectAllLeaveType().subscribe(
      data1 => this.allLeaveType = data1,
      error => console.log("exception" + error)
    )

    this._service.selectLeaveByCollabId(2).subscribe(
      data2 => this.leaves = data2,
      error => console.log("exception" + error)
    )

    console.log(this.leaveType)


    

  }




  idOfLeaveType!: number;
  getTypeLeave(){

    console.log(this.idOfLeaveType)
 
      this._service.selectLeaveTypeById(this.idOfLeaveType).subscribe(
      data9 => { this.leaveType = data9;} ,
      error => console.log("exception" + error),
    )
    setTimeout(() =>{
      console.log(this.leaveType)
  
    },50);
  

}

  
  addLeaveFormSubmit() {

    
    this.leave.status = 'en-cours';
    this.leave.leaveType = this.leaveType
    this.dateStartLeave;
    this.dateEndLeave;

    this._service.addOrUpdateLeaveRequest(this.leave, this.aujourdhui, this.dateStartLeave, this.dateEndLeave).subscribe(
      data => {
        console.log("ajout effectué");
      },
      error => {
        console.log("erreur ajout non-effectué")
      }
    )
    console.log(this.leave.collaboratorId)
  }


  retour() {
    this._route.navigate(['/utilisateur']);
  }


  deleteLeaveById(value :any) {
    console.log(value); 

    this._service.deleteOneLeaveRequest(value).subscribe(
      data => {
        console.log("delete effectué");
      },
      error => {
        console.log("delete ajout non-effectué")
      }
    )
    }

  formatageDate() {
    var jour = new Date().getDay() +6;
    var jour_toString = jour.toString();
    if (jour < 10) {
      jour_toString = "0" + jour_toString;
    }
    var mois = new Date().getMonth() + 1;
    var mois_toString = mois.toString();
    if (mois < 10) {
      mois_toString = "0" + mois_toString;
    }
    var annee = new Date().getFullYear();
    return annee + '-' + mois_toString + '-' + jour_toString;
  }


  
  test(){
    this._service.selectLeaveTypeById(3).subscribe(
    data9 => { this.leaveType = data9;} ,
    error => console.log("exception" + error),
  )
  setTimeout(() =>{
    console.log(this.leaveType)

  },50);
  }
  


}
