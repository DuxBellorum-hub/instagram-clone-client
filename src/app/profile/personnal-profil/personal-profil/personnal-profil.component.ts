import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from './../../../../environments/environment';
import { UserService } from './../../../services/user.service';
import { PublicationsService } from 'src/app/services/publications.service';
import { User } from './../../../models/user';

@Component({
  selector: 'app-personnal-profil',
  templateUrl: './personnal-profil.component.html',
  styleUrls: ['./personnal-profil.component.scss']
})
export class PersonnalProfilComponent implements OnInit {

  user: User;
  publications: boolean = true;
  enregistrements: boolean = false;
  numberofPhotos: number;
  imgDefaultUrl: string = "../../../assets/img/profile.png";
  imgPath: string = environment.imagePath;

  constructor(private router: Router, private userService: UserService, private PublService: PublicationsService) { }

  ngOnInit(): void {
    if (localStorage.getItem("token")) {
      let token = { "token": localStorage.getItem("token") };
      this.userService.getUserIdWithToken(token).subscribe((data: number) => {
        this.userService.getUserById(data).subscribe(user => {
          this.user = user;
        }, err => console.log(err));
      }, err => console.log(err));

    }else{
      this.router.navigate(["/auth"]);
    }

    this.PublService.handleNumberOfPhotos().subscribe(data => this.numberofPhotos = data
      , err => console.log(err));



  }

  addPublications() :void {
    this.enregistrements = false;
    this.publications = true;
  }

  addEnregistrements() :void {
    this.publications = false;
    this.enregistrements = true;
  }

  redirEdit(id) :void {
    this.router.navigate(['/edit-profil', id]);
  }







}
