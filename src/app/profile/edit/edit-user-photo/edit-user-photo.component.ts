import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublicationsService } from 'src/app/services/publications.service';
import { UserService } from './../../../services/user.service';
import { environment } from 'src/environments/environment';
import { User } from './../../../models/user';

@Component({
  selector: 'app-edit-user-photo',
  templateUrl: './edit-user-photo.component.html',
  styleUrls: ['./edit-user-photo.component.scss']
})
export class EditUserPhotoComponent implements OnInit {

  id: number;
  imgPath : string = environment.imagePath;
  imgUrl  = "./../../../assets//img/profile.png";
  userProfilImg : string;
  messageToDisplay: string;


  constructor(private el: ElementRef, private actRoute: ActivatedRoute, private userService: UserService, private publService : PublicationsService) { }

  @ViewChild('imgInput', {static: false}) inputVar : ElementRef;

  ngOnInit(): void {
    this.id = +this.actRoute.snapshot.params.id;
    this.userService.getUserById(this.id).subscribe((data:User) => this.userProfilImg = data["photo"], 
    err => console.log(err));
    this.publService.handleImageUpdated()
      .subscribe(data =>  this.userService.getUserById(this.id)
        .subscribe((data:User) => this.userProfilImg = data["photo"]));
  }


  updatePhoto():void {
    let inputElement: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputElement.files.length;
    if (fileCount > 0) {
      let formData = new FormData();
      formData.append('photoProfil', inputElement.files.item(0));
      formData.append('idUser', this.id.toString());
      this.userService.updateUserPhoto(formData)
        .subscribe(data => {
          this.inputVar.nativeElement.value = "";
          this.publService.dispatchImageUploaded(+data)
          this.messageToDisplay = "";
        
        }
          , error => {
            console.error(error)
            this.messageToDisplay = error.error.msg != undefined ? error.error.msg : "format incorrect!";
            this.inputVar.nativeElement.value = "";
            
          });
          
    }

  }

}
