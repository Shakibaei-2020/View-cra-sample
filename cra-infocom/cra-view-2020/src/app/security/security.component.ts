import { Component, OnInit } from '@angular/core';
import { JwtUserService } from '../y-service/jwt-user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  authRequest:any={
    "userName":"test",
    "password":"password"
  };

  response:any;

  constructor(private service:JwtUserService) { }

  ngOnInit(): void {
    this.getAccessToken(this.authRequest);
  }

  public getAccessToken(authRequest:any){
    let resp=this.service.generateToken(authRequest);
    resp.subscribe(data=>this.accessApi(data));
      }
    
    
      public accessApi(token:string){
    let resp=this.service.welcome(token);
    resp.subscribe(data=>this.response=data);
      }

}
