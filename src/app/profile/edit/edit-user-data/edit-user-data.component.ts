import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';


@Component({
  selector: 'app-edit-user-data',
  templateUrl: './edit-user-data.component.html',
  styleUrls: ['./edit-user-data.component.scss']
})
export class EditUserDataComponent implements OnInit {

  @Input() username: string;
  @Input() bio : string ;


   form = {username: "", bio : ""};
   id : number; 
   errorMessage : string ;


  constructor(private actRoute : ActivatedRoute , private userService : UserService) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;
    
  }


  updateProfil():void{
    if(this.form.username.trim() !="" || this.form.bio.trim()!="" ){
      this.form.username = this.form.username != "" ? this.form.username : this.username;
      this.form.bio = this.form.bio != "" ? this.form.bio : this.bio;
      this.userService.updateUserProfil(this.form, this.id).subscribe(data => {
        this.username = this.form.username != "" ? this.form.username : this.username;
        this.bio = this.form.bio !="" ? this.form.bio : this.bio;
        this.errorMessage = "";
        this.form =  {username: "", bio : ""}; 
        
      }
      , err =>{
        this.errorMessage = err.error;
        console.log(err.error);
      })
    }
  }



}
