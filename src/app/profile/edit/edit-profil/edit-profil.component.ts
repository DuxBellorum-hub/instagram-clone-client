import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.scss']
})
export class EditProfilComponent implements OnInit {
  

  user: User;
  userInfos: boolean = false;
  userPasswordInfo: boolean = false;
  userPhoto: boolean = true;
  password: string ="";
  messageToDisplay: string = "";
  id;

  constructor(private activRoute: ActivatedRoute, private userService : UserService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.activRoute.snapshot.params.id;
    if (this.id == "1") this.editPhoto();
    this.userService.getUserById(this.id).subscribe((data:User) => {
      this.user = data
    }
      , err => console.log(err));

  }

  editProfil():void {
    this.userPasswordInfo = false;
    this.userInfos = true;
    this.userPhoto = false;

  }

  editPassword():void {
    this.userInfos = false;
    this.userPasswordInfo = true;
    this.userPhoto = false;

  }

  editPhoto():void {
    this.userPhoto = true;
    this.userInfos = false;
    this.userPasswordInfo = false;

  }

  deleteAccount():void{
    if(this.password.trim()!= ""){
      this.userService.deleteUser(this.id, this.password).subscribe(data => {
        localStorage.removeItem("token");
       this.router.navigate(['/auth']).then(() => location.reload());
      }, err => {
        this.messageToDisplay = err.error;
        console.error(err);
        
      });
    }
  }

}
