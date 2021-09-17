import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent implements OnInit {

  password : string = "";
  confirmPassword: string = "";
  errorMessage: string;
  successMessage : string;
  id : number;

  constructor(private UserService : UserService, private actRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params.id;

  }

  changePassword():void{
    if(this.password.trim() !== "" && this.confirmPassword.trim() !== ""){
      if(this.password.trim() !== this.confirmPassword.trim()) {
        this.errorMessage = "Les 2 mots de passe ne correspondent pas !";
        this.confirmPassword ="";
        this.password = "";
        return;
      }
      else{
        let passToSend = {"password": this.password}
        this.UserService.updatePassword(passToSend, this.id).subscribe((data:any) => {
          this.errorMessage = "";
          this.successMessage = "Mot de passe modifié avec succès!"
          this.password ="";
          this.confirmPassword = "";
        }, err => console.log(err));

      }

    }
  }


}
